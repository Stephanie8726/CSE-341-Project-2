const express = require("express");
const router = express.Router();
const carsController = require("../controllers/cars");
const { body, param } = require("express-validator");
const validate = require("../middleware/validate");

// GET all cars
router.get("/", carsController.getAllCars);

// GET car by ID
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid car ID format"),
  validate,
  carsController.getSingleCar
);

// CREATE car
router.post(
  "/",
  [
    body("make")
      .trim()
      .notEmpty()
      .withMessage("Car make is required")
      .isLength({ max: 50 })
      .withMessage("Make must be under 50 characters"),

    body("model")
      .trim()
      .notEmpty()
      .withMessage("Car model is required")
      .isLength({ max: 50 })
      .withMessage("Model must be under 50 characters"),

    body("year")
      .notEmpty()
      .withMessage("Car manufacturing year is required")
      .isNumeric()
      .withMessage("Year must be a number (e.g., 2022)")
      .toInt()
      .isInt({ min: 1886, max: new Date().getFullYear() + 1 })
      .withMessage(
        `Year must be between 1886 and ${new Date().getFullYear() + 1}`
      ),

    body("color")
      .trim()
      .notEmpty()
      .withMessage("Car color is required")
      .isAlpha()
      .withMessage("Color must contain only letters"),

    body("price")
      .notEmpty()
      .withMessage("Car price is required")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),

    body("mileage")
      .notEmpty()
      .withMessage("Mileage is required")
      .isInt({ min: 0 })
      .withMessage("Mileage must be a non-negative integer"),

    body("vin")
      .trim()
      .notEmpty()
      .withMessage("VIN is required")
  ],
  validate,
  carsController.createCarInfo
);

// UPDATE car
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid car ID format"),

    body("make")
      .trim()
      .notEmpty()
      .withMessage("Car make is required")
      .isLength({ max: 50 })
      .withMessage("Make must be under 50 characters"),

    body("model")
      .trim()
      .notEmpty()
      .withMessage("Car model is required")
      .isLength({ max: 50 })
      .withMessage("Model must be under 50 characters"),

    body("year")
      .notEmpty()
      .withMessage("Car manufacturing year is required")
      .isNumeric()
      .withMessage("Year must be a number (e.g., 2022)")
      .toInt()
      .isInt({ min: 1886, max: new Date().getFullYear() + 1 })
      .withMessage(
        `Year must be between 1886 and ${new Date().getFullYear() + 1}`
      ),

    body("color")
      .trim()
      .notEmpty()
      .withMessage("Car color is required")
      .isAlpha()
      .withMessage("Color must contain only letters"),

    body("price")
      .notEmpty()
      .withMessage("Car price is required")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),

    body("mileage")
      .notEmpty()
      .withMessage("Mileage is required")
      .isInt({ min: 0 })
      .withMessage("Mileage must be a non-negative integer"),

    body("vin")
      .trim()
      .notEmpty()
      .withMessage("VIN is required")
  ],
  validate,
  carsController.updateCarInfo
);

// DELETE car
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Invalid car ID format"),
  validate,
  carsController.deleteCarInfo
);

module.exports = router;
