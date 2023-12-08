const SlashCommand = require("../Structures/SlashCommand.js");

const { stopAudio } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "voicedc",
    description: "stops playing audio in vc",

    async run(message, args, client) {
        stopAudio(message);
        message.reply("stopped audio");
    }

});