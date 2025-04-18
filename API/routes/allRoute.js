import express from 'express';
import fs from 'fs'
import 'dotenv/config'
const router = express.Router()

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

router.get('/', (req, res) => {
    let data = JSON.parse(fs.readFileSync(process.env.MEMBERFILE))
    if (!data) {
        return res.status(404).send('not found');
    }
    res.send(`${Object.values(data).join(',')}`).status(200);
})

export { router }