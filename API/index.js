import express from 'express'
import https from 'https'
import fs from 'fs'
import bodyParser from 'body-parser'
import 'dotenv/config'


import { router as allRoute } from './routes/allRoute.js'
import { Route } from './classes/Route.js'

const testRoute = new Route('Zivergroup')

const app = express()
const httpPort = process.env.HTTPPORT
const httpsPort = process.env.HTTPSPORT
const keypath = process.env.KEYFILE
const certpath = process.env.CERTFILE

let options

if (fs.existsSync(keypath) || fs.existsSync(certpath)) {
  options = {
    key: fs.readFileSync(keypath),
    cert: fs.readFileSync(certpath),
    passphrase: process.env.PHASSPHRASE
  }
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")

    next()
})

let members = JSON.parse(fs.readFileSync(process.env.MEMBERFILE));

for (const [groupName, memberCount] of Object.entries(members)) {
    app.use(`/${groupName}`, new Route(groupName).router)
    console.log(`Route for ${groupName} (${memberCount}) has been set up.`)
}
app.use('/all', allRoute)


app.listen(httpPort, () => {
  console.log(`Http listening on port ${httpPort}`)
})

if (options !== undefined) {
  https.createServer(options, app).listen(httpsPort, () => {
    console.log(`Https listening on port ${httpsPort}`)
  })
}