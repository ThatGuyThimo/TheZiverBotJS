const fs = require('fs');

let time = new Date().getHours();

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
 * @param {Client} client  
 */
function intervalPing(client) {

    let nowtime = new Date().getHours();

    if (nowtime != time) {
        client.channels.cache.get('897144218571653150').send(randomArray("pings.json", "pings"));
        time = nowtime;
    }
}

module.exports = { randomArray, intervalPing };