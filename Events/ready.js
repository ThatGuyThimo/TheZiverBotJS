const Event = require("../Structures/Event.js");

const config = require("../Data/config.json");
const groupConfig = require("../Data/groupConfig.json");

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
    // sendServerErrorDC(client, "Testing", "test error message")
    console.log(`Discord logged in as ${client.user.tag}`.cyan);
    client.user.setActivity("/help");
    setInterval(() => intervalPing(client), 60000);
    
    setInterval( async () => {
        try {
            await groupMemberCount(client, groupConfig.groupIdtheziver, "Zivergroup")
            await groupMemberCount(client, groupConfig.groupIdonlyrusk, "Onlyruskgroup")
            await groupMemberCount(client, groupConfig.groupIdcheese, "Cheesegroup")
            await groupMemberCount(client, groupConfig.groupIdavifair, "Avifairgroup")
            await groupMemberCount(client, groupConfig.groupIdfamily, "Familygroup")
            await groupMemberCount(client, groupConfig.groupIdportalmedia, "Portalgroup")
        } catch (error) {
            console.log("something went wrong with groupMemberCount Event")
            sendServerErrorDC(client, "groupMemberCount", error)
            await connect(new Date)
        }
    } , 300000);
    await groupMemberCount(client, groupConfig.groupIdtheziver, "Zivergroup")
    await groupMemberCount(client, groupConfig.groupIdonlyrusk, "Onlyruskgroup")
    await groupMemberCount(client, groupConfig.groupIdcheese, "Cheesegroup")
    await groupMemberCount(client, groupConfig.groupIdavifair, "Avifairgroup")
    await groupMemberCount(client, groupConfig.groupIdfamily, "Familygroup")
    await groupMemberCount(client, groupConfig.groupIdportalmedia, "Portalgroup")
});