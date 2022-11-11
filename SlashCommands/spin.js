const SlashCommand = require("../Structures/SlashCommand.js");

const { randomArray } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name:           "spin",
    description:    "responds with random spinny gif",

    async run(message, args, client) {
        message.reply(randomArray("spinny.json","gifs"));
    }

});