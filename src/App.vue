<template>
    <div id="app">
        <div class="columns is-gapless">
            <div class="column is-narrow">
                Future channel switcher..
            </div>
            <div class="column">
                <messages></messages>
                <message-input></message-input>
            </div>
        </div>
    </div>
</template>

<script>
import messageInput from './message_input.vue';
import messages from './messages.vue';

export default {
    name: 'app',
    components: {
        messageInput,
        messages
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
$input-background-color: #1a1a1b;

@import 'bulma/sass/utilities/_all.sass';
@import 'bulma/sass/base/_all.sass';
@import 'bulma/sass/grid/columns.sass';
@import 'bulma/sass/components/media.sass';
@import 'bulma/sass/components/menu.sass';
@import 'bulma/sass/elements/image.sass';
// @import 'bulma-tooltip/src/sass/index.sass';
@import 'bulma/sass/form/shared.sass';
@import 'bulma/sass/form/input-textarea.sass';
</style>
