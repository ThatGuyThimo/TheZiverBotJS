const Command = require("../Structures/Command.js");

const fs = require('fs');

module.exports = new Command({
    name:           "schedule",
    description:    "for zivers upload schedule",

    async run(message, args, client) {

        let array = fs.readFileSync("./Data/schedule.json");
        let data = JSON.parse(array);

        var keylist = Object.keys(data.ziverschedule);
        var ran_key = keylist[Math.floor(Math.random() *keylist.length)];

        message.reply(data.ziverschedule[keylist[ran_key]]);

    }

});