const Command = require("../Structures/Command.js");

const fs = require('fs');

require("../Classes/functions.js");

module.exports = new Command({
    name:           "fish",
    description:    "responds with random fish gif",

    async run(message, args, client) {

        let array = fs.readFileSync("./Data/fish.json");
        let data = JSON.parse(array);

        var keylist = Object.keys(data.gifs);
        var ran_key = keylist[Math.floor(Math.random() *keylist.length)];

        message.reply(data.gifs[keylist[ran_key]]);

    }

});