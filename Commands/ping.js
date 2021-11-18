const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
    name:           "ping",
    description:    "pings ZIver in <#897144218571653150>",

    async run(message, args, client) {

        client.channels.cache.get('897144218571653150').send('<@186113462584344577> make video man');

    }

});