<template>
    <div id="messages">
        <message
            v-for="msg in messages"
            :key="msg"
            v-bind:message="cache[msg]"
        ></message>
    </div>
</template>

<script>
import message from './components/message.vue';
import { mapState } from 'vuex';
export default {
    name: 'messages',
    components: {
        message
    },
    methods: {
        addMessage(msg) {
            this.$store.commit('addMessage', msg);
        }
    },
    computed: mapState(['messages', 'cache']),
    sockets: {
        'chat message'(data) {
            this.addMessage(data);
        },
        'chat messages'(data) {
            for (let msg of data) {
                this.addMessage(msg);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
#messages {
    overflow: visible;
}
</style>
