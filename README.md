# TheZiverBotJS

**Version 1.4.0**

TheZiverBotJS AKA Y E S is a Discord bot for Youtuber TheZiver.
- Discord https://discord.gg/Z34mSSM
- YouTube https://youtube.com/c/TheZiver

This bot is a remake of the discord.py version.

On monday, 28 august 2021 Danny the creator of discord.py announced his resignation as maintainer of discord.py and the library became end of life.
Read more [here](https://gist.github.com/Rapptz/4a2f62751b9600a31a0d3c78100287f1).

---
## NOTICE

This bot is up to the same working order as the bot in the Discord.
The bot running in the Discord is the JavaScript version as of Thursday 2 December 2021.

---
## Documentation
## How to run the bot
1. first make sure you have Node installed, if not you can download it from [here](https://nodejs.org/en) and create a bot at the [Discord developer portal](https://discord.com/developers/applications).

2. Install the required packages by running the following command inside of the folder.
    ```cli
    npm install
    ```
3. Create a file inside the Data folder called cookies.json and leave it empty.
4. Create and populate the config.json in the Data folder (an example has been provided).
   ![image](/MD/Images/Example-config.jpg)
5. Run the bot with.
   ```cli
   node main.js
   ```
### How to add commands
To add commands you will have to create a new JavaScript file in the SlashCommands folder and name it appropiatly.
![image](/MD/Images/Slashcommands-Structure.jpg)
> [!CAUTION]
> Do not use the Commands folder as this has been depricated

An example of a basic command would be:
```js
const SlashCommand = require("../Structures/SlashCommand.js");

module.exports = new SlashCommand({
    name: "hello", // caution name and description cannot contain capitals
    description: "says hello", 

    async run(message, args, client) {
        message.reply('Hello random person from the internet.');
    }

});
```
An example of an embed would be:
```js
const SlashCommand = require("../Structures/SlashCommand.js");
const Discord = require("discord.js");

module.exports = new SlashCommand({
    name: "example",
    description: "shows an example embed",
    async run(message, args, client) {
        try {
            const embed = new Discord.EmbedBuilder()
    
                .setTitle(`About  ${client.user.username}`)
                .setAuthor({
                    name : message.user.tag,
                    iconURL : message.user.avatarURL()
                })
                .setTimestamp(message.createdTimestamp)
                .setDescription(`Information about  ${client.user.username}`)
                .setColor("#00FF00")
                .setThumbnail(client.user.avatarURL({ dynamic: true }))
                .addFields([
                    {
                        name: "Field 1",
                        value: "value",
                        inline: false
                    },
                    {
                        name: "Field 2",
                        value:  "value",
                        inline: false
                    }
                ]);
            message.reply({ embeds: [embed] });
        } catch(error) {
            message.reply("Something went wrong, please contact an admin for help.")
        } 

    }
});
```

### How to add a group to the bot

To add a new group, add a new key-value pair to the object in groupConfig.json.
The key should be the name of the group, and the value should be the group ID.
The group ID can be found in the URL of the group's page on the [VRChat website](https://vrchat.com). 
For example:
![image](/MD/Images/GroupConfig.json.png)
Than add paste the following line twice into Events/ready.js
```js
await groupMemberCount(client, groupConfig.GROUPID, "GROUPNAME")
```
Example:
![image](/MD/Images/Ready.js.png)

---
## API 
### How to run the API
1. navigate to /API using the terminal.
2. Install the required packages by running the following command inside of the folder.
    ```cli
    npm install
    ```
3. Creat and populate the .env file according to the example below.
   ![image](/MD/Images/Example-APIconfig.jpg)
4. To be able to start the API you will need to provide SSL certificate and private key in API/index.js.
   ![image](/MD/Images/Cert-example.JPG)
   If you cannot provide the certificate or you dont want to use SSL you can comment the following lines in API/index.js.
   ![image](/MD/Images/Https-Example.JPG)
> [!CAUTION]
> You have to comment or delete the https lines above for the API to work without an SSL certificate.
5. Run the API with.
   ```cli
   node index.js
   ```


### How to add a group to the API
Add paste the following line into API/index.js.
   ```js
   app.use('/NAME_OF_ROUTE', new Route('NAME_OF_KEY').router)
   ```
   ![image](/MD/Images/API-Router.jpg)
   The **"NAME_OF_ROUTE"** should be the name after the slash for example ```https://mydomain/myname```.
   The **"NAME_OF_KEY"** should be the ***exact*** name you gave to the **"GROUPNAME"** field at [How to add a group to the bot](###How-to-add-a-group-to-the-bot).

---
## Default ussage
### Chat commands

- /about (Gives info about the Bot)
- /help (Gives info on all the available chat commands)
- /voicehelp (Gives info on all the available voice chat commands)
- /channel (Gives info about the [@TheZiver](https://www.youtube.com/@TheZiver) Youtube channel)
- /fish (Sends a random fish gif)
- /hello (Says hello)
- /spin (Sends a random spinny gif)
- /ping (Pings TheZiver in a specific channel)
- /schedule (Gives the zivers upload schedule)

### Voice chat commands

- /voicedc (disconnects the bot from voice channel)
- /intro (Plays bot introduction)
- /cheese (plays cheese sound)
- /burp (Plays burp sound)
- /sticky (Plays sticky keys sound)
- /cabbagecat (Plays cabbagecat sound)
- /beans (Plays beans sound)
- /dice (Plays random dice number and "YES")
- /bassdrop (Plays bassdrop sound)
- /dinosaur (Plays dinosaur sound)
- /huh (Plays hallmusic sound made by @Cunk)

### API endpoints
- /all (all the data from the other endpoints)
- /theziver (thezivers vrchat group member count)
- /onlyrusk (OnlyRusk vrchat group member count)
- /avifair (Avifair vrchat group member count)
- /family (FamilyFriendlyCult vrchat group member count)
- /portal (PortalMedia vrchat group member count)
- /cheese (Cheese vrchat group member count)

---
## Contributors

- ThatGuyThimo

---
## Terms and conditions
Apache License
Version 2.0, January 2004
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)
