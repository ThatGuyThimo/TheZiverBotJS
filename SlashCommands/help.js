const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

module.exports = new SlashCommand({
    name: "help",
    description: "Shows info about commands",
    async run(message, args, client) {

        const embed = new Discord.MessageEmbed();

        embed.setTitle(`${client.user.username} help`)
            .setAuthor(
                message.user.username,
                message.user.avatarURL()
            )
            .setDescription(`Information and usage of ${client.user.username}`)
            .setColor("GREEN")
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp(message.createdTimestamp)
            .addFields(
                {
                    name: `${config.prefix}about`,
                    value: `gives info about ${client.user.username}`,
                    inline: false
                },
                {
                    name: `${config.prefix}help`,
                    value: `gives info about ${client.user.username} text commands`,
                    inline: false
                },
                {
                    name: `${config.prefix}voicehelp`,
                    value: `gives info about ${client.user.username} voice commands`,
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
                    name: `${config.prefix}ping`,
                    value: "pings ziver in <#897144218571653150>",
                    inline: false
                },
                {
                    name: `${config.prefix}schedule`,
                    value: "for zivers upload schedule",
                    inline: false
                },
            );

        // message.channel.send({ embeds: [embed] });
        message.reply({ embeds: [embed] });

    }
});