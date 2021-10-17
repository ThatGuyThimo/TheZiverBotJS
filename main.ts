import DiscordJS, { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const { SlashCommandBuilder } = require('@discordjs/builders');

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () =>{
    console.log(`Logged in as ${client.user.tag}`)

    const guildId = '457250278912032790'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'fish',
        description: 'Replies with < > <'
    })

})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
}
const {commandName, option} = interaction

    if (commandName === 'fish'){
        interaction.reply({
            content: '< > <',
            ephemeral: false
        })
    }
})

client.login(process.env.token)