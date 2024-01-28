const config = require("../Data/config.json");

const fs = require('fs');
const path = require('path');
const Discord = require("discord.js");

/**
 * Creates error loging dir.
 */
async function _createloggingFolder() {
    return new Promise((resolve, reject) =>{
        fs.mkdirSync(path.join(config.loggingDir, "errorLogs"), { recursive: true }, function (error) {
            if (error) {
                console.log(error)
                reject(error)
            }
        })
        resolve(true)
    })
}

/**
 * 
 * @param {error} value 
 * @param {String} name 
 * @returns string (file name)
 */
async function logError(value, name) {
    return new Promise(async function (resolve, reject) {        
        let date = new Date
        let fileName = `${name}-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}-h${date.getHours()}-m${date.getMinutes()}-s${date.getSeconds()}-rn${Math.random()}`
        if (await _createloggingFolder()) {
            fs.open(`${config.loggingDir}errorLogs/${fileName}.txt`, 'w', function (error) {
                if (error) {
                    console.log(error)
                    reject(false)
                }
            })
            fs.writeFile(`${config.loggingDir}errorLogs/${fileName}.txt`, `${value}`, function (error) {
                if (error) {
                    console.log(error)
                    reject(false)
                }
                resolve(fileName)
            })
        }
    })
}

/**
 * 
 * @param {Discord client} client 
 * @param {Discord message} message 
 * @param {String} command 
 * @param {String} error 
 */
async function sendErrorDC(client, message, command, error) {
    try {
        await client.channels.fetch(config.loggingChannel)
        botErrors = await client.channels.cache.get(config.loggingChannel)

        const embed = new Discord.EmbedBuilder()

        .setTitle(`ERROR LOG`)
        .setAuthor({
            name : message.user.tag,
            iconURL : message.user.avatarURL()
        })
        .setColor("FF0000")
        .setTimestamp()
        .addFields([
            {
                name: "Bot Version",
                value: config.botVersion,
                inline: false
            },
            {
                name: "Command",
                value: `${command}`,
                inline: false
            },
            {
                name: "Send by",
                value: `${message.user.tag}`,
                inline: false
            },
            {
                name: "Error",
                value: "```js\n" + error + "```",
                inline: false
            },
        ]);
        botErrors.send({ embeds: [embed] });
    } catch(error) {
        console.log(error)
        console.log('something went wrong with sendErrorDC')
    }
}

/**
 * 
 * @param {Discord client} client 
 * @param {String} functionName 
 * @param {String} error 
 */
async function sendServerErrorDC(client, functionName, error) {
    try {
        await client.channels.fetch(config.loggingChannel)
        botErrors = await client.channels.cache.get(config.loggingChannel)

        const embed = new Discord.EmbedBuilder()

        .setTitle(`SERVER ERROR LOG`)
        .setAuthor({
            name : client.user.tag,
            iconURL : client.user.avatarURL()
        })
        .setColor("FF0000")
        .setTimestamp()
        .addFields([
            {
                name: "Bot Version",
                value: config.botVersion,
                inline: false
            },
            {
                name: "Function",
                value: `${functionName}`,
                inline: false
            },
            {
                name: "Error",
                value: "```js\n" + error + "```",
                inline: false
            },
        ]);
        botErrors.send({ embeds: [embed] });
} catch(error) {
    console.log(error)
    console.log('something went wrong with sendServerErrorDC')
}
}
module.exports = {logError, sendErrorDC, sendServerErrorDC}