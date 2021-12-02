const Command = require("../Structures/Command.js");

const { getChannel } = require("../Classes/youtube.js");

const config = require("../Data/config.json");

const Discord = require("discord.js");

module.exports = new Command({
    name: "subs",
    description: "gives subs from <@186113462584344577>",

    async run(message, args, client) {
        getChannel(config['api_key']);

        const embed = new Discord.MessageEmbed();

        embed.setAuthor(
            'TheZiver',
            'https://cdn.discordapp.com/attachments/793311822555512873/897081743012663336/ziver_discord_picture-1.gif'
        )
            .setColor("GREEN")
            .setTimestamp(message.createdTimestamp)
            .addFields(
                {
                    name: "Subscrubers",
                    value: `${subcount}`,
                    inline: false
                },
            );

        message.channel.send({ embeds: [embed] });
    }

});