<template>
    <div id="app" class="columns">
        <div class="column is-2">
            <switcher></switcher>
        </div>
        <div class="column">
            <messages></messages>
            <br />
            <sender></sender>
        </div>
    </div>
</template>

<script>
import messages_vue from './chat.messages.vue';
import sender_vue from './chat.sender.vue';
import switcher_vue from './chat.switcher.vue';
import { mapState } from 'vuex';

export default {
    name: 'chat',
    components: {
        messages: messages_vue,
        sender: sender_vue,
        switcher: switcher_vue
    },
    computed: mapState(['socket']),
    methods: {
        addMessage(msg) {
            // let div = messages.$el;
            // messages.autoScroll = div.scrollTop == div.scrollTopMax;
            this.$store.commit('addMessage', msg);
        }
    },
    beforeMount() {
        this.socket.on('chat message', msg => {
            this.addMessage(msg);
        });

        this.socket.on('chat messages', msgs => {
            msgs.map(msg => this.addMessage(msg));
        });
    }
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Heebo');

$text: #fff;
$text-strong: #fff;
$body-background-color: #101011;
$family-primary: 'Heebo';
$border: #404040;
$menu-item-active-background-color: #505050;
$menu-item-hover-background-color: #202020;
$code: #aaaaaa;
$code-background: #030303;
$input-color: #fff;
$input-background-color: #333;

@import 'bulma/sass/utilities/_all.sass';
@import 'bulma/sass/base/_all.sass';
@import 'bulma/sass/grid/columns.sass';
@import 'bulma/sass/components/media.sass';
@import 'bulma/sass/components/menu.sass';
@import 'bulma/sass/elements/image.sass';
@import 'bulma-tooltip/src/sass/index.sass';
@import 'bulma/sass/form/shared.sass';
@import 'bulma/sass/form/input-textarea.sass';
</style>
