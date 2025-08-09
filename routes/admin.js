const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");
const { adminValidationRules, validateAdmin } = require("../validation/validateAdmin");
const { handleErrors } = require("../utilities/utilities");
const { isAuthenticated } = require("../middleware/authenticate");

router.get(
  "/",
  isAuthenticated,
  handleErrors(adminController.getAll)
);

router.get(
  "/:id",
  isAuthenticated,
  handleErrors(adminController.getSingle)
);

router.post(
  "/",
  isAuthenticated,
  adminValidationRules(),
  validateAdmin,
  handleErrors(adminController.createAdmin)
);

router.put(
  "/:id",
  isAuthenticated,
  adminValidationRules(),
  validateAdmin,
  handleErrors(adminController.updateAdmin)
);

router.delete(
  "/:id",
  isAuthenticated,
  handleErrors(adminController.deleteAdmin)
);

module.exports = router;
