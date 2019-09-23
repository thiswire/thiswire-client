<template>
    <textarea
        id="message-input"
        class="textarea has-fixed-size"
        placeholder="Message #main"
        rows="2"
        v-model="message"
        @keydown="handleInput"
    ></textarea>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'messageInput',
    data() {
        return {
            message: ''
        };
    },
    computed: mapState(['currentChannel']),
    methods: {
        handleInput(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.sendMessage();
            }
        },
        sendMessage() {
            if (this.message.trim() == '' || !this.currentChannel) return;
            this.$socket.emit('chat message', {
                text: this.message,
                channel: this.currentChannel
            });
            this.message = '';
        }
    }
};
</script>

<style lang="scss" scoped>
#message-input {
    border: none;
    bottom: 1%;
    position: fixed;
}
</style>
