const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers");
const { body, param } = require("express-validator");
const validate = require("../middleware/validate");

// GET all customer details
router.get("/", customersController.getAllCustomerInfo);

// GET single customer info by ID
router.get(
  "/:id",
  param("id")
    .isMongoId()
    .withMessage("Invalid customer ID format"),
  validate,
  customersController.getSingleCustomerInfo
);

// CREATE customer info
router.post(
  "/",
  [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("Customer's firstName is required")
      .isLength({ max: 50 })
      .withMessage("Firstname must be under 50 characters"),

    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Customer's lastname is required")
      .isLength({ max: 50 })
      .withMessage("Lastname must be under 50 characters"),

    body("phone")
      .notEmpty()
      .withMessage("Customer's phone number is required")
      .isNumeric()
      .withMessage("Phone number must be numeric")
      .isLength({ min: 10, max: 15 })
      .withMessage("Phone number must be between 10 and 15 digits"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Customer's email is required")
      .isEmail()
      .withMessage("Invalid email format"),

    body("address")
      .notEmpty()
      .withMessage("Customer's address is required")
      .isLength({ max: 100 })
      .withMessage("Address must be under 100 characters"),

    // Optional
    body("dateOfBirth")
      .optional()
      .isISO8601()
      .withMessage("Date of birth must be a valid date (YYYY-MM-DD)"),

    body("preferredContactMethod")
      .optional()
      .trim()
      .isIn(["email", "phone", "sms"])
      .withMessage("Preferred contact method must be one of: email, phone, sms")
  ],
  validate,
  customersController.createCustomerInfo
);
// UPDATE customer info
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid customer ID format"),

        body("firstName")
      .trim()
      .notEmpty()
      .withMessage("Customer's firstName is required")
      .isLength({ max: 50 })
      .withMessage("Firstname must be under 50 characters"),

    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Customer's lastname is required")
      .isLength({ max: 50 })
      .withMessage("Lastname must be under 50 characters"),

    body("phone")
      .notEmpty()
      .withMessage("Customer's phone number is required")
      .isNumeric()
      .withMessage("Phone number must be numeric")
      .isLength({ min: 10, max: 15 })
      .withMessage("Phone number must be between 10 and 15 digits"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Customer's email is required")
      .isEmail()
      .withMessage("Invalid email format"),

    body("address")
      .notEmpty()
      .withMessage("Customer's address is required")
      .isLength({ max: 100 })
      .withMessage("Address must be under 100 characters"),

    // Optional fields
    body("dateOfBirth")
      .optional()
      .isISO8601()
      .withMessage("Date of birth must be a valid date (YYYY-MM-DD)"),

    body("preferredContactMethod")
      .optional()
      .trim()
      .isIn(["email", "phone", "sms"])
      .withMessage("Preferred contact method must be one of: email, phone, sms")
  ],
  validate,
  customersController.updateCustomerInfo
);

// DELETE customer info
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Invalid customer ID format"),
  validate,
  customersController.deleteCustomerInfo
);

module.exports = router;
