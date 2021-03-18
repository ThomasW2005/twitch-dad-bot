const CONFIG = require('./config.json');
const ChatClient = require("dank-twitch-irc");
const client = new ChatClient.ChatClient({
    username: CONFIG.name,
    password: CONFIG.password
});

client.on("ready", () => {
    console.log("connected");
});

client.on("PRIVMSG", (msg) => {
    if (msg.senderUsername != CONFIG.name) {    //if message is sent by bot (himself), ignore
        for (let i = 0; i < CONFIG.triggers.length; i++) {
            let dadNameStartPos = msg.messageText.toLowerCase().search(CONFIG.triggers[i]); //Search for trigger string in message, for example "im", or "i am"
            if (dadNameStartPos != -1) {
                let dadname = msg.messageText.substr(dadNameStartPos + CONFIG.triggers[i].length + 1);  //name is everything after the trigger string
                client.say(msg.channelName, `Hey ${dadname} , I'm Dad :p, @${msg.displayName}`);        //chat
                console.log(`[${msg.displayName}] in [${msg.channelName}]: ${msg.messageText}`);        //log in console
                break;
            }
        }
    }
})

client.connect();
client.joinAll(CONFIG.channels);
