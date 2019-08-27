<template>
    <div class="columns is-gapless">
        <div class="column is-one-fifth">
            <aside class="menu">
                <ul class="menu-list">
                    <guild
                        v-for="guild in guilds"
                        v-bind:guild="guild"
                        v-bind:id="guild._id"
                        v-bind:key="guild._id"
                    ></guild>
                </ul>
            </aside>
        </div>
        <div class="column">
            <aside class="menu">
                <p class="menu-label">Text channels</p>
                <ul class="menu-list">
                    <channel
                        v-for="channelId in currentChannels"
                        v-bind:channel="channels[channelId]"
                        v-bind:id="channelId"
                        v-bind:key="channelId"
                    ></channel>
                </ul>
            </aside>
        </div>
    </div>
</template>

<script>
import channel from './components/channel.vue';
import guild from './components/guild.vue';
import { mapState } from 'vuex';
export default {
    name: 'switcher',
    components: {
        channel,
        guild
    },
    computed: {
        ...mapState(['channels', 'guilds', 'currentGuild']),
        currentChannels() {
            let guild = this.guilds.find(i => i._id === this.currentGuild);
            if (!guild) return [];
            return guild.channels;
        }
    }
};
</script>
