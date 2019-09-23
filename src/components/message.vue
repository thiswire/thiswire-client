<template>
    <article class="media message">
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
                <strong class="has-text-white">{{ author }}</strong>
                <small class="is-size-7 has-text-grey message-time">{{
                    time
                }}</small>
                <br />
                <div>{{ message.text }}</div>
            </div>
        </div>
    </article>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'message',
    props: ['message'],
    computed: {
        ...mapState(['cache']),
        time() {
            return this.message.timestamp;
        }
    },
    asyncComputed: {
        author: {
            async get() {
                let id = this.message.author;
                if (this.cache[id]) {
                    return this.cache[id].name;
                } else if (this.cache[id] === null) {
                    return '';
                } else {
                    this.$store.commit('nullUser', id);
                    let response = await this.axios.get(
                        process.env.VUE_APP_SERVER_URL + '/getUser',
                        {
                            params: {
                                id
                            }
                        }
                    );
                    this.$store.commit('addUser', response.data);
                    return response.data.name;
                }
            },
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
$image-size: 3em;

.message {
    margin-left: 1em;
}

.message-pfp {
    height: $image-size;
    width: $image-size;
}
.message-time {
    margin-left: 1em;
}
</style>
