const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "beans",
    description: "plays beans sound in vc",

    async run(message, args, client) {
        try {
            playAudio('beansdrop.mp3', message);
            message.reply("playing beans");
        } catch(error) {
            logError(error, "SC-beans")
            sendErrorDC(client, message, "beans", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});