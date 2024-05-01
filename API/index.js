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

const options = {
  key: fs.readFileSync("./data/certs/api.theziver.com.privkey.pem"),
  cert: fs.readFileSync("./data/certs/api.theziver.com.pem"),
  passphrase: process.env.PHASSPHRASE
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")

    next()
})

app.use('/theziver', new Route('Zivergroup').router)
app.use('/onlyrusk', new Route('Onlyruskgroup').router)
app.use('/cheese', new Route('Cheesegroup').router)
app.use('/avifair', new Route('Avifairgroup').router)
app.use('/family', new Route('Familygroup').router)
app.use('/portal', new Route('Portalgroup').router)
app.use('/gamble', new Route('Gamblegroup').router)
app.use('/all', allRoute)


app.listen(httpPort, () => {
  console.log(`Http listening on port ${httpPort}`)
})

https.createServer(options, app).listen(httpsPort, () => {
  console.log(`Https listening on port ${httpsPort}`)
})