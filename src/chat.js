'use strict';
import io from 'socket.io-client';
import Vue from 'vue';
import Vuex from 'vuex';
import asyncComputed from 'vue-async-computed';
import App from './chat.vue';

Vue.use(Vuex);
Vue.use(asyncComputed);

const store = new Vuex.Store({
    state: {
        socket: null,
        messages: []
    },
    mutations: {
        connect(state) {
            console.log("bruh moment");
            state.socket = io.connect(process.env.VUE_APP_SERVER_URL);
        },
        addMessage(state, msg) {
            state.messages.push(msg);
        }
    }
});

store.commit('connect');

new Vue({
    el: "#app",
    store,
    render: h => h(App)
});
