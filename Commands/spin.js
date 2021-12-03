const Command = require("../Structures/Command.js");

const { randomArray } = require("../Classes/functions.js");

module.exports = new Command({
    name:           "spin",
    description:    "responds with random spinny gif",

    async run(message, args, client) {
        message.reply(randomArray("spinny.json","gifs"));
    }

});