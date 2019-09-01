'use strict';
import io from 'socket.io-client';
import Vue from 'vue';
import Vuex from 'vuex';
import asyncComputed from 'vue-async-computed';
import App from './chat.vue';
import axios from 'axios';
// Font-awesome stuff
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHashtag);
Vue.component('fa-icon', FontAwesomeIcon);

Vue.use(Vuex);
Vue.use(asyncComputed);

const store = new Vuex.Store({
    state: {
        socket: null,
        loggedIn: false,
        currentChannel: null,
        currentGuild: null,
        guilds: [],
        channels: {}
    },
    mutations: {
        connect(state) {
            state.socket = io.connect(process.env.VUE_APP_SERVER_URL);
        },
        setGuilds(state, payload) {
            state.guilds = payload.guilds;
            for (let guild of payload.guilds) {
                for (let channel of guild.channels) {
                    if (!state.channels[channel])
                        Vue.set(state.channels, channel, {
                            name: null,
                            messages: []
                        });
                    // this.commit('selectChannel', { channel });
                    axios
                        .get(process.env.VUE_APP_SERVER_URL + '/getChannel', {
                            params: { id: channel }
                        })
                        .then(response => {
                            if (response.data.type === 'error') return;
                            // state.channels[channel].name = response.data.name;
                            this.commit('setChannelName', {
                                channel,
                                name: response.data.name
                            });
                        });
                }
            }
        },
        setChannelName(state, payload) {
            if (!state.channels[payload.channel]) return;
            state.channels[payload.channel].name = payload.name;
        },
        selectChannel(state, payload) {
            if (!state.channels[payload.channel]) return;
            state.currentChannel = payload.channel;
        },
        selectGuild(state, payload) {
            if (!state.guilds.find(i => i._id === payload.guild)) return;
            state.currentGuild = payload.guild;
        },
        addMessage(state, msg) {
            let channel = state.channels[msg.channel];
            if (!channel) {
                Vue.set(state.channels, channel, {
                    name: null,
                    messages: []
                });
                channel = state.channels[msg.channel];
            }
            channel.messages.push(msg);
            return true;
        },
        login(state) {
            if (!localStorage.getItem('token')) {
                window.location.replace('login.html');
            } else {
                let token = localStorage.getItem('token');
                state.socket.emit('login', token);
                state.socket.on('logged in', () => this.commit('loggedIn'));
            }
        },
        loggedIn(state) {
            state.loggedIn = true;
        }
    }
});

store.commit('connect');
store.commit('login');
axios.get(process.env.VUE_APP_SERVER_URL + '/getGuilds').then(response => {
    if (response.data.type === 'error') return;
    store.commit('setGuilds', { guilds: response.data });
});
new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
