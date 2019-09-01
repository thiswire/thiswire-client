<template>
    <div>
        <p class="label">Name</p>
        <input v-model="name" type="text" />
        <p class="label">Password</p>
        <input v-model="password" type="password" />
        <br />
        <button @click="login">Login</button>
        <p class="label">{{ message }}</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'login',
    data() {
        return {
            name: '',
            password: '',
            message: ''
        };
    },
    methods: {
        setToken(token) {
            localStorage.setItem('token', token);
            window.location.href = 'chat.html';
        },
        login() {
            if (!this.name || !this.password) return;
            this.message = 'Trying to log in...';
            axios
                .post(process.env.VUE_APP_SERVER_URL + '/login', null, {
                    params: {
                        name: this.name,
                        password: this.password
                    }
                })
                .then(response => {
                    if (response.status === 500) {
                        this.message = response.data.message;
                    } else {
                        if (Object.keys(response.data).length === 0) {
                            this.message =
                                'Failed logging in, trying to register';
                            axios
                                .post(
                                    process.env.VUE_APP_SERVER_URL +
                                        '/createUser',
                                    null,
                                    {
                                        params: {
                                            name: this.name,
                                            password: this.password
                                        }
                                    }
                                )
                                .then(response => {
                                    this.setToken(response.data.token);
                                })
                                .catch(error => {
                                    if (error.response.status === 500) {
                                        this.message = 'Internal server error';
                                    } else if (error.response.status === 403) {
                                        this.message = 'Incorrect password';
                                    }
                                });
                        } else {
                            this.setToken(response.data.token);
                        }
                    }
                });
        }
    }
};
</script>

<style>
body {
    background: #101011;
}
.label {
    font-family: 'Heebo', sans-serif;
    font-size: 1em;
    color: white;
}
</style>
