const SlashCommand = require("../Structures/SlashCommand.js");

const { getChannel } = require("../Classes/youtube.js");

const config = require("../Data/config.json");

const Discord = require("discord.js");

module.exports = new SlashCommand({
    name: "channel",
    description: "gives info on <@186113462584344577>",

    async run(message, args, client) {
        getChannel(config['api_key']);

        const embed = new Discord.MessageEmbed();

        embed.setTitle(`Channel`)
            .setAuthor(
                message.author.username,
                message.author.avatarURL({ dynamic: true })
            )
            .setDescription(`Channel Information`)
            .setColor("GREEN")
            .setThumbnail('https://cdn.discordapp.com/attachments/793311822555512873/897081743012663336/ziver_discord_picture-1.gif')
            .setTimestamp(message.createdTimestamp)
            .addFields(
                {
                    name: "Subscrubercount",
                    value: `${subcount}`,
                    inline: false
                },
                {
                    name: "Video's",
                    value: `${videoCount}`,
                    inline: false
                },
                {
                    name: "View's",
                    value: `${viewCount}`,
                    inline: false
                },
            );

        message.channel.send({ embeds: [embed] });
    }

});