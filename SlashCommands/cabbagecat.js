const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "cabbagecat",
    description: "plays cabbagecat sound in vc",

    async run(message, args, client) {
        playAudio('cabbagecat.mp3', message);
        message.reply("playing cabbagecat");
    }

});