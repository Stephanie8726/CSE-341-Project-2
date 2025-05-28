const mongodb = require('../data/database');
const createError = require('http-errors');
const ObjectId = require('mongodb').ObjectId;

const isValidObjectId = (id) => {
  return ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;
};

const getAllCustomerInfo = async (req, res, next) => {
  try {
    const result = await mongodb.getDatabase().db().collection('customers').find();
    const customers = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(customers);
  } catch (err) {
    next(createError(500, 'Failed to retrieve customers.'));
  }
};

const getSingleCustomerInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return next(createError(400, 'Invalid ID format.'));
    }

    const customerId = new ObjectId(id);
    const result = await mongodb.getDatabase().db().collection('customers').find({ _id: customerId });
    const customers = await result.toArray();

    if (!customers.length) {
      return next(createError(404, 'Customer not found.'));
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(customers[0]);
  } catch (err) {
    next(createError(500, 'Failed to retrieve the customer info.'));
  }
};

const createCustomerInfo = async (req, res, next) => {
  try {
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.price,
      dateOfBirth: req.body.dateOfBirth,
      preferredContactMethod: req.body.preferredContactMethod
    };

    const response = await mongodb.getDatabase().db().collection('customers').insertOne(customer);
    if (response.acknowledged) {
      res.status(201).send();
    } else {
      return next(createError(500, 'Customer details update failed.'));
    }
  } catch (err) {
    next(createError(500, 'Failed to create/add customer details.'));
  }
};

const updateCustomerInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return next(createError(400, 'Invalid ID format.'));
    }

    const customerId = new ObjectId(id);
  const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.price,
      dateOfBirth: req.body.dateOfBirth,
      preferredContactMethod: req.body.preferredContactMethod
    };

    const response = await mongodb.getDatabase().db().collection('customers').replaceOne({ _id: customerId }, customer);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      return next(createError(404, 'Customer information is not found or update failed.'));
    }
  } catch (err) {
    next(createError(500, 'Failed to update the customer info.'));
  }
};

const deleteCustomerInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return next(createError(400, 'Invalid ID format.'));
    }

    const customerId = new ObjectId(id);
    const response = await mongodb.getDatabase().db().collection('customers').deleteOne({ _id: customerId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      return next(createError(404, 'Customer detail not found or delete failed.'));
    }
  } catch (err) {
    next(createError(500, 'Failed to delete customer detail.'));
  }
};

module.exports = {
  getAllCustomerInfo,
  getSingleCustomerInfo,
  createCustomerInfo,
  updateCustomerInfo,
  deleteCustomerInfo
};
