import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import VueSocketIO from 'vue-socket.io';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAsyncComputed from 'vue-async-computed';

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueAsyncComputed);

const store = new Vuex.Store({
    state: {
        loggedIn: false,
        cache: {},
        // These all just store the ids which are keys in the cache
        messages: [],
        channels: [],
        guilds: [],
        users: [],
        currentChannel: null
    },
    mutations: {
        addMessage(state, payload) {
            state.messages.push(payload._id);
            Vue.set(state.cache, payload._id, payload);
        },
        // This is used to indicate that a request to get this user has already been made
        nullUser(state, id) {
            Vue.set(state.cache, id, null);
        },
        addUser(state, payload) {
            state.users.push(payload._id);
            Vue.set(state.cache, payload._id, payload);
        }
    }
});

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: process.env.VUE_APP_SERVER_URL,
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        }
    })
);

async function login(name, password) {
    let response = await axios.post(
        process.env.VUE_APP_SERVER_URL + '/login',
        null,
        {
            params: { name, password }
        }
    );
    return response.data.token;
}

new Vue({
    el: '#app',
    store,
    sockets: {
        connect() {
            console.log('Connected, now trying to login');
            // Hardcoded user and pw temporarily just for testing
            login(
                process.env.VUE_APP_USERNAME,
                process.env.VUE_APP_PASSWORD
            ).then(token => {
                console.log('Got token, now sending to socket');
                this.$socket.emit('login', token);
            });
        }
    },
    render: h => h(App)
});
