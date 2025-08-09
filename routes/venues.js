const express = require("express");
const router = express.Router();

const venuesController = require("../controllers/venues");
const {handleErrors} = require("../utilities/utilities");
const validation = require("../validation/validateVenue");
const {isAuthenticated} = require("../middleware/authenticate");

// Public routes (no authentication)
router.get(
  "/",
  /* #swagger.tags = ['Venues']
     #swagger.description = 'Get all venues'
  */
  handleErrors(venuesController.getAll)
);
router.get(
  "/:id",
  /* #swagger.tags = ['Venues']
     #swagger.description = 'Get a single venue by ID'
  */
  handleErrors(venuesController.getSingle)
);

// Protected routes (authentication required)
router.post(
  "/",
  /* #swagger.tags = ['Venues']
     #swagger.description = 'Create a new venue'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Venue data',
       required: true,
       schema: { $ref: '#/definitions/Venue' }
     }
  */
  isAuthenticated,
  validation.venueValidationRules,
  validation.validateVenueData,
  handleErrors(venuesController.createVenue)
);

router.put(
  "/:id",
  /* #swagger.tags = ['Venues']
     #swagger.description = 'Update an existing venue'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated venue data',
       required: true,
       schema: { $ref: '#/definitions/Venue' }
     }
  */
  isAuthenticated,
  validation.venueValidationRules,
  validation.validateVenueData,
  handleErrors(venuesController.updateVenue)
);
router.delete(
  "/:id",
  /* #swagger.tags = ['Venues']
     #swagger.description = 'Delete a venue'
  */
  isAuthenticated,
  handleErrors(venuesController.deleteVenue)
);

module.exports = router;
