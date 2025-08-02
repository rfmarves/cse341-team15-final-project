const express = require("express");
const router = express.Router();

const venuesController = require("../controllers/venues");
const {handleErrors} = require("../utilities/utilities");
//const validation = require('../middleware/validate');
const {isAuthenticated} = require("../middleware/authenticate");

// Public routes (no authentication)
router.get("/", handleErrors(venuesController.getAll));
router.get("/:id", handleErrors(venuesController.getSingle));

// Protected routes (authentication required)
router.post("/", isAuthenticated, handleErrors(venuesController.createVenue));
router.put("/:id", isAuthenticated, handleErrors(venuesController.updateVenue));
router.delete(
  "/:id",
  isAuthenticated,
  handleErrors(venuesController.deleteVenue)
);

module.exports = router;
