const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

module.exports = new SlashCommand({
    name: "about",
    description: "shows info about the bot",
    async run(message, args, client) {

        const embed = new Discord.MessageEmbed();

        embed.setTitle(`About  ${client.user.username}`)
            .setAuthor(
                message.user.username,
                message.user.avatarURL()
            )
            .setTimestamp(message.createdTimestamp)
            .setDescription(`Information about  ${client.user.username}`)
            .setColor("GREEN")
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .addFields(
                {
                    name: "Bot Version",
                    value: "1.2.1",
                    inline: false
                },
                {
                    name: "Bot name",
                    value:  client.user.username,
                    inline: false
                },
                {
                    name: "Code",
                    value: "Written in javascript using discord.js version 13.3.1",
                    inline: false
                },
                {
                    name: "Contributer",
                    value: "-Thimo-",
                    inline: false
                },
            );

        // message.channel.send({ embeds: [embed] });
        message.reply({ embeds: [embed] });
    }
});