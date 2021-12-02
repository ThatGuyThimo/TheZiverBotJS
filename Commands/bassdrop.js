const Command = require("../Structures/Command.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new Command({
    name: "bassdrop",
    description: "plays bassdrop sound in vc",

    async run(message, args, client) {
        playAudio('bassdrop.mp3', message);
    }

});