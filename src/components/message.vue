<template>
    <!-- <div class="message-parent">
        <img class="message-pfp"  />
        <div>
            <span class="message-nickname">{{ author.name }}</span>
            <span class="message-time">{{ timestampstr }}</span>
            <br />
            <div class="message-text" v-html="content"></div>
        </div>
    </div> -->
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img class="is-rounded" src="../assets/default_pfp.png" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <strong class="has-text-white">{{ author.name }}</strong>
                <small class="is-size-7 has-text-grey message-time">{{ timestampstr }}</small>
                <br />
                <div v-html="content"></div>
            </div>
        </div>
    </article>
</template>

<script>
import axios from 'axios';
import markdownit from 'markdown-it';

console.log('This should only appear once!');
const userCache = {};
const pendingRequests = {};
const serverUrl = process.env.VUE_APP_SERVER_URL;

const md = markdownit({
    breaks: true,
    linkify: true
});

export default {
    name: 'message',
    props: ['message'],
    computed: {
        timestampstr() {
            return new Date(this.message.timestamp).toDateString();
        },
        content() {
            return md.renderInline(this.message.text);
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
.message-time {
    margin-left: 1em;
}
</style>
