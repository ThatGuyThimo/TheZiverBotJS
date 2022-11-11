const SlashCommand = require("../Structures/SlashCommand.js");

const { randomArray } = require("../Classes/functions.js");


module.exports = new SlashCommand({
    name:           "fish",
    description:    "responds with random fish gif",
    
    async run(message, args, client) {
        message.reply(randomArray("fish.json","gifs"));
        message.reply("playing fish");
    }

});