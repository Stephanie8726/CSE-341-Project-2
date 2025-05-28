const mongodb = require('../data/database');
const createError = require('http-errors');
const ObjectId = require('mongodb').ObjectId;

const isValidObjectId = (id) => {
  return ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;
};

const getAllCars = async (req, res, next) => {
  try {
    const result = await mongodb.getDatabase().db().collection('cars').find();
    const cars = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(cars);
  } catch (err) {
    next(createError(500, 'Failed to retrieve cars.'));
  }
};

const getSingleCar = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return next(createError(400, 'Invalid ID format.'));
    }

    const carId = new ObjectId(id);
    const result = await mongodb.getDatabase().db().collection('cars').find({ _id: carId });
    const cars = await result.toArray();

    if (!cars.length) {
      return next(createError(404, 'Car not found.'));
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(cars[0]);
  } catch (err) {
    next(createError(500, 'Failed to retrieve the cars.'));
  }
};

const createCarInfo = async (req, res, next) => {
  try {
    const car = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      price: req.body.price,
      mileage: req.body.mileage,
      vin: req.body.vin
    };

    const response = await mongodb.getDatabase().db().collection('cars').insertOne(car);
    if (response.acknowledged) {
      res.status(201).send();
    } else {
      return next(createError(500, 'Car collection creation/addition failed.'));
    }
  } catch (err) {
    next(createError(500, 'Failed to create/add car collections.'));
  }
};

const updateCarInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return next(createError(400, 'Invalid ID format.'));
    }

    const carId = new ObjectId(id);
  const car = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      price: req.body.price,
      mileage: req.body.mileage,
      vin: req.body.vin
    };

    const response = await mongodb.getDatabase().db().collection('cars').replaceOne({ _id: carId }, car);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      return next(createError(404, 'Car collection not found or update failed.'));
    }
  } catch (err) {
    next(createError(500, 'Failed to update car collection info.'));
  }
};

const deleteCarInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return next(createError(400, 'Invalid ID format.'));
    }

    const carId = new ObjectId(id);
    const response = await mongodb.getDatabase().db().collection('cars').deleteOne({ _id: carId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      return next(createError(404, 'Car collection not found or delete failed.'));
    }
  } catch (err) {
    next(createError(500, 'Failed to delete car collection.'));
  }
};

module.exports = {
  getAllCars,
  getSingleCar,
  createCarInfo,
  updateCarInfo,
  deleteCarInfo
};
