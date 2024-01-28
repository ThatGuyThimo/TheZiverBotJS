const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "huh",
    description: "plays hallmusic sound in vc",

    async run(message, args, client) {
        try {
            playAudio('hall_music.mp3', message);
            message.reply("playing huh?");
        } catch(error) {
            logError(error, "SC-huh")
            sendErrorDC(client, message, "huh", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});