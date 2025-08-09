const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");
// const validation = require("../validation/validate");
const {handleErrors} = require("../utilities/utilities");
//const { isAuthenticated } = require('../middleware/authenticate');

router.get(
  "/",
  //#swagger.ignore = true
  handleErrors(adminController.getAll)
);

router.get(
  "/:id",
  //#swagger.ignore = true
  handleErrors(adminController.getSingle)
);

router.post(
  "/",
  //#swagger.ignore = true
  handleErrors(adminController.createAdmin)
);

router.put(
  "/:id",
  //#swagger.ignore = true
  handleErrors(adminController.updateAdmin)
);

router.delete(
  "/:id",
  //#swagger.ignore = true
  handleErrors(adminController.deleteAdmin)
);

module.exports = router;
