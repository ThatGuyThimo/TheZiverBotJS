import express from 'express';
import fs from 'fs';

class Route {
    constructor(key) {
        this.key = key;
        this.router = express.Router();
        this.router.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            next();
        });
        this.router.get('/', this.getData.bind(this));
    }

    getData(req, res) {
        let data = JSON.parse(fs.readFileSync("../Data/members.json"));
        res.send(`${data[this.key]}`).status(200);
    }
}

export { Route };
