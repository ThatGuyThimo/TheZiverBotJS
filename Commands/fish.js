const Command = require("../Structures/Command.js");

module.exports = new Command({
    name:           "fish",
    description:    "responds with < > <",

    async run(message, args, client) {

        message.reply(`< > <`);

    }

});