const SlashCommand = require("../Structures/SlashCommand.js");

const { randomArray } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name:           "schedule",
    description:    "for zivers upload schedule",

    async run(message, args, client) {
        try {
            message.reply(randomArray("schedule.json","ziverschedule"));
        } catch(error) {
            logError(error, "SC-schedule")
            sendErrorDC(client, message, "schedule", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});