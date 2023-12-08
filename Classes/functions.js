const fs = require('fs');

const voiceDiscord = require('@discordjs/voice');

let time = new Date().getHours();
const player = voiceDiscord.createAudioPlayer();
let connection = null

/**
 * 
 * @param {String} json 
 * @param {String} key 
 * @returns {String}
 */
function randomArray(json, key) {

    let array = fs.readFileSync(`./Data/${json}`);
    let data = JSON.parse(array);

    var keylist = Object.keys(data[key]);
    var ran_key = keylist[Math.floor(Math.random() * keylist.length)];

    return (data[key][keylist[ran_key]]);
}
/**
 * 
 * @param {array} array 
 * @returns {String}
 */
function parsejson(array) {

    let data = JSON.parse(array);
    console.log(data);
}

/**
 * 
 * @param {Discord.Client} client  
 */
async function intervalPing(client) {

    let nowtime = new Date().getHours();

    let todayDay = new Date().getDate();
    let todayMonth = new Date().getMonth();

    if (todayDay == 7 && todayMonth == 6 && nowtime != time) {
        await client.channels.fetch('897144218571653150')
        client.channels.cache.get('897144218571653150').send("***HAPPY BIRTHDAY*** <@186113462584344577> <:tada:994438381314506822> <:confetti_ball:994439911228846120>");
        time = nowtime;
    } else if (nowtime != time) {
        await client.channels.fetch('897144218571653150')
        client.channels.cache.get('897144218571653150').send(randomArray("pings.json", "pings"));
        time = nowtime;
    }
}

/**
 * 
 * @param {string} source 
 * @param {Discord.Client.message} message 
 */
function playAudio(source, message) {
    try {
        const channel = message.member.voice.channel;
        if (!channel) {
            message.reply('Join a voice channel to use this command');
        } else {
            if(connection != null) {
                connection.destroy();
            }
    
            // const player = voiceDiscord.createAudioPlayer();
            const resource = voiceDiscord.createAudioResource(`./audio/${source}`);
    
            connection = voiceDiscord.joinVoiceChannel({
                channelId: channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });
            player.play(resource);
            connection.subscribe(player);
    

            player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
                connection.destroy();
                connection = null
            })
        }
    } catch (e) {
        console.error(e)
    }
}
/**
 * 
 * @param {Discord.Client.message} message 
 */
function stopAudio(message) {
    const channel = message.member.voice.channel;
    if (!channel) {
        message.reply('Join a voice channel to use this command');
    } else {
        if(connection != null) {
            connection.destroy();
            connection = null
        }
    }
}

module.exports = { stopAudio, randomArray, intervalPing, playAudio, parsejson };