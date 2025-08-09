const {body, validationResult} = require("express-validator");

const ticketValidationRules = [
  body("customerId")
    .notEmpty()
    .withMessage("Customer ID is required")
    .isMongoId()
    .withMessage("Customer ID must be a valid MongoDB ObjectId"),

  body("eventId")
    .notEmpty()
    .withMessage("Event ID is required")
    .isMongoId()
    .withMessage("Event ID must be a valid MongoDB ObjectId"),

  body("ticketStatus")
    .notEmpty()
    .withMessage("Ticket status is required")
    .customSanitizer((value) => {
      // Capitalize first letter, lowercase the rest
      if (typeof value === "string" && value.length > 0) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }
      return value;
    })
    .isIn(["Active", "Used", "Cancelled", "Refunded", "Pending"])
    .withMessage(
      "Ticket status must be one of: Active, Used, Cancelled, Refunded, Pending"
    ),

  body("amountPaid")
    .notEmpty()
    .withMessage("Amount paid is required")
    .isFloat({min: 0})
    .withMessage("Amount paid must be a non-negative number")
    .custom((value) => {
      // Check for reasonable decimal places (max 2)
      const decimalPlaces = (value.toString().split(".")[1] || []).length;
      if (decimalPlaces > 2) {
        throw new Error("Amount paid cannot have more than 2 decimal places");
      }
      return true;
    }),

  body("purchaseDate")
    .notEmpty()
    .withMessage("Purchase date is required")
    .isISO8601()
    .withMessage(
      "Purchase date must be a valid date (YYYY-MM-DD or ISO format)"
    )
    .custom((value) => {
      const purchaseDate = new Date(value);
      const now = new Date();
      if (purchaseDate > now) {
        throw new Error("Purchase date cannot be in the future");
      }
      return true;
    }),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .customSanitizer((value) => {
      // Capitalize first letter, lowercase the rest
      if (typeof value === "string" && value.length > 0) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }
      return value;
    })
    .isIn([
      "Credit card",
      "Debit card",
      "Paypal",
      "Bank transfer",
      "Cash",
      "Gift card",
    ])
    .withMessage(
      "Payment method must be one of: Credit card, Debit card, Paypal, Bank transfer, Cash, Gift card"
    ),

  body("seat")
    .optional()
    .isLength({min: 1, max: 20})
    .withMessage("Seat must be between 1 and 20 characters")
    .matches(/^[A-Z0-9\-]+$/i)
    .withMessage("Seat can only contain letters, numbers, and hyphens")
    .customSanitizer((value) => {
      // Convert to uppercase for consistency
      if (typeof value === "string") {
        return value.toUpperCase();
      }
      return value;
    }),
];

const validateTicketData = (req, res, next) => {
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
  ticketValidationRules,
  validateTicketData,
};
