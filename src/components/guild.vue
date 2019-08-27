<template>
    <li>
        <a 
        class="tooltip is-tooltip-right"
        v-bind:class="{ 'is-active': active }"
        v-bind:data-tooltip="guild.name"
        @click="selectGuild"
        style="padding-left: 0;"
        >
            <p class="image is-48x48">
                <img class="is-rounded" src="../assets/default_pfp.png" />
            </p>
        </a>
    </li>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'guild',
    props: ['guild', 'id'],
    computed: {
        ...mapState(['currentGuild']),
        active() {
            return this.currentGuild === this.id;
        }
    },
    methods: {
        selectGuild() {
            this.$store.commit('selectGuild', { guild: this.id });
        }
    }
};
</script>