const Command = require("../Structures/Command.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new Command({
    name: "dinosaur",
    description: "plays dinosaur sound in vc",

    async run(message, args, client) {
        playAudio('dinosaur.mp3', message);
    }

});