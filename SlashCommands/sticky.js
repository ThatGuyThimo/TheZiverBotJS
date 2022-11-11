const SlashCommand = require("../Structures/SlashCommand.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "sticky",
    description: "plays stickykeys sound in vc",

    async run(message, args, client) {
        playAudio('stickykeys.mp3', message);
    }

});