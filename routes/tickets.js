const express = require("express");
const router = express.Router();

const ticketsController = require("../controllers/tickets");
const {handleErrors} = require("../utilities/utilities");
//const validation = require('../middleware/validate');
const {isAuthenticated} = require("../middleware/authenticate");

// Public routes (no authentication)
router.get("/", 
    //#swagger.ignore = true
    handleErrors(ticketsController.getAll));
router.get("/:id", 
    //#swagger.ignore = true
    handleErrors(ticketsController.getSingle));

// Protected routes (authentication required)
router.post("/", 
    //#swagger.ignore = true
    isAuthenticated, handleErrors(ticketsController.createTicket));
router.put(
  "/:id", 
    //#swagger.ignore = true
    isAuthenticated,
  handleErrors(ticketsController.updateTicket)
);
router.delete(
  "/:id",  
    //#swagger.ignore = true
    isAuthenticated,
  handleErrors(ticketsController.deleteTicket)
);

module.exports = router;
