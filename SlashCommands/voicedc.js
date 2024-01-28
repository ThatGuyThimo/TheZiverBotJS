const SlashCommand = require("../Structures/SlashCommand.js");

const { stopAudio } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "voicedc",
    description: "stops playing audio in vc",

    async run(message, args, client) {
        try {
            stopAudio(message);
            message.reply("stopped audio");
        } catch(error) {
            logError(error, "SC-voicedc")
            sendErrorDC(client, message, "voicedc", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});