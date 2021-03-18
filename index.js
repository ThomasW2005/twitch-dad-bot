const CONFIG = require('./config.json');
const ChatClient = require("dank-twitch-irc");
const client = new ChatClient.ChatClient({
    username: CONFIG.name,
    password: CONFIG.password
});

client.on("ready", () => {
    console.log("Verbunden");
});

client.on("PRIVMSG", (msg) => {
    if (msg.senderUsername != CONFIG.name) {
        let dadNameStartPos = msg.messageText.toLowerCase().search("ich bin");
        if (dadNameStartPos != -1) {
            let dadname = msg.messageText.substr(dadNameStartPos + 8);
            client.say(msg.channelName, `Hey ${dadname} , ich bin Dad :p, @${msg.displayName}`);
            console.log(`[${msg.displayName}] in [${msg.channelName}]: ${msg.messageText}`);
        }
    }
})

client.connect();
client.joinAll(CONFIG.channels);
