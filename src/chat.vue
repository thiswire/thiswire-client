<template>
    <div id="app">
        <messages></messages>
        <br />
        <sender></sender>
    </div>
</template>

<script>
import messages_vue from './chat.messages.vue';
import sender_vue from './chat.sender.vue';
import { mapState } from 'vuex';

export default {
    name: "chat",
    components: {
        messages: messages_vue,
        sender: sender_vue
    },
    computed: mapState(["socket"]),
    methods: {
        addMessage(msg) {
            // let div = messages.$el;
            // messages.autoScroll = div.scrollTop == div.scrollTopMax;
            this.$store.commit("addMessage", msg);
        }
    },
    beforeMount() {
        this.socket.on("chat message", msg => {
            this.addMessage(msg);
        });

        this.socket.on("chat messages", msgs => {
            msgs.map(msg => this.addMessage(msg));
        });
    }
};
</script>
