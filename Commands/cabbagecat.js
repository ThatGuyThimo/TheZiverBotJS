const Command = require("../Structures/Command.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new Command({
    name: "cabbagecat",
    description: "plays cabbagecat sound in vc",

    async run(message, args, client) {
        playAudio('cabbagecat.wav', message);
    }

});