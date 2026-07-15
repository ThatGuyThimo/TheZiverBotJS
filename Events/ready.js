const Event = require("../Structures/Event.js");

const config = require("../Data/config.json");
const groupConfig = require("../Data/groupsConfig.json");

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
            for (const [key, group] of Object.entries(groupConfig)) {
                if (typeof group === 'object' && group.id && group.name) {
                    await groupMemberCount(client, group.id, group.name);
                }
            }
        } catch (error) {
            console.log("something went wrong with groupMemberCount Event")
            sendServerErrorDC(client, "groupMemberCount", error)
            await connect(new Date)
        }
    } , 600000);
    for (const [key, group] of Object.entries(groupConfig)) {
        if (typeof group === 'object' && group.id && group.name) {
            await groupMemberCount(client, group.id, group.name);
            console.log(`Group member count for ${group.name} (${group.id}) has been updated.`.green);
        } else {
            console.log(`Invalid group configuration for key: ${key}`.red);
        }
    } 
});