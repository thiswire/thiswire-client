<template>
  <div>
    <textarea
      v-model="message"
      placeholder="Type something here..."
      :disabled="!loggedIn"
    ></textarea>
    <button @click="sendMessage" :disabled="!loggedIn">Send</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "message-sender",
    data: () => {
        return {
            message: "",
            loggedIn: false,
            user: {}
        };
    },
    computed: mapState(["socket"]),
    methods: {
    sendMessage() {
        if (this.message == "") return;
        this.socket.emit("chat message", {
            text: this.message
        });
        this.message = "";
    },
    login() {
        if (!localStorage.getItem("name")) {
            window.location.replace("login.html");
            return;
        } else {
            this.user.name = localStorage.getItem("name");
        }
        this.socket.emit("login", this.user, user => {
            if (user.type === "error") return;
            this.loggedIn = true;
            this.user = user;
        });
    }
    },
    beforeMount() {
        this.login();
    }
};
</script>
