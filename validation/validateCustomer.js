const {body, validationResult} = require("express-validator");

const customerValidationRules = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({min: 2, max: 50})
    .withMessage("First name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .trim(),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({min: 2, max: 50})
    .withMessage("Last name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "Last name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .normalizeEmail()
    .isLength({max: 100})
    .withMessage("Email cannot be longer than 100 characters"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage(
      "Phone number must be a valid format (10-16 digits, optional + prefix)"
    )
    .isLength({min: 10, max: 17})
    .withMessage("Phone number must be between 10 and 17 characters"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .customSanitizer((value) => {
      // Capitalize first letter, lowercase the rest
      if (typeof value === "string" && value.length > 0) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }
      return value;
    })
    .isIn(["Male", "Female", "Other", "Prefer not to say"])
    .withMessage(
      "Gender must be one of: Male, Female, Other, Prefer not to say"
    ),
];

const validateCustomerData = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  console.log(
    "Raw validation errors:",
    JSON.stringify(errors.array(), null, 2)
  );

  const extractedErrors = errors.array().map((err) => {
    console.log("Processing error:", err);
    return {
      field: err.path || err.param || err.location || "unknown",
      message: err.msg,
    };
  });

  console.log("Extracted errors:", extractedErrors);

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  customerValidationRules,
  validateCustomerData,
};
