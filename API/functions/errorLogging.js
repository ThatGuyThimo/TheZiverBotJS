import * as fs from 'fs';
import 'dotenv/config';
const dir = process.env.LOGGINGDIR
import path from "path"


/**
 * Creates error loging dir.
 */
async function _createloggingFolder() {
    return new Promise((resolve, reject) =>{
        fs.mkdirSync(path.join(dir, "errorLogs"), { recursive: true }, function (error) {
            if (error) {
                console.log(error)
                reject(error)
            }
        })
        resolve(true)
    })
}

/**
 * 
 * @param {error} value error
 * @returns string (file name)
 */
async function logError(name, value) {
    return new Promise(async function (resolve, reject) {        
        let date = new Date
        let fileName = `${name} ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}-h${date.getHours()}-m${date.getMinutes()}-s${date.getSeconds()}`
        if (await _createloggingFolder()) {
            let fdNumber
            fs.open(`${dir}errorLogs/${fileName}.txt`, 'w', function (error, fd) {
                if (error) {
                    console.log(error)
                    reject(false)
                }
                fdNumber = fd
            })
            fs.writeFile(`${dir}errorLogs/${fileName}.txt`, `${value}`, function (error) {
                if (error) {
                    console.log(error)
                    reject(false)
                }
                fs.close(fdNumber)
                resolve(fileName)
            })
        }
    })
}

export {logError}