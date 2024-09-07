require('dotenv').config()
console.clear();

const Client = require("./Structures/Client.js");

const client = new Client();

client.start(process.env.TOKEN);