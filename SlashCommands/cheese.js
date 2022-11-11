const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "cheese",
    description: "plays cheese sound in vc",

    async run(message, args, client) {
        playAudio('cheese.mp3', message);
        message.reply("playing cheese");
    }

});