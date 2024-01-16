const Event = require("../Structures/Event.js");

const config = require("../Data/config.json");;

const { intervalPing } = require("../Classes/functions.js");

const { groupMemberCount } = require("../Classes/vrchat.js");

// const connection = require("../Classes/database.js");


module.exports = new Event("ready",async client => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity("/help");
    setInterval(() => intervalPing(client), 60000);
    setInterval(() =>{
        groupMemberCount(config.groupIdtheziver, "Zivergroup")
        groupMemberCount(config.groupIdonlyrusk, "Onlyruskgroup")
    } , 300000);
    //300000
});