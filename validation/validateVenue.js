const {body, validationResult} = require("express-validator");

const venueValidationRules = [
  body("venueName")
    .notEmpty()
    .withMessage("Venue name is required")
    .isLength({min: 2, max: 100})
    .withMessage("Venue name must be between 2 and 100 characters")
    .trim(),

  body("city")
    .notEmpty()
    .withMessage("City is required")
    .isLength({min: 2, max: 50})
    .withMessage("City must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "City can only contain letters, spaces, hyphens, and apostrophes"
    )
    .trim(),

  body("country")
    .notEmpty()
    .withMessage("Country is required")
    .isLength({min: 2, max: 50})
    .withMessage("Country must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "Country can only contain letters, spaces, hyphens, and apostrophes"
    )
    .trim(),

  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({min: 5, max: 200})
    .withMessage("Address must be between 5 and 200 characters")
    .trim(),

  body("gpsCoordinates")
    .optional()
    .custom((value) => {
      // If gpsCoordinates is not provided, that's fine (it's optional)
      if (!value) {
        return true;
      }

      // Check if it's an object
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        throw new Error("GPS coordinates must be an object");
      }

      const {latitude, longitude} = value;

      // Check if both latitude and longitude are provided
      if (latitude === undefined || longitude === undefined) {
        throw new Error(
          "GPS coordinates must include both latitude and longitude"
        );
      }

      // Convert to numbers if they're strings
      const lat = typeof latitude === "string" ? parseFloat(latitude) : latitude;
      const lng = typeof longitude === "string" ? parseFloat(longitude) : longitude;

      // Validate latitude range
      if (typeof lat !== "number" || isNaN(lat) || lat < -90 || lat > 90) {
        throw new Error("Latitude must be a number between -90 and 90");
      }

      // Validate longitude range
      if (typeof lng !== "number" || isNaN(lng) || lng < -180 || lng > 180) {
        throw new Error("Longitude must be a number between -180 and 180");
      }

      return true;
    }),
];

const validateVenueData = (req, res, next) => {
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
  venueValidationRules,
  validateVenueData,
};
