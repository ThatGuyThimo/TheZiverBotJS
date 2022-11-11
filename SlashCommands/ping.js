const SlashCommand = require("../Structures/SlashCommand.js");

const { randomArray } = require("../Classes/functions.js");

module.exports = new SlashCommand({
    name: "ping",
    description: "pings Ziver in <#897144218571653150>",

    async run(message, args, client) {

        client.channels.cache.get('897144218571653150').send(randomArray("pings.json", "pings"));
        message.reply("pinged ziver :D");
    }

});