const Command = require("../Structures/Command.js");

const { randomArray } = require("../Classes/functions.js");

module.exports = new Command({
    name:           "schedule",
    description:    "for zivers upload schedule",

    async run(message, args, client) {
        message.reply(randomArray("schedule.json","ziverschedule"));
    }

});