<template>
    <article class="media" v-if="!shouldConnect">
        <figure class="media-left">
            <p class="image">
                <img
                    class="is-rounded message-pfp"
                    src="../assets/default_pfp.png"
                />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <strong class="has-text-white">{{ author.name }}</strong>
                <small class="is-size-7 has-text-grey message-time">{{
                    timestampstr
                }}</small>
                <br />
                <div v-html="content"></div>
            </div>
        </div>
    </article>
    <div v-else v-html="content" class="message-connected"></div>
</template>

<script>
import axios from 'axios';
import markdownit from 'markdown-it';
import { mapState } from 'vuex';

const userCache = {};
const pendingRequests = {};
const serverUrl = process.env.VUE_APP_SERVER_URL;

const md = markdownit({
    breaks: true,
    linkify: true
});

export default {
    name: 'message',
    props: ['message', 'index'],
    computed: {
        ...mapState(['channels', 'currentChannel']),
        date() {
            return new Date(this.message.timestamp);
        },
        timestampstr() {
            return this.date.toDateString();
        },
        content() {
            return md.renderInline(this.message.text);
        },
        lastMessage() {
            if (this.index === 0) return;
            let channel = this.channels[this.currentChannel];
            if (!channel) return;
            else return channel.messages[this.index - 1];
        },
        shouldConnect() {
            let last = this.lastMessage;
            if (!last) return false;
            return (
                last.author === this.message.author &&
                this.date.getHours() === new Date(last.timestamp).getHours()
            );
        }
    },
    asyncComputed: {
        author: {
            get() {
                if (userCache[this.message.author])
                    return userCache[this.message.author];
                if (pendingRequests[this.message.author])
                    return pendingRequests[this.message.author];
                let req = axios
                    .get(serverUrl + '/getUser', {
                        params: { id: this.message.author }
                    })
                    .then(response => {
                        if (response.data.type === 'error') {
                            return 'error';
                        }
                        userCache[this.message.author] = response.data;
                        delete pendingRequests[this.message.author];
                        return response.data;
                    });
                pendingRequests[this.message.author] = req;
                return req;
            },
            default: {
                name: 'loading...'
            }
        }
    }
};
</script>
<style lang="scss" scoped>
$image-size: 3em;
.message-time {
    margin-left: 1em;
}
.message-pfp {
    height: $image-size;
}
.message-connected {
    margin-left: $image-size + 1em;
    margin-bottom: 0.1em;
}
</style>
