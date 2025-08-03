const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/events");
const validation = require("../middleware/validate");
const {handleErrors} = require("../utilities/utilities");
const {isAuthenticated} = require("../middleware/authenticate");

// Public routes (no authentication)
router.get("/", 
    //#swagger.ignore = true
    handleErrors(eventsController.getAll));
router.get("/:id", 
    //#swagger.ignore = true
    handleErrors(eventsController.getSingle));

// Protected routes (authentication required)
router.post("/", 
    //#swagger.ignore = true
    isAuthenticated, handleErrors(eventsController.createEvent));
router.put("/:id", 
    //#swagger.ignore = true
    isAuthenticated, handleErrors(eventsController.updateEvent));
router.delete(
  "/:id",
    //#swagger.ignore = true
    isAuthenticated,
  handleErrors(eventsController.deleteEvent)
);

module.exports = router;
