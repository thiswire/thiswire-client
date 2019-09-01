<template>
    <div>
        <div class="control">
            <textarea
                class="textarea has-fixed-size"
                v-model="message"
                placeholder="Type something here..."
                :disabled="!loggedIn"
                @keydown="handleInput"
                id="input-textarea"
            ></textarea>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'message-sender',
    data() {
        return {
            message: '',
            user: {}
        };
    },
    computed: mapState(['socket', 'currentChannel', 'loggedIn']),
    methods: {
        handleInput(event) {
            if (event.code === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.sendMessage();
            }
        },
        sendMessage() {
            if (this.message.trim() == '' || !this.currentChannel) return;
            this.socket.emit('chat message', {
                text: this.message,
                channel: this.currentChannel
            });
            this.message = '';
        }
    }
};
</script>

<style scoped>
#input-textarea {
    margin-top: -10px;
    resize: none;
    border: none;
}
</style>
