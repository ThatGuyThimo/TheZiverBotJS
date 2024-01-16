import express from 'express';
import { addCar, getAllCars, getAllBrands, getOneCar, deleteCar, editCar } from '../functions/cars.js';
const router = express.Router()

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

router.get('/', (req, res) => {
  getAllCars(req, res)
})
router.get('/getAllCars', (req, res) => {
  getAllCars(req, res)
})

router.get('/getOneCar', (req, res) => {
  getOneCar(req, res)
})
router.get('/:_id', (req, res) => {
  getOneCar(req, res)
})
router.get('/details/:_id', (req, res) => {
  getOneCar(req, res)
})
router.put('/details/:_id', (req, res) => {
  editCar(req, res)
})
router.delete('/details/:_id', (req, res) => {
  deleteCar(req, res)
})

router.get('/getAllBrands', (req, res) => {
  getAllBrands(req, res)
})

router.post('/addCar', (req, res) => {
  addCar(req, res)
})
router.post('/', (req, res) => {
  addCar(req, res)
})

router.delete('/deleteCar/:_id', (req, res) => {
  deleteCar(req, res)
})
router.delete('/:_id', (req, res) => {
  deleteCar(req, res)
})

router.options('/',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Allow', 'GET, POST, OPTIONS');
  res.status(200)
  res.send('GET, POST, OPTIONS')
})
router.options('/details',  (req, res) => {
  res.header("Allow", "GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200).send();
})
router.options('/details/:_id',  (req, res) => {
  res.header("Allow", "GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200).send();
})

router.options('/getAllCars',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Allow', 'GET, OPTIONS');
  res.status(200)
  res.send('GET, OPTIONS')
})
router.options('/getOneCar',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Allow', 'GET, OPTIONS');
  res.status(200)
  res.send('GET, OPTIONS')
})
router.options('/deleteCar',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.header('Allow', 'DELETE, OPTIONS');
  res.status(200)
  res.send('DELETE, OPTIONS')
})
router.options('/getAllBrands',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Allow', 'GET, OPTIONS');
  res.status(200)
  res.send('GET, OPTIONS')
})
router.options('/addCar',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Allow', 'POST, OPTIONS');
  res.status(200)
  res.send('POST, OPTIONS')
})

export { router }