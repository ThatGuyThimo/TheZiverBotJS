const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "about",
    description: "shows info about the bot",
    async run(message, args, client) {
        try {
            const embed = new Discord.EmbedBuilder()
    
                .setTitle(`About  ${client.user.username}`)
                .setAuthor({
                    name : message.user.tag,
                    iconURL : message.user.avatarURL()
                })
                .setTimestamp(message.createdTimestamp)
                .setDescription(`Information about  ${client.user.username}`)
                .setColor(config.color)
                .setThumbnail(client.user.avatarURL({ dynamic: true }))
                .addFields([
                    {
                        name: "Bot Version",
                        value: config.botVersion,
                        inline: false
                    },
                    {
                        name: "Bot name",
                        value:  client.user.username,
                        inline: false
                    },
                    {
                        name: "Code",
                        value: "Written in javascript using discord.js version 14.9.0",
                        inline: false
                    },
                    {
                        name: "Contributer",
                        value: "-Thimo-",
                        inline: false
                    },
                ]
                );
    
            // message.channel.send({ embeds: [embed] });
            message.reply({ embeds: [embed] });
        } catch(error) {
            logError(error, "SC-about")
            sendErrorDC(client, message, "about", error)
            message.reply("Something went wrong, please contact an admin for help.")
        } 

    }
});