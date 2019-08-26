module.exports = {
    pages: {
        chat: {
            entry: 'src/chat.js',
            template: 'public/chat.html',
            filename: 'chat.html'
        },
        login: {
            entry: 'src/login.js',
            template: 'public/login.html',
            filename: 'login.html'
        }
    },
    runtimeCompiler: true
};
