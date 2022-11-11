const SlashCommand = require("../Structures/SlashCommand.js");

module.exports = new SlashCommand({
    name: "hello",
    description: "says hello",

    async run(message, args, client) {
        message.reply('Hello there random person from the internet.');
    }

});