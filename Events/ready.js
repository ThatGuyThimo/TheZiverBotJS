const Event = require("../Structures/Event.js");

const config = require("../Data/config.json");;

const { intervalPing } = require("../Classes/functions.js");

const { groupMemberCount } = require("../Classes/vrchat.js");

// const connection = require("../Classes/database.js");


module.exports = new Event("ready",async client => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity("/help");
    setInterval(() => intervalPing(client), 60000);
    setInterval( async () => {
        await groupMemberCount(config.groupIdtheziver, "Zivergroup")
        await groupMemberCount(config.groupIdonlyrusk, "Onlyruskgroup")
        await groupMemberCount(config.groupIdcheese, "Cheesegroup")
        await groupMemberCount(config.groupIdavifair, "Avifairgroup")
    } , 300000);
    await groupMemberCount(config.groupIdtheziver, "Zivergroup")
    await groupMemberCount(config.groupIdonlyrusk, "Onlyruskgroup")
    await groupMemberCount(config.groupIdcheese, "Cheesegroup")
    await groupMemberCount(config.groupIdavifair, "Avifairgroup")
    //300000
});