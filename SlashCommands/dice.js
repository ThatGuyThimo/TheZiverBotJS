const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio, randomArray } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "dice",
    description: "plays random number in vc",

    async run(message, args, client) {
        playAudio(randomArray('dice.json', 'dice'), message);
        message.reply("playing dice");
    }

});