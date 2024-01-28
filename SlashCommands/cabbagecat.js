const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "cabbagecat",
    description: "plays cabbagecat sound in vc",

    async run(message, args, client) {
        try {
            playAudio('cabbagecat.mp3', message);
            message.reply("playing cabbagecat");
        } catch(error) {
            logError(error, "SC-cabbagecat")
            sendErrorDC(client, message, "cabbagecat", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});