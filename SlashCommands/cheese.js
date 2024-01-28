const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "cheese",
    description: "plays cheese sound in vc",

    async run(message, args, client) {
        try {
            playAudio('cheese.mp3', message);
            message.reply("playing cheese");
        } catch(error) {
            logError(error, "SC-cheese")
            sendErrorDC(client, message, "cheese", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});