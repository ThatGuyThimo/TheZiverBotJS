const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "sticky",
    description: "plays stickykeys sound in vc",

    async run(message, args, client) {
        try {
            playAudio('stickykeys.mp3', message);
            message.reply("playing sticky");
        } catch(error) {
            logError(error, "SC-sticky")
            sendErrorDC(client, message, "sticky", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});