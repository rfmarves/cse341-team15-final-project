const {body, validationResult} = require("express-validator");

const eventValidationRules = [
  body("eventName")
    .notEmpty()
    .withMessage("Event name is required")
    .isLength({min: 2, max: 100})
    .withMessage("Event name must be between 2 and 100 characters")
    .trim(),

  body("venueId")
    .notEmpty()
    .withMessage("Venue ID is required")
    .isMongoId()
    .withMessage("Venue ID must be a valid MongoDB ObjectId"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date (YYYY-MM-DD)")
    .custom((value, {req}) => {
      const startDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (startDate < today) {
        throw new Error("Start date cannot be in the past");
      }
      return true;
    }),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date (YYYY-MM-DD)")
    .custom((value, {req}) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);
      if (endDate < startDate) {
        throw new Error("End date cannot be before start date");
      }
      return true;
    }),

  body("startTime")
    .notEmpty()
    .withMessage("Start time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Start time must be in HH:MM format (24-hour)"),

  body("endTime")
    .notEmpty()
    .withMessage("End time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("End time must be in HH:MM format (24-hour)")
    .custom((value, {req}) => {
      const startTime = req.body.startTime;
      const endTime = value;

      // Convert times to minutes for comparison
      const startMinutes =
        parseInt(startTime.split(":")[0]) * 60 +
        parseInt(startTime.split(":")[1]);
      const endMinutes =
        parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);

      // Check if it's the same day
      if (
        req.body.startDate === req.body.endDate &&
        endMinutes <= startMinutes
      ) {
        throw new Error(
          "End time must be after start time for same-day events"
        );
      }
      return true;
    }),

  body("capacity")
    .notEmpty()
    .withMessage("Capacity is required")
    .isInt({min: 1, max: 100000})
    .withMessage("Capacity must be a positive integer between 1 and 100,000"),

  body("eventType")
    .notEmpty()
    .withMessage("Event type is required")
    .customSanitizer((value) => {
      // Capitalize first letter, lowercase the rest
      if (typeof value === "string" && value.length > 0) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }
      return value;
    })
    .isIn([
      "Conference",
      "Concert",
      "Workshop",
      "Seminar",
      "Festival",
      "Sports",
      "Theater",
      "Exhibition",
      "Meeting",
      "Opera",
      "Other",
    ])
    .withMessage(
      "Event type must be one of: Conference, Concert, Workshop, Seminar, Festival, Sports, Theater, Exhibition, Meeting, Opera, Other"
    ),

  body("eventPrice")
    .notEmpty()
    .withMessage("Event price is required")
    .isFloat({min: 0})
    .withMessage("Event price must be a non-negative number")
    .custom((value) => {
      // Check for reasonable decimal places (max 2)
      const decimalPlaces = (value.toString().split(".")[1] || []).length;
      if (decimalPlaces > 2) {
        throw new Error("Event price cannot have more than 2 decimal places");
      }
      return true;
    }),
];

const validateEventData = (req, res, next) => {
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
  eventValidationRules,
  validateEventData,
};
