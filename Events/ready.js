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
    // sendServerErrorDC(client, "Testing", "test error message")
    console.log(`Discord logged in as ${client.user.tag}`.cyan);
    client.user.setActivity("/help");
    setInterval(() => intervalPing(client), 60000);
    // try {
        setInterval( async () => {
            try {
                await groupMemberCount(client, config.groupIdtheziver, "Zivergroup")
                await groupMemberCount(client, config.groupIdonlyrusk, "Onlyruskgroup")
                await groupMemberCount(client, config.groupIdcheese, "Cheesegroup")
                await groupMemberCount(client, config.groupIdavifair, "Avifairgroup")
                await groupMemberCount(client, config.groupIdfamily, "Familygroup")
                await groupMemberCount(client, config.groupIdportalmedia, "Portalgroup")
            } catch (error) {
                console.log("something went wrong with groupMemberCount Event")
                sendServerErrorDC(client, "groupMemberCount", error)
                await connect(new Date)
            }
        } , 300000);
        await groupMemberCount(client, config.groupIdtheziver, "Zivergroup")
        await groupMemberCount(client, config.groupIdonlyrusk, "Onlyruskgroup")
        await groupMemberCount(client, config.groupIdcheese, "Cheesegroup")
        await groupMemberCount(client, config.groupIdavifair, "Avifairgroup")
        await groupMemberCount(client, config.groupIdfamily, "Familygroup")
        await groupMemberCount(client, config.groupIdportalmedia, "Portalgroup")
        //300000
    // } catch (error) {
    //     console.log("something went wrong with groupMemberCount")
    //     sendServerErrorDC(client, "groupMemberCount", error)
    //     await connect(new Date)
    // }
});