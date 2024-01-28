const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "burp",
    description: "plays burp sound in vc",

    async run(message, args, client) {
        try {
            playAudio('burp.wav', message);
            message.reply("playing burp");
        } catch(error) {        
            logError(error, "SC-burp")
            sendErrorDC(client, message, "burp", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});