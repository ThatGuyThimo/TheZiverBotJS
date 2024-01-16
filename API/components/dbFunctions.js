import { Car, Brand } from './database.js'

async function dbPostCar(params) {
    const query = params.save()
    return query
}

async function dbPutCar(params) {
    const query = params.save()
    return query
}

async function dbDeleteCar(params) {
    const query = Car.deleteOne(params)
    return query
}

async function dbGetCars(start, limit, page) {
    
    const query = Car.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

    return query
}

async function dbGetOneCar(params) {
    const query = Car.findOne(params)
    return query
}

async function dbGetBrands(params) {
    const query = Brand.find(params)
    return query
}

export {dbPostCar, dbGetCars, dbGetBrands, dbGetOneCar, dbDeleteCar, dbPutCar}
