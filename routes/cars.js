const express = require("express");
const router = express.Router();
const carsController = require("../controllers/cars");
const { body, param } = require("express-validator"); // week 3
const validate = require("../middleware/validate"); // week 3

// GET all
router.get("/", carsController.getAllCars);

// GET single contact by ID
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid ID format"),
  validate,
  carsController.getSingleCar
);

// CREATE
router.post(
  "/",
  [
    body("make").notEmpty().withMessage("Car make is required"),
    body("model").notEmpty().withMessage("Car model is required"),
    body("year").notEmpty().withMessage("Car manufacturing year is required"),
    body("color").notEmpty().withMessage("Car color is required"),
    body("price").notEmpty().withMessage("Car price is required"),
    body("mileage").isInt({ min: 0 }).withMessage("Mileage must be a non-negative number"),
    body("vin").notEmpty().withMessage("Car Vehicle Identification Number is required")

  ],
  validate,
  carsController.createCarInfo
);

// UPDATE
router.put(
  "/:id",
  [
    body("make").notEmpty().withMessage("Car make is required"),
    body("model").notEmpty().withMessage("Car model is required"),
    body("year").notEmpty().withMessage("Car manufacturing year is required"),
    body("color").notEmpty().withMessage("Car color is required"),
    body("price").notEmpty().withMessage("Car price is required"),
    body("mileage").isInt({ min: 0 }).withMessage("Mileage must be a non-negative number"),
    body("vin").notEmpty().withMessage("Car Vehicle Identification Number is required")
  ],
  validate,
  carsController.updateCarInfo
);

// DELETE
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Invalid ID format"),
  validate,
  carsController.deleteCarInfo
);

module.exports = router;
