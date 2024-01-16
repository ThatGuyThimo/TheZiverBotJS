import {
  dbPostCar,
  dbGetCars,
  dbGetBrands,
  dbGetOneCar,
  dbDeleteCar,
  dbPutCar
} from "../components/dbFunctions.js";
import { Car, Brand } from "../components/database.js";
import { logError } from "./errorLogging.js";

async function addCar(req, res) {
  try {
    const car = new Car(req.body);

    const validation = car.validateSync();

    if (validation) {
      res
        .status(400)
        .json({ error: "Parameters must be filled", info: validation.errors });
      return;
    }

    const response = dbPostCar(car);

    res.status(201).json(response);
  } catch (e) {
    console.log("addCar ", await logError("addCar", e));
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function editCar(req, res) {
  try {
    req.body._id = req.params._id
    const car = new Car(req.body);

    const validation = car.validateSync();

    if (validation) {
      res
        .status(400)
        .json({ error: "Parameters must be filled", info: validation.errors });
      return;
    }

    const delResponse = await dbDeleteCar(req.params);

    if (delResponse.acknowledged && delResponse.deletedCount == 1) {
        const saveResponse = dbPutCar(car);
        res.status(201).json(saveResponse);
    } else {
        res.status(404).json({error: "entry not found"})
    }
  } catch (e) {
    console.log("editCar ", await logError("editCar", e));
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteCar(req, res) {
    if (await checkParams(req, res)) {
        try {

            const result = await dbDeleteCar(req.params)
    
            res.status(204).send(result)
        } catch(e) {
            console.log("deleteCar ", await logError("deleteCar", e));
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
} 

async function getAllCars(req, res) {
  try {

    let start = isNaN(parseInt(req.query.start)) ? undefined : parseInt(req.query.start);
    let limit = isNaN(parseInt(req.query.limit)) ? undefined : parseInt(req.query.limit);
    const total = await Car.countDocuments()
    const page = currentPage(start, limit)
    const cars = await dbGetCars(start, limit, page);


    let carArray = [];

    cars.forEach((car) => {
      carArray.push(links(car, false));
    });

    const linkToSelf = {self: {
        href: 'https://thimodehaan.com:8080/cars'
    }}

    const data = { items: carArray, _links: linkToSelf, pagination: pagination(total, start, limit) };

    res.json(data);
  } catch (e) {
    console.log("getAllCars ", await logError("getAllCars", e));
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getOneCar(req, res) {
  if (await checkParams(req, res)) {
    try {
      let car = await dbGetOneCar(req.params);

      if(car === null) {
        res.status(404).send("Not found!")
        return
      }
      const data = links(car, true);

      res.json(data);
    } catch (e) {
      console.log("getOneCar ", await logError("getOneCar", e));
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

async function getAllBrands(req, res) {
  try {
    const data = await dbGetBrands();
    res.json(data);
  } catch (e) {
    console.log("getAllBrands ", await logError("getAllBrands", e));
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function checkParams(req, res) {
  if (Object.keys(req.query) == 0 && Object.keys(req.params) == 0) {
    res.status(400).json({ error: "No value given!" });
    return false;
  } else {
    return true;
  }
}

function links(car, on) {
    if(on) {
        car = car.toObject()
    } 
  return {
    ...car,
    _links: {
      self: {
        href: `https://thimodehaan.com:8080/cars/details/${car._id}`,
      },
      collection: {
        href: `https://thimodehaan.com:8080/cars`,
      },
    },
  };
}

function pagination(total, start, limit) {
    const actual = createPagination(total, start, limit)
  return {
    currentPage: actual.currentPage,
    currentItems: actual.currentItems,
    totalPages: actual.numberOfPages,
    totalItems: total,
    _links: {
        first: {
          href: `https://thimodehaan.com:8080/cars/${actual.firstPageQueryString}`,
        },
        last: {
          href: `https://thimodehaan.com:8080/cars/${actual.lastPageQueryString}`,
        },
        previous: {
          href: `https://thimodehaan.com:8080/cars/${actual.previousPageQueryString}`,
        },
        next: {
          href: `https://thimodehaan.com:8080/cars/${actual.nextPageQueryString}`,
        },
      },
  };
}

function currentItems(total, start, limit) {
    if (!limit || !start) {
        return total;
    }
    return Math.min(total - start, limit);
}

function numberOfPages(total, start, limit) {
    if (!limit || !start) {
        return 1;
    }
    return Math.ceil(total / limit);
}

function currentPage(start, limit) {
    if (!limit || !start) {
        return 1;
    }
    return Math.floor(start / limit) + 1;
}

function firstPageItem() {
    return 1;
}

function lastPageItem(total, start, limit) {
    if (!limit || !start) {
        return total;
    }
    if (limit == 1) {
        return total;
    }
    let lastPageNumber = Math.ceil(total / limit);
    let lastPageItem = lastPageNumber * limit;
    return Math.max(0, lastPageItem - limit);
}

function previousPageItem(start, limit) {
    if (!limit || !start) {
        return null;
    }
    return Math.max(start - limit, firstPageItem());
}

function nextPageItem(total, start, limit) {
    if (!limit || !start) {
        return null;
    }
    return Math.min(start + limit, lastPageItem(total, start, limit));
}

function getFirstQueryString(total, start, limit) {
    let queryString = "";
    if (limit && start) {
        queryString = `?start=${firstPageItem(total, start, limit)}&limit=${limit}`;
    }
    return queryString;
}

function getLastQueryString(total, start, limit) {
    let queryString = "";
    if (limit && start) {
        queryString = `?start=${lastPageItem(total, start, limit)}&limit=${limit}`;
    }
    return queryString;
}

function getPreviousQueryString(start, limit) {
    let queryString = "";
    if (limit && start) {
        let previousStart = previousPageItem(start, limit);
        if (previousStart !== null) {
            queryString = `?start=${previousStart}&limit=${limit}`;
        }
    }
    return queryString;
}

function getNextQueryString(total, start, limit) {
    let queryString = "";
    if (limit && start) {
        let nextStart = nextPageItem(total, start, limit);
        if (nextStart !== null) {
            queryString = `?start=${nextStart}&limit=${limit}`;
        }
    }
    return queryString;
}

function createPagination(total, start, limit) {
    let pagination = {
        currentPage: currentPage(start, limit),
        numberOfPages: numberOfPages(total, start, limit),
        currentItems: currentItems(total, start, limit),
        firstPageQueryString: getFirstQueryString(total, start, limit),
        lastPageQueryString: getLastQueryString(total, start, limit),
        previousPageQueryString: getPreviousQueryString(start, limit),
        nextPageQueryString: getNextQueryString(total, start, limit),
    };
    return pagination;
}

export { addCar, getAllCars, getAllBrands, getOneCar, deleteCar, editCar };
