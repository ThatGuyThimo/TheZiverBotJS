const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
    name: "about",
    description: "shows info about the bot",
    async run(message, args, client) {

        const embed = new Discord.MessageEmbed();

        embed.setTitle("About theZiverbot")
            .setAuthor(
                message.author.username, 
                message.author.avatarURL({ dynamic: true })
                )
            .setDescription("Information about theZiverbot")
            .setColor("GREEN")
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp(message.createdTimestamp)
            .setFooter("THIS BOT IS STILL A WIP")
            .addFields(
                {
                    name: "Bot Version",
                    value: "1.0.3",
                    inline: false
                },
                {
                    name: "Bot name",
                    value: client.user.username,
                    inline: false 
                },
                {
                    name: "Code",
                    value: "Written in javascript using discord.js version 13.2.0",
                    inline: false
                },
            );

        message.channel.send({ embeds: [embed] });

    }
});