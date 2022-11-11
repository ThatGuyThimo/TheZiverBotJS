const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "intro",
    description: "plays intro sound in vc",

    async run(message, args, client) {
        playAudio('intro.mp3', message);
        message.reply("playing intro");
    }

});