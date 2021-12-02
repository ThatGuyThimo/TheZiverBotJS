const Command = require("../Structures/Command.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new Command({
    name: "cheese",
    description: "plays cheese sound in vc",

    async run(message, args, client) {
        playAudio('cheese.mp3', message);
    }

});