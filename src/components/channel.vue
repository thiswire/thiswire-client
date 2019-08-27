<template>
    <li>
        <a v-bind:class="{ 'is-active': active }" @click="selectChannel"
            ><fa-icon icon="hashtag" /> {{ channel.name }}</a
        >
    </li>
</template>

<script>
export default {
    name: 'channel',
    props: ['channel', 'id'],
    computed: {
        active() {
            return this.$store.state.currentChannel === this.id;
        }
    },
    methods: {
        selectChannel() {
            this.$store.commit('selectChannel', { channel: this.id });
        }
    }
};
</script>
