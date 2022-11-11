const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

module.exports = new SlashCommand({
    name: "voicehelp",
    description: "Shows info about commands",
    async run(message, args, client) {

        const embed = new Discord.MessageEmbed();

        embed.setTitle(`${client.user.username} voicehelp`)
            .setAuthor(
                message.user.username,
                message.user.avatarURL()
            )
            .setDescription(`Information and usage of ${client.user.username} voice commands`)
            .setColor("GREEN")
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp(message.createdTimestamp)
            .setFooter("YOU HAVE TO BE IN A VOICE CHANNEL TO USE THESE COMMANDS")
            .addFields(
                {
                    name: `${config.prefix}intro`,
                    value: `${client.user.username} introduction`,
                    inline: false
                },
                {
                    name: `${config.prefix}cheese`,
                    value: "plays cheese sound",
                    inline: false
                },
                {
                    name: `${config.prefix}burp`,
                    value: "plays burp sound",
                    inline: false
                },
                {
                    name: `${config.prefix}sticky`,
                    value: "plays sticky keys sound",
                    inline: false
                },
                {
                    name: `${config.prefix}cabbagecat`,
                    value: "plays cabbagecat sounds",
                    inline: false
                },
                {
                    name: `${config.prefix}beans`,
                    value: "plays beans sound",
                    inline: false
                },
                {
                    name: `${config.prefix}dice`,
                    value: "gets random dice number",
                    inline: false
                },
                {
                    name: `${config.prefix}bassdrop`,
                    value: "plays bassdrop",
                    inline: false
                },
                {
                    name: `${config.prefix}dinosaur`,
                    value: "plays dinosaur",
                    inline: false
                },
            );

        // message.channel.send({ embeds: [embed] });
        message.reply({ embeds: [embed] });
    }
});