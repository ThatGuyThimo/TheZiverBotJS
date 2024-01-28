const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "help",
    description: "Shows info about commands",
    async run(message, args, client) {
        try {
            const embed = new Discord.EmbedBuilder()
    
                .setTitle(`${client.user.username} help`)
                .setAuthor({
                    name : message.user.tag,
                    iconURL : message.user.avatarURL()
                })
                .setDescription(`Information and usage of ${client.user.username}`)
                .setColor(config.color)
                .setThumbnail(client.user.avatarURL({ dynamic: true }))
                .setTimestamp(message.createdTimestamp)
                .addFields([
                    {
                        name: `/about`,
                        value: `gives info about ${client.user.username}`,
                        inline: false
                    },
                    {
                        name: `/help`,
                        value: `gives info about ${client.user.username} text commands`,
                        inline: false
                    },
                    {
                        name: `/voicehelp`,
                        value: `gives info about ${client.user.username} voice commands`,
                        inline: false
                    },
                    {
                        name: `/hello`,
                        value: "to get a hello message",
                        inline: false
                    },
                    {
                        name: `/fish`,
                        value: "for fish gifs",
                        inline: false
                    },
                    {
                        name: `/spin`,
                        value: "for spinny gifs",
                        inline: false
                    },
                    {
                        name: `/ping`,
                        value: "pings ziver in <#897144218571653150>",
                        inline: false
                    },
                    {
                        name: `/schedule`,
                        value: "for zivers upload schedule",
                        inline: false
                    },
                ]);
    
            // message.channel.send({ embeds: [embed] });
            message.reply({ embeds: [embed] });
        } catch(error) {
            logError(error, "SC-help")
            sendErrorDC(client, message, "help", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }
});