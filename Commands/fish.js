const Command = require("../Structures/Command.js");

const { randomArray, parsejson } = require("../Classes/functions.js");


module.exports = new Command({
    name:           "test",
    description:    "responds with random fish gif",
    
    async run(message, args, client) {
        

        try {
            
            return result;
        }
        catch {
            result = 'something went wrong';
            console.log(result);
            return result;
        }

        message.reply(randomArray("fish.json","gifs"));
    }

});