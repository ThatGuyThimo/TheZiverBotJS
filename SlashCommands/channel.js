const SlashCommand = require("../Structures/SlashCommand.js");

const { getChannel } = require("../Classes/youtube.js");

const config = require("../Data/config.json");

const Discord = require("discord.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "channel",
    description: "gives info on <@186113462584344577>",

    async run(message, args, client) {

        try {
            const data = getChannel(config['api_key']);
    
            const embed = new Discord.EmbedBuilder()
    
            .setTitle(`Channel`)
            .setAuthor({
                name : message.user.tag,
                iconURL : message.user.avatarURL()
            })
                .setDescription(`Channel Information`)
                .setColor(config.color)
                .setThumbnail('https://cdn.discordapp.com/attachments/793311822555512873/897081743012663336/ziver_discord_picture-1.gif')
                .setTimestamp(message.createdTimestamp)
                .addFields([
                    {
                        name: "Subscrubercount",
                        value: `${data['subcount']}`,
                        inline: false
                    },
                    {
                        name: "Video's",
                        value: `${data['videoCount']}`,
                        inline: false
                    },
                    {
                        name: "View's",
                        value: `${data['viewCount']}`,
                        inline: false
                    },
                ]
                );
    
            message.reply({ embeds: [embed] });
        } catch(error) {
            logError(error, "SC-channel")
            sendErrorDC(client, message, "channel", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }

    }

});