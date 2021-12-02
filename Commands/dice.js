const Command = require("../Structures/Command.js");

const { playAudio, randomArray } = require("../Classes/functions.js");

module.exports = new Command({
    name: "dice",
    description: "plays random number in vc",

    async run(message, args, client) {
        playAudio(randomArray('dice.json', 'dice'), message);
    }

});