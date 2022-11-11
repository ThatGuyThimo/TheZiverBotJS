const SlashCommand = require("../Structures/SlashCommand.js");

const { randomArray } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name:           "schedule",
    description:    "for zivers upload schedule",

    async run(message, args, client) {
        message.reply(randomArray("schedule.json","ziverschedule"));
    }

});