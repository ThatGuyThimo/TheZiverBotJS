const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "voicehelp",
    description: "Shows info about commands",
    async run(message, args, client) {

        try {
            const embed = new Discord.EmbedBuilder()
    
                .setTitle(`${client.user.username} voicehelp`)
                .setAuthor({
                    name : message.user.tag,
                    iconURL : message.user.avatarURL()
                })
                .setDescription(`Information and usage of ${client.user.username} voice commands`)
                .setColor(config.color)
                .setThumbnail(client.user.avatarURL({ dynamic: true }))
                .setTimestamp(message.createdTimestamp)
                .setFooter({ text: "YOU HAVE TO BE IN A VOICE CHANNEL TO USE THESE COMMANDS"})
                .addFields([
                    {
                        name: `/voicedc`,
                        value: "disconnects the bot from voice channel",
                        inline: false
                    },
                    {
                        name: `/intro`,
                        value: `Plays ${client.user.username} introduction`,
                        inline: false
                    },
                    {
                        name: `/cheese`,
                        value: "Plays cheese sound",
                        inline: false
                    },
                    {
                        name: `/burp`,
                        value: "Plays burp sound",
                        inline: false
                    },
                    {
                        name: `/sticky`,
                        value: "Plays sticky keys sound",
                        inline: false
                    },
                    {
                        name: `/cabbagecat`,
                        value: "Plays cabbagecat sounds",
                        inline: false
                    },
                    {
                        name: `/beans`,
                        value: "Plays beans sound",
                        inline: false
                    },
                    {
                        name: `/dice`,
                        value: "Plays random dice number",
                        inline: false
                    },
                    {
                        name: `/bassdrop`,
                        value: "plays bassdrop sound",
                        inline: false
                    },
                    {
                        name: `/dinosaur`,
                        value: "plays dinosaur sound",
                        inline: false
                    },
                    {
                        name: `/huh`,
                        value: "plays hallmusic made by <@!161297999182430209>",
                        inline: false
                    },
                ]
                );
    
            // message.channel.send({ embeds: [embed] });
            message.reply({ embeds: [embed] });

        } catch(error) {
            logError(error, "SC-voicehelp")
            sendErrorDC(client, message, "voicehelp", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }
});