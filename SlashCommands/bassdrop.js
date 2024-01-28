const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "bassdrop",
    description: "plays bassdrop sound in vc",

    async run(message, args, client) {
        try {
            playAudio('bassdrop.mp3', message);
            message.reply("playing bassdrop");
        } catch(error) {
            logError(error, "SC-bassdrop")
            sendErrorDC(client, message, "bassdrop", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});