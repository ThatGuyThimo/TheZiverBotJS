import express from 'express';
import https from 'https';
import fs from 'fs'
import bodyParser from 'body-parser';
import 'dotenv/config';
// import {router as carRoutes} from './routes/carsRoute.js';
// import {router as userRouter} from './routes/usersRoute.js'

const app = express()
const httpPort = process.env.HTTPPORT
const httpsPort = process.env.HTTPSPORT

const options = {
  key: fs.readFileSync("./data/certs/thimodehaankey.pem"),
  cert: fs.readFileSync("./data/certs/thimodehaan.pem"),
  passphrase: process.env.PHASSPHRASE
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if( req.headers?.accept === "application/json") {
    next()
  } else {
    res.status(400).send("Bad Headers!")
  }
})

app.get('/', (req, res) => {
  let data = JSON.parse(fs.readFileSync("../Data/members.json"))
  res.send(`${data.Zivergroup}`).status(200)
})

// app.use('/cars', carRoutes)
// app.use('/users', userRouter)

app.listen(httpPort, () => {
  console.log(`Http listening on port ${httpPort}`)
})

https.createServer(options, app).listen(httpsPort, () => {
  console.log(`Https listening on port ${httpsPort}`)
});