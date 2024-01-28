const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "intro",
    description: "plays intro sound in vc",

    async run(message, args, client) {
        try {
            playAudio('intro.mp3', message);
            message.reply("playing intro");
        } catch(error) {
            logError(error, "SC-intro")
            sendErrorDC(client, message, "intro", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }  
    }

});