const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");
const { adminValidationRules, validateAdmin } = require("../validation/validateAdmin");
const { handleErrors } = require("../utilities/utilities");
const { isAuthenticated } = require("../middleware/authenticate");

router.get(
  "/",
  /* #swagger.tags = ['Admin']
     #swagger.description = 'Get all admins'
  */
  isAuthenticated,
  handleErrors(adminController.getAll)
);

router.get(
  "/:id",
  /* #swagger.tags = ['Admin']
     #swagger.description = 'Get a single admin by ID'
  */
  isAuthenticated,
  handleErrors(adminController.getSingle)
);

router.post(
  "/",
  /* #swagger.tags = ['Admin']
     #swagger.description = 'Create a new administrator'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Customer data',
       required: true,
       schema: { $ref: '#/definitions/Admin' }
     }
  */
  isAuthenticated,
  adminValidationRules(),
  validateAdmin,
  handleErrors(adminController.createAdmin)
);

router.put(
  "/:id",
  /* #swagger.tags = ['Admin']
     #swagger.description = 'Update an existing adminstrator'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated customer data',
       required: true,
       schema: { $ref: '#/definitions/Admin' }
     }
  */
  isAuthenticated,
  adminValidationRules(),
  validateAdmin,
  handleErrors(adminController.updateAdmin)
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Admin']
     #swagger.description = 'Delete an administrator'
  */
  isAuthenticated,
  handleErrors(adminController.deleteAdmin)
);

module.exports = router;
