const Command = require("../Structures/Command.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new Command({
    name: "sticky",
    description: "plays stickykeys sound in vc",

    async run(message, args, client) {
        playAudio('stickykeys.mp3', message);
    }

});