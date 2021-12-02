const Command = require("../Structures/Command.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new Command({
    name: "intro",
    description: "plays intro sound in vc",

    async run(message, args, client) {
        playAudio('intro.mp3', message);
    }

});