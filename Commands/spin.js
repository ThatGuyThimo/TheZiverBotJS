const Command = require("../Structures/Command.js");

const fs = require('fs');

module.exports = new Command({
    name:           "spin",
    description:    "responds with random spinny gif",

    async run(message, args, client) {

        let array = fs.readFileSync("./Data/spinny.json");
        let data = JSON.parse(array);

        var keylist = Object.keys(data.gifs);
        var ran_key = keylist[Math.floor(Math.random() *keylist.length)];

        message.reply(data.gifs[keylist[ran_key]]);

    }

});