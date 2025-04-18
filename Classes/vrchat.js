require('dotenv').config()

const vrchat = require("vrchat");

const axios = require('axios');

const tough = require("tough-cookie");

const config = require("../Data/config.json");

const colors = require('colors');

const totp = require("totp-generator");

const fs = require('fs');


// const { dbInsert, dbFindAndDelete, dbFindAndBan, dbFindAndUnban, dbFind } = require("./mongo.js");
const { logError, sendServerErrorDC } = require("./errorLogging.js");

colors.enable()

let lastTime = new Date
let lastPing = new Date
lastPing = lastPing.getTime()

let loggedin = false

const configuration = new vrchat.Configuration({
    username: encodeURI(process.env.EMAIL),
    password: encodeURI(process.env.PASSWORD),
});


let UsersApi = null
let WorldApi = null
let GroupApi = null
let AuthenticationApi = null
let CookieExpirationDate = null
let TwoAuthCookieExpirationDate = null


async function logout() {
    loggedin = false
    AuthenticationApi.logout()
}
 
/**
 * 
 * @param {Date} now Date.
 */
async function connect (now) {
    return new Promise(async(resolve, reject) => {
        try {
    
            if (loggedin) {
                console.warn('logging out!'.yellow)
                AuthenticationApi.logout()
            }
    
            let auth_token = null
            let two_auth_token = null

            const path = './Data/cookies.json';

            // Check if the file exists
            if (!fs.existsSync(path)) {
                // Create an empty JSON file
                fs.writeFileSync(path, JSON.stringify({}), 'utf-8');
            }
    
            let cookies = fs.readFileSync(path, "utf-8");
            if (cookies !== "") {
                axios.defaults.jar = tough.CookieJar.fromJSON(JSON.parse(cookies));
                cookies = JSON.parse(cookies)
                cookies.cookies.forEach(cookie => {                    
                    if (cookie.expires && cookie.key == "auth") {
                        CookieExpirationDate = new Date(cookie.expires);
                        // console.log(CookieExpirationDate, new Date())
                        if (CookieExpirationDate < new Date()) {
                            console.log('Auth cookie has expired'.yellow);
                            auth_token = null
                        } else {
                            console.log('Auth cookie has not expired'.green);
                            auth_token = cookie.value
                        }
                    } else if(cookie.expires && cookie.key == "twoFactorAuth") {
                        TwoAuthCookieExpirationDate = new Date(cookie.expires);
                        // console.log(TwoAuthCookieExpirationDate, new Date())
                        if (TwoAuthCookieExpirationDate < new Date()) {
                            console.log('TwoAuth cookie has expired'.yellow);
                            two_auth_token = null
                        } else {
                            console.log('TwoAuth Cookie has not expired'.green);
                            two_auth_token = cookie.value
                        }   
                    }
                });
            }
    
            let axiosConfig = axios.create({
                headers: {
                    'Accept': '*/*',
                    'User-Agent': `${config.userAgent}`,
                }
            });
    
            AuthenticationApi = new vrchat.AuthenticationApi(configuration, undefined, axiosConfig);
    
            let session = false;
            if(auth_token != null && two_auth_token != null && !loggedin){
                console.log()
                await AuthenticationApi.verifyAuthToken({data: `auth=${auth_token}`}).then(resp => {
                    session = resp.data.ok;
                }).catch(error => {
                    console.log('authToken invalid or expired!'.yellow)
                })
            }
    
            if (session) {
                let newAxiosConfig = axios.create({
                    headers: {
                        'Accept': '*/*',
                        'User-Agent': `${config.userAgent}`,
                        'auth':  `${auth_token}`
                    }
                });
    
                // UsersApi = new vrchat.UsersApi(configuration, undefined, newAxiosConfig);
                // WorldApi = new vrchat.WorldsApi(configuration, undefined, newAxiosConfig);
                GroupApi = new vrchat.GroupsApi(configuration, undefined, newAxiosConfig);
    
                AuthenticationApi.getCurrentUser(axiosConfig).then(async resp => {
                    if(resp?.error ){
                        console.log(await logError(resp?.error, "getCurrentUser"));
                        reject('Something went wrong with the connection!.')
                    } else {
                        console.log('authToken Valid!'.green);
                        console.log(`VRchat logged in as: ${resp.data.displayName}`.cyan);
                        loggedin = true
                        resolve("logged in!")
                    }
                    
                }).catch(async error => {
                    console.warn(await logError(error, "getCurrentUser"), "getCurrentUser".underline.red)
                    reject('Something went wrong with the connection!. getCurrentUser')
                })

            } else {
                console.log('Attempting login'.blue)
                
                axios.defaults.withCredentials = true;
                axios.defaults.jar.setCookie(new tough.Cookie({ key: 'apiKey', value: 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26' }), 'https://api.vrchat.cloud', {}, function() {});
                
                
                AuthenticationApi.getCurrentUser().then(async resp => {
                
                    let currentUser = resp;
                
                    if (currentUser.displayName === undefined) {
                
                        console.log("Attempting 2FA".blue);
                        const token = totp(process.env.VRC_2FA_SECRET);
                
                        await AuthenticationApi.verify2FA({ code: token }).then( resp => {
                            console.log(`Verified: ${resp.data.verified}`.blue);
                        }).catch(async error => {
                            console.warn(await logError(error, "verify2FA"), "verify2FA".underline.red)
                            reject('Something went wrong with the connection. verify2FA')
                        }) 
                
                        let newCookies = JSON.stringify(axios.defaults.jar.toJSON());
                        fs.writeFileSync("./Data/cookies.json", newCookies, "utf-8");
    
                        let cookie = JSON.parse(newCookies)
    
                        let newAxiosConfig = axios.create({
                            headers: {
                                'Accept': '*/*',
                                'User-Agent': `${config.userAgent}`,
                                'auth':  `${cookie.cookies[1].value}`
                            }
                        });
            
                        // UsersApi = new vrchat.UsersApi(configuration, undefined, newAxiosConfig);
                        // WorldApi = new vrchat.WorldsApi(configuration, undefined, newAxiosConfig);
                        GroupApi = new vrchat.GroupsApi(configuration, undefined, newAxiosConfig);
                        
                        await AuthenticationApi.getCurrentUser().then(resp => {
                            currentUser = resp;
                        });
                    } else {
    
                        let cookies = JSON.stringify(axios.defaults.jar.toJSON());
                        fs.writeFileSync("./Data/cookies.json", cookies, "utf-8");
        
                        let cookie = JSON.parse(cookies)
    
                        let newAxiosConfig = axios.create({
                            headers: {
                                'Accept': '*/*',
                                'User-Agent': `${config.userAgent}`,
                                'auth':  `${cookie.cookies[1].value}`
                            }
                        });
    
                        // UsersApi = new vrchat.UsersApi(configuration, undefined, newAxiosConfig);
                        // WorldApi = new vrchat.WorldsApi(configuration, undefined, newAxiosConfig);
                        GroupApi = new vrchat.GroupsApi(configuration, undefined, newAxiosConfig);
                    }
                    if (currentUser?.error) {
                        reject('Something went wrong with the connection. currentUser TwoAuth')
                    } else {
                        loggedin = true
                        console.log(`VRchat logged in as: ${currentUser.data.displayName}`.cyan);
                        resolve("logged in!")
                    }

                }).catch( async error => {
                    console.warn(await logError(error,"getCurrentUser TwoAuth"), "getCurrentUser TwoAuth".underline.red)
                    reject("'Something went wrong with the connection. getCurrentUser TwoAuth")
                })
        
                lastTime = now
            }
        } catch(error) {
            console.warn(await logError(error, "connect"), "connect".underline.red)
            reject('Something went wrong with the connection. catch')
        }
    });
}

// connect(new Date)
// .catch( async error => ( console.warn(await logError(error), "Unhandled Connect".underline.red)));

let state =  'offline';

/**
 * 
 * @param {Discord Client} client 
 * @param {string} groupId 
 * @param {string} groupname 
 * @returns 
 */
async function groupMemberCount(client, groupId, groupname) {
    return new Promise((resolve, reject) => {
        GroupApi.getGroup(groupId).then( resp => {
            try {
                const path = './Data/shared/members.json';

                // Check if the file exists
                if (!fs.existsSync(path)) {
                    // Create an empty JSON file
                    fs.writeFileSync(path, JSON.stringify({}), 'utf-8');
                }  
                let membersjson = JSON.parse(fs.readFileSync(path, "utf-8"))
                membersjson[groupname] = resp.data.memberCount
                writeMemberCount(membersjson)
                resolve(resp.data.memberCount)
                
            } catch (error) {
                logError(error, "groupMemberCount"), "groupMemberCount".underline.red
                sendServerErrorDC(client, "groupMemberCountTry", error)
                reject(error)
            }  
        }).catch(async function (error) {
            console.warn(await logError(error, "groupMemberCount"), "groupMemberCount".underline.red)
            sendServerErrorDC(client, "groupMemberCount", error)
            reject(error)
        })
    })
}

async function writeMemberCount(membersjson) {
    fs.writeFile("./Data/shared/members.json", JSON.stringify(membersjson), function (error) {
        if (error) {
            console.log(error)
            reject(error)
        }
    })
}
 
async function getAllMemberCounts() {
    try {
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
    } catch (error) {
        sendServerErrorDC(client, "connect", error)
        await connect(new Date)
    }
} 

/**
 * 
 * @param {String} username VRChat username to be accepted in to the VRChat group. 
 * @param {Object} client Discord client object.
 * @returns String Completion status.
 */
async function joinGroup(username, client) {
return new Promise((resolve, reject) => {
    GroupApi.getGroupRequests(config.groupId).then(result => {
        
        let index = 0
        let requestExists = false

        result.data.forEach(async function (request) {
            index++
            console.log(request.user.displayName + username)
            if (request.user.displayName == username) {
                requestExists = true
                dbInsert(client.user.username, client.user.id, request.user.displayName, request.userId).then(async function(result) { 
                    if (result == "User already registered.") {
                        resolve(result)
                    } else if (result == "User is banned.") {
                        resolve(result)
                    } else {
                        await GroupApi.respondGroupJoinRequest(config.groupId, request.userId, '{"action" : "accept"}').then(result =>{
                            resolve(`${username} accpeted.`)
    
                        }).catch(error => {
                            dbFindAndDelete(client.user.id, request.userId).then(result => {
                                if (result == "Entry notfound") {
                                    console.warn(`${result} discordId:${client.user.id} vrchatId:${request.userId}`)
                                }
                                reject(error)
                            }).catch(error =>{
                                reject(error)
                            })
                        })
                    }
                }).catch(error => {
                    resolve(error)
                })
            } else {
                resolve("User not found. Did you request to join the VRChat group?")
            }




            // else if(index == result.data.length && requestExists == false) {
            //     index = 0
            //     requestExists = false
            //     let memberAmount = 100
                
            //     GroupApi.getGroup(config.groupId).then(async function (group) {

            //         if (group.data.memberCount < 100) {
            //             memberAmount = group.data.memberCount
            //         }
            //             await GroupApi.getGroupMembers(config.groupId, memberAmount).then( request => {

            //                 request.data.forEach(member => {
            //                     index++
            //                     if (member.user.displayName === username) {
            //                         requestExists = true
        
            //                         dbInsert(client.user.username, client.user.id, member.user.displayName, member.userId).then(async function(result) {
            //                             resolve(`${username} accpeted .`)
            //                         }).catch(error => {
            //                             resolve(error)
            //                         })
            //                     } else if (index == request.data.length && requestExists == false) {
            //                         resolve("User not found. Did you request to join the VRChat group?")
            //                     }
            //                 })
            //             }).catch(error => {
            //                 reject(error)
            //             })
            //         })
            //     }
        }) 
    }).catch(error => {
        reject(error)
    })
    
})
}


/**
 * 
 * @param {String} userId vrchatId or discorId .
 * @returns 
 */
async function banUser(userId) {
    let reg = new RegExp('^usr_')
    return new Promise((resolve, reject) => {
        if(reg.test(userId)) {
            dbFind("none", userId).then(user => {  
                if (user == "User notfound.") {
                    resolve(`{"result": "${user}"}`)
                } else {
                    if (user.banned == null) {
                        dbFindAndBan(user.discordId, user.vrchatId).then(result => {
                            if (result == "User banned.") {
                                GroupApi.banGroupMember(config.groupId, `{"userId" : "${user.vrchatId}"}`).then(function() {
                                    resolve(`{"result": "User banned", "vrcID": "${user.vrchatId}", "vrcN": "${user.vrchatName}", "dcID": "${user.discordId}", "dcN": "${user.discordName}"}`)
                                }).catch(async function (error) {
                                    console.warn(await logError(error), "banUser".underline.red)
                                    reject(error)
                                })
                            } else {
                                resolve(`"result": "${result}}"`)
                            }
                        }).catch(error => {
                            resolve(`"result": "${error}"`)
                        })
                    } else {
                        resolve("{'result': 'User already banned.')")
                    }      
                }    
            }).catch(error => {
                reject(error)
            })
        } else {
            dbFind(userId).then(user => {  
                if (user == "User notfound.") {
                    resolve(`{"result": "${user}"}`)
                } else {
                    if (user.banned == null) {
                        dbFindAndBan(user.discordId, user.vrchatId).then(result => {
                            if (result == "User banned.") {
                                GroupApi.banGroupMember(config.groupId, `{"userId" : "${user.vrchatId}"}`).then(function() {
                                    resolve(`{"result": "User banned", "vrcID": "${user.vrchatId}", "vrcN": "${user.vrchatName}", "dcID": "${user.discordId}", "dcN": "${user.discordName}"}`)
                                }).catch(async function (error) {
                                    console.warn(await logError(error), "banUser".underline.red)
                                    reject(error)
                                })
                            } else {
                                resolve(`"result": "${result}}"`)
                            }
                        }).catch(error => {
                            resolve(`"result": "${error}"`)
                        })
                    } else {
                        resolve("{'result': 'User already banned.')")
                    }
                }
            }).catch(error => {
                reject(error)
            })
        }
    })
}
/**
 * 
 * @param {String} userId vrchatId or discorId .
 * @returns 
 */
async function unbanUser(userId) {
    let reg = new RegExp('^usr_')
    return new Promise((resolve, reject) => {
        if(reg.test(userId)) {
            dbFind("none", userId).then(user => {  
                if (user == "User notfound.") {
                    resolve(`{"result": "${user}"}`)
                } else {
                    if (user.banned == "yes") {
                        dbFindAndUnban(user.discordId, user.vrchatId).then(result => {
                            if (result == "User unbanned.") {
                                GroupApi.unbanGroupMember(config.groupId, user.vrchatId).then(function() {
                                    resolve(`{"result": "User unbanned", "vrcID": "${user.vrchatId}", "vrcN": "${user.vrchatName}", "dcID": "${user.discordId}", "dcN": "${user.discordName}"}`)
                                }).catch(async function (error) {
                                    console.warn(await logError(error), "unbanUser".underline.red)
                                    reject(error)
                                })
                            } else {
                                resolve(`{"result": ${result}}`)
                            }
                        }).catch(error => {
                            resolve(`{"result": "${error}"}`)
                        })
                    } else {
                        resolve('{"result": "User not banned."}')
                    }      
                }    
            }).catch(error => {
                reject(error)
            })
        } else {
            dbFind(userId).then(user => {  
                if (user == "User notfound.") {
                    resolve(`{"result": "${user}"}`)
                } else {
                    if (user.banned == "yes") {
                        dbFindAndUnban(user.discordId, user.vrchatId).then(result => {
                            if (result == "User unbanned.") {
                                GroupApi.unbanGroupMember(config.groupId, user.vrchatId).then(function() {
                                    resolve(`{"result": "User unbanned", "vrcID": "${user.vrchatId}", "vrcN": "${user.vrchatName}", "dcID": "${user.discordId}", "dcN": "${user.discordName}"}`)
                                }).catch(async function (error) {
                                    console.warn(await logError(error), "unbanUser".underline.red)
                                    reject(error)
                                })
                            } else {
                                resolve(`{"result": "${result}"}`)
                            }
                        }).catch(error => {
                            resolve(`{"result": "${error}"}`)
                        })
                    } else {
                        resolve('{"result": "User not banned."}')
                    }
                }
            }).catch(error => {
                reject(error)
            })
        }
    })
}

/**
 * 
 * @returns VRChat api data abou the user.
 */
async function online() {
    let now = new Date
    if (now.getDay() != lastTime.getDay() || !loggedin) {
        console.log("Re initializing api.".blue)
        await connect(now)
    }
    return new Promise((resolve, reject) => {
        UsersApi.getUser(config.user).then(resp => {
            if (resp.data.bio == "") {
                resp.data.bio = "none"
            }
            if (resp.data.statusDescription == "") {
                resp.data.statusDescription = "none"
            }
        resolve(resp.data)
     }).catch(async function(error) {
        console.log("Re initializing api.".blue)
         await connect(now)
         console.warn(await logError(error), "online".underline.red)
        reject(error)
     })
    })
}

/**
 * 
 * @param {String} worldId VRChat api world id.
 * @returns VRChat api world information.
 */
async function getWorld(worldId) {
    if(worldId == "private"){return {"name": "Private"}}
    if(worldId == "offline"){return {"name": "Offline"}}

    return new Promise((resolve, reject) => {
        WorldApi.getWorld(worldId).then(resp => {
            resolve(resp.data)
        }).catch(async function (error) {
            console.warn(await logError(error), "getWorldId".underline.red)
            reject(error)
        })
    })   
}

/**
 * 
 * @param {String} worldId VRChat api world id.
 * @param {String} instanceId VRChat api instanse id.
 * @returns 
 */
async function getInstance(worldId, instanceId) {
    if(worldId == "private" || worldId == "offline"){return {"name": ""}}
    
    return new Promise((resolve, reject) => {
        WorldApi.getWorldInstance(worldId, instanceId).then(resp => {
            resolve(resp.data)
        }).catch(async function (error) {
            console.warn(await logError(error), "getInstance".underline.red)
            reject(error)
        })
    })
}

/**
 * 
 * @param {Client} client Discord client.
 */
async function onlineping(client) {
    await online().then(statenow => {
        if (state != statenow.state) {
            state = statenow.state;
            sendPing(state, client)
        }
    }).catch(async function (error) {

    });
}

/**
 * 
 * @param {String} state Online state of the My lIttle Nota account.
 * @param {Object} client Discord client.
 */
async function sendPing(state, client) {
    try {

        await client.channels.fetch('927271117155074158')
        await client.channels.fetch('923611865001631764')
        adminChannel = await client.channels.cache.get('927271117155074158')
        userChannel = await client.channels.cache.get('923611865001631764')

        now = new Date
        switch(state){
            case "online":
                if (lastPing < now.getTime()) {
                    // adminChannel.send(`<@&924403524027154513> nota is online`);
                    userChannel.send(`<@&924403524027154513> nota is online`);
    
                    lastPing = now.getTime() + config.pingTimout
                } else {
                    // adminChannel.send(`nota is online`);
                    userChannel.send(`nota is online`);
                }
                break
            case "active":
                // adminChannel.send(`nota is active`);
                userChannel.send(`nota is active`);
                break
            default:
                // adminChannel.send(`nota is offline`);
                userChannel.send(`nota is offline`);
                break
        }
    } catch (error) {
        console.warn(await logError(error), "SendPing".underline.red)
    }
}

module.exports = { connect, online, onlineping, getWorld, getInstance, joinGroup, banUser, unbanUser, logout, groupMemberCount }