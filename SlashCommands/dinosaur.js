const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "dinosaur",
    description: "plays dinosaur sound in vc",

    async run(message, args, client) {
        playAudio('dinosaur.mp3', message);
        message.reply("playing dinosaur");
    }

});