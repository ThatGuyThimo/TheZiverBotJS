const Command = require("../Structures/Command.js");

const { playAudio } = require("../Classes/functions.js");

module.exports = new Command({
    name: "burp",
    description: "plays burp sound in vc",

    async run(message, args, client) {
        playAudio('burp.wav', message);
    }

});