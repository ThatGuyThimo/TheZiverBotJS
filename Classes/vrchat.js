const vrchat = require("vrchat");

const config = require("../Data/config.json");


const configuration = new vrchat.Configuration({
    username: config.email,
    password: config.password
});

const UsersApi = new vrchat.UsersApi(configuration);

const AuthenticationApi = new vrchat.AuthenticationApi(configuration);

AuthenticationApi.getCurrentUser().then(resp => {
    console.log(`VRchat logged in as: ${resp.data.displayName}`);
})

// var statestart =  'offline';

function online() {
    try {
        return new Promise(resolve => {
            UsersApi.getUser(config.user).then(resp => {
            resolve(resp.data)
         })
        })
    } catch {
        console.log('could not fetch user')
    }
}

// async function onlineping(client) {
//     try {
//         statenow = await online();
//         if (statestart != statenow.state) {
//             statestart = statenow.state;
//             if (statestart == "online") {
//                 client.channels.cache.get('927271117155074158').send(`Ziver is ${statestart}`);
//             } else if(statestart == "active") {
//                 client.channels.cache.get('927271117155074158').send(`Ziver is ${statestart}`);
//             } else {
//                 client.channels.cache.get('927271117155074158').send(`Ziver is ${statestart}`);
//             }
    
//         }
//     } catch {
//         console.log('something went wrong with the status check')
//     }
// }

module.exports = { online }