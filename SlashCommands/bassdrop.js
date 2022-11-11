const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "bassdrop",
    description: "plays bassdrop sound in vc",

    async run(message, args, client) {
        playAudio('bassdrop.mp3', message);
        message.reply("playing bassdrop");
    }

});