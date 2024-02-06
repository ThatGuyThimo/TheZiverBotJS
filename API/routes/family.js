import express from 'express';
import fs from 'fs'
const router = express.Router()

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

router.get('/', (req, res) => {
    let data = JSON.parse(fs.readFileSync("../Data/members.json"))
    res.send(`${data.Familygroup}`).status(200)
})

export { router }