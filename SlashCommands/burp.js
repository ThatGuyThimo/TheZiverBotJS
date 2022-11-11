const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "burp",
    description: "plays burp sound in vc",

    async run(message, args, client) {
        playAudio('burp.wav', message);
        message.reply("playing burp");
    }

});