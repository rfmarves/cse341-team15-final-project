const express = require("express");
const router = express.Router();

const customersController = require("../controllers/customers");
const validation = require("../middleware/validate");
const {handleErrors} = require("../utilities/utilities");

router.get(
  "/",
  /* #swagger.tags = ['Customers']
     #swagger.description = 'Get all customers'
  */
  handleErrors(customersController.getAll)
);

router.get(
  "/:id",
  /* #swagger.tags = ['Customers']
     #swagger.description = 'Get a single customer by ID'
  */
  handleErrors(customersController.getSingle)
);

router.post(
  "/",
  /* #swagger.tags = ['Customers']
     #swagger.description = 'Create a new customer'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Customer data',
       required: true,
       schema: { $ref: '#/definitions/Customer' }
     }
  */
  handleErrors(customersController.createCustomer)
);

router.put(
  "/:id",
  /* #swagger.tags = ['Customers']
     #swagger.description = 'Update an existing customer'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated customer data',
       required: true,
       schema: { $ref: '#/definitions/Customer' }
     }
  */
  handleErrors(customersController.updateCustomer)
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Customers']
     #swagger.description = 'Delete a customer'
  */
  handleErrors(customersController.deleteCustomer)
);

module.exports = router;
