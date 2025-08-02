const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/events");
const validation = require("../middleware/validate");
const {handleErrors} = require("../utilities/utilities");
const {isAuthenticated} = require("../middleware/authenticate");

// Public routes (no authentication)
router.get("/", handleErrors(eventsController.getAll));
router.get("/:id", handleErrors(eventsController.getSingle));

// Protected routes (authentication required)
router.post("/", isAuthenticated, handleErrors(eventsController.createEvent));
router.put("/:id", isAuthenticated, handleErrors(eventsController.updateEvent));
router.delete(
  "/:id",
  isAuthenticated,
  handleErrors(eventsController.deleteEvent)
);

module.exports = router;
