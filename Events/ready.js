const Event = require("../Structures/Event.js");

const config = require("../Data/config.json");

const colors = require('colors');

const { intervalPing } = require("../Classes/functions.js");

const { groupMemberCount, connect } = require("../Classes/vrchat.js");

const { sendServerErrorDC } = require("../Classes/errorLogging.js");

// const connection = require("../Classes/database.js");

colors.enable();

module.exports = new Event("ready",async client => {
    try {
    await connect(new Date)
    } catch (error) {
        sendServerErrorDC(client, "connect", error)
        await connect(new Date)
    }

    console.log(`Discord logged in as ${client.user.tag}`.cyan);
    client.user.setActivity("/help");
    setInterval(() => intervalPing(client), 60000);
    try {
        setInterval( async () => {
            await groupMemberCount(config.groupIdtheziver, "Zivergroup")
            await groupMemberCount(config.groupIdonlyrusk, "Onlyruskgroup")
            await groupMemberCount(config.groupIdcheese, "Cheesegroup")
            await groupMemberCount(config.groupIdavifair, "Avifairgroup")
            await groupMemberCount(config.groupIdfamily, "Familygroup")
            await groupMemberCount(config.groupIdportalmedia, "Portalgroup")
        } , 300000);
        await groupMemberCount(config.groupIdtheziver, "Zivergroup")
        await groupMemberCount(config.groupIdonlyrusk, "Onlyruskgroup")
        await groupMemberCount(config.groupIdcheese, "Cheesegroup")
        await groupMemberCount(config.groupIdavifair, "Avifairgroup")
        await groupMemberCount(config.groupIdfamily, "Familygroup")
        await groupMemberCount(config.groupIdportalmedia, "Portalgroup")
        //300000
    } catch (error) {
        console.log("something went wrong with groupMemberCount")
        sendServerErrorDC(client, "connect", error)
        await connect(new Date)
    }
});