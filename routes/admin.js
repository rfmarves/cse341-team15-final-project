const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");
const validation = require("../middleware/validate");
const {handleErrors} = require("../utilities/utilities");
//const { isAuthenticated } = require('../middleware/authenticate');

router.get("/", handleErrors(adminController.getAll));

router.get("/:id", handleErrors(adminController.getSingle));

router.post("/", handleErrors(adminController.createAdmin));

router.put("/:id", handleErrors(adminController.updateAdmin));

router.delete("/:id", handleErrors(adminController.deleteAdmin));

module.exports = router;
