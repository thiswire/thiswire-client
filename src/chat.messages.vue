<template>
  <div id="messages-div">
    <message
      v-for="message in messages"
      v-bind:message="message"
      v-bind:key="message.id"
    ></message>
  </div>
</template>

<script>
import message from './components/message.vue';
import { mapState } from 'vuex';
export default {
    name: "messages",
    components: {
        message
    },
    data: () => {
        return {
            autoScroll: true
        };
    },
    computed: {
        ...mapState(["channels",'currentChannel']),
        messages() {
            let channel = this.channels[this.currentChannel];
            if (!channel) return [];
            return channel.messages;
        }
    },
    updated() {
        this.$nextTick(function() {
            if (this.autoScroll) {
                this.$el.scrollTop = this.$el.scrollTopMax;
            }
        });
    }
};
</script>

<style scoped>
    #messages-div {
        height: 90vh;
        overflow: auto;
    }
</style>
