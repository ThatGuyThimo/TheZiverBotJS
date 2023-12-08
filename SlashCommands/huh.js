const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "huh",
    description: "plays hallmusic sound in vc",

    async run(message, args, client) {
        playAudio('hall_music.mp3', message);
        message.reply("playing huh?");
    }

});