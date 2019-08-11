<template>
  <div>
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
    computed: mapState(["messages"]),
    updated() {
        this.$nextTick(function() {
            if (this.autoScroll) {
                this.$el.scrollTop = this.$el.scrollTopMax;
            }
        });
    }
};
</script>
