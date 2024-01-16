import express from 'express';
const router = express.Router()

router.use((req, res, next) => {
  if(req.headers?.host === "coolcars.nl" && req.headers?.accept === "application/json") {
    next()
  } else {
    res.statusCode = 400
    res.send("Bad Headers!")
  }
})

router.get('/', (req, res) => {
  res.send('users home page!')
})

router.get('/login', (req, res) => {
//   login(req, res)
})

router.get('/register', (req, res) => {
//   register(req, res)
})

export { router }