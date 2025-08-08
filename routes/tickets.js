const express = require("express");
const router = express.Router();

const ticketsController = require("../controllers/tickets");
const {handleErrors} = require("../utilities/utilities");
//const validation = require('../middleware/validate');
const {isAuthenticated} = require("../middleware/authenticate");

// Public routes (no authentication)
router.get("/", 
  /* #swagger.tags = ['Tickets']
     #swagger.description = 'Get all tickets'
  */
    handleErrors(ticketsController.getAll)
  );

router.get("/:id", 
  /* #swagger.tags = ['Tickets']
     #swagger.description = 'Get a single ticket by ID'
  */
    handleErrors(ticketsController.getSingle)
  );

// Protected routes (authentication required)
router.post("/", 
  /* #swagger.tags = ['Tickets']
     #swagger.description = 'Create a new ticket'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Ticket data',
       required: true,
       schema: { $ref: '#/definitions/Ticket' }
     }
  */
    isAuthenticated,
    handleErrors(ticketsController.createTicket)
  );

router.post("/use/:id",
  /* #swagger.tags = ['Tickets']
     #swagger.description = 'Record an existing ticket as used'
  */
    isAuthenticated,
  handleErrors(ticketsController.useTicket));

router.get("/status/:id",
  /* #swagger.tags = ['Tickets']
     #swagger.description = 'Get ticket status by ID'
  */
    isAuthenticated,
  handleErrors(ticketsController.getStatus)
);

router.put(
  "/:id", 
  /* #swagger.tags = ['Tickets']
     #swagger.description = 'Update an existing ticket'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated ticket data',
       required: true,
       schema: { $ref: '#/definitions/Ticket' }
     }
  */
    isAuthenticated,
  handleErrors(ticketsController.updateTicket)
);

router.delete(
  "/:id",  
  /* #swagger.tags = ['Tickets']
     #swagger.description = 'Delete a ticket'
  */
    // isAuthenticated,
  handleErrors(ticketsController.deleteTicket)
);

module.exports = router;
