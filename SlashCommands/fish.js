const SlashCommand = require("../Structures/SlashCommand.js");

const { randomArray } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name:           "fish",
    description:    "responds with random fish gif",
    
    async run(message, args, client) {
        try {
            message.reply(randomArray("fish.json","gifs"));
        } catch(error) {
            logError(error, "SC-fish")
            sendErrorDC(client, message, "fish", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});