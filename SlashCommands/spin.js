const SlashCommand = require("../Structures/SlashCommand.js");

const { randomArray } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name:           "spin",
    description:    "responds with random spinny gif",

    async run(message, args, client) {
        try {
            message.reply(randomArray("spinny.json","gifs"));
        } catch(error) {
            logError(error, "SC-spin")
            sendErrorDC(client, message, "spin", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});