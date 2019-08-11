module.exports = {
    pages: {
        chat: {
            entry: "src/chat.js",
            template: "public/chat.html",
            filename: "chat.html"
        },
        login: {
            entry: "src/login.js",
            template: "public/login.html",
            filename: "login.html"
        }
    },
    // disabled because this piece of shit wouldnt work properly
    // and just mess up everything instead of following my rules
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
    runtimeCompiler: true
};
