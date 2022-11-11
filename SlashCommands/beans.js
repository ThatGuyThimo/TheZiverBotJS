const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "beans",
    description: "plays beans sound in vc",

    async run(message, args, client) {
        playAudio('beansdrop.mp3', message);
        message.reply("playing beans");
    }

});