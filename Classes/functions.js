/**
 * 
 * @param {String} json 
 * @param {String} key 
 * @returns {string}
 */
function randomArray(json, key) {
    const fs = require('fs');

    let array = fs.readFileSync(`./Data/${json}`);
    let data = JSON.parse(array);
    
    var keylist = Object.keys(data[key]);
    var ran_key = keylist[Math.floor(Math.random() *keylist.length)];

    return(data[key][keylist[ran_key]]);
}
module.exports = {randomArray};