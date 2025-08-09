const { body, validationResult } = require("express-validator");

// Define your validation rules for admin fields (adjust as needed)
const adminValidationRules = () => {
  return [
    body("username")
      .exists().withMessage("Username is required")
      .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("email")
      .exists().withMessage("Email is required")
      .isEmail().withMessage("Must be a valid email"),
    body("role")
      .optional()
      .isIn(["superadmin", "admin", "moderator"])
      .withMessage("Role must be one of superadmin, admin, moderator"),
  ];
};

// Middleware to handle validation results
const validateAdmin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  adminValidationRules,
  validateAdmin,
};
