const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "hello",
    description: "says hello",

    async run(message, args, client) {
        message.reply('Hello there random person from the internet.');
    }

});