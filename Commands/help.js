const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

module.exports = new Command({
    name: "help",
    description: "Shows info about commands",
    async run(message, args, client) {

        const embed = new Discord.MessageEmbed();

        embed.setTitle("TheZiverbot help")
            .setAuthor(
                message.author.username, 
                message.author.avatarURL({ dynamic: true })
                )
            .setDescription("Information and usage of TheZiverBot")
            .setColor("GREEN")
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp(message.createdTimestamp)
            .addFields(
                {
                    name: `${config.prefix}help`,
                    value: "gives info about theZiverBot text commands",
                    inline: false
                },
                {
                    name: `${config.prefix}voicehelp`,
                    value: "gives info about theZiverBot voice commands",
                    inline: false
                },
                {
                    name: `${config.prefix}hello`,
                    value: "to get a hello message",
                    inline: false
                },
                {
                    name: `${config.prefix}fish`,
                    value: "for fish gifs",
                    inline: false
                },
                {
                    name: `${config.prefix}spin`,
                    value: "for spinny gifs",
                    inline: false
                },
                {
                    name: `${config.prefix}channel`,
                    value: "to get information on Zivers channel",
                    inline: false
                },
                {
                    name: `${config.prefix}ping`,
                    value: "pings ziver in <#897144218571653150>",
                    inline: false
                },
                {
                    name: `${config.prefix}subs`,
                    value: "for amount of subscruber",
                    inline: false
                },
                {
                    name: `${config.prefix}schedule`,
                    value: "for zivers upload schedule",
                    inline: false
                },
            );

        message.channel.send({ embeds: [embed] });

    }
});