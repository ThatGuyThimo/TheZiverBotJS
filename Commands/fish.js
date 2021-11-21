const Command = require("../Structures/Command.js");

const { randomArray } = require("../Classes/functions.js");

module.exports = new Command({
    name:           "fish",
    description:    "responds with random fish gif",
    
    async run(message, args, client) {
        message.reply(randomArray("fish.json","gifs"));
    }

});