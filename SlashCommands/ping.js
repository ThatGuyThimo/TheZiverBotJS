const SlashCommand = require("../Structures/SlashCommand.js");

const { randomArray } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "ping",
    description: "pings Ziver in <#897144218571653150>",

    async run(message, args, client) {
        try {
            await client.channels.fetch('897144218571653150')
            client.channels.cache.get('897144218571653150').send(randomArray("pings.json", "pings"));
            message.reply("pinged ziver :D");
        } catch(error) {
            logError(error, "SC-ping")
            sendErrorDC(client, message, "ping", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

});