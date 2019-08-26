'use strict';
import io from 'socket.io-client';
import Vue from 'vue';
import Vuex from 'vuex';
import asyncComputed from 'vue-async-computed';
import App from './chat.vue';
import axios from 'axios';

Vue.use(Vuex);
Vue.use(asyncComputed);

const store = new Vuex.Store({
    state: {
        socket: null,
        currentChannel: null,
        guilds: [],
        channels: {}
    },
    mutations: {
        connect(state) {
            state.socket = io.connect(process.env.VUE_APP_SERVER_URL);
        },
        getGuilds(state, payload) {
            state.guilds = payload.guilds;
            for (let guild of payload.guilds) {
                for (let channel of guild.channels) {
                    if (!state.channels[channel]) state.channels[channel] = {name: null, messages: []};
                    axios.get(process.env.VUE_APP_SERVER_URL + '/getChannel', {params: {id: channel}}).then(response => {
                        console.log('Got channel!!', response.data);
                        if (response.data.type === 'error') return;
                        // state.channels[channel].name = response.data.name;
                        this.commit('setChannelName', {channel, name: response.data.name});
                    });
                }
            }
        },
        setChannelName(state, payload) {
            if (!state.channels[payload.channel]) return;
            state.channels[payload.channel].name = payload.name;
        },
        addMessage(state, msg) {
            let channel = state.channels[msg.channel];
            if (!channel) {
                state.channels[msg.channel] = {name: null, messages: []}
                channel = state.channels[msg.channel];
            };
            channel.messages.push(msg);
            return true;
        }
    }
});

store.commit('connect');
axios.get(process.env.VUE_APP_SERVER_URL + '/getGuilds').then(response => {
    if (response.data.type === 'error') return;
    store.commit('getGuilds', {guilds: response.data});
})
new Vue({
    el: "#app",
    store,
    render: h => h(App)
});
