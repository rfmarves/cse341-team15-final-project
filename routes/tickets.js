const express = require("express");
const router = express.Router();

const ticketsController = require("../controllers/tickets");
const {handleErrors} = require("../utilities/utilities");
//const validation = require('../middleware/validate');
const {isAuthenticated} = require("../middleware/authenticate");

// Public routes (no authentication)
router.get("/", handleErrors(ticketsController.getAll));
router.get("/:id", handleErrors(ticketsController.getSingle));

// Protected routes (authentication required)
router.post("/", isAuthenticated, handleErrors(ticketsController.createTicket));
router.put(
  "/:id",
  isAuthenticated,
  handleErrors(ticketsController.updateTicket)
);
router.delete(
  "/:id",
  isAuthenticated,
  handleErrors(ticketsController.deleteTicket)
);

module.exports = router;
