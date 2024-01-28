const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio, randomArray } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "dice",
    description: "plays random number in vc",

    async run(message, args, client) {
        try {
            playAudio(randomArray('dice.json', 'dice'), message);
            message.reply("playing dice");
        } catch(error) {
            logError(error, "SC-dice")
            sendErrorDC(client, message, "dice", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});