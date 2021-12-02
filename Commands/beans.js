const Command = require("../Structures/Command.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new Command({
    name: "beans",
    description: "plays beans sound in vc",

    async run(message, args, client) {
        playAudio('beans.mp3', message);
    }

});