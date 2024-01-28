const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "dinosaur",
    description: "plays dinosaur sound in vc",

    async run(message, args, client) {
        try {
            playAudio('dinosaur.mp3', message);
            message.reply("playing dinosaur");
        } catch(error) {
            logError(error, "SC-dinosaur")
            sendErrorDC(client, message, "dinosaur", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});