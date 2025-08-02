const express = require("express");
const router = express.Router();

const customersController = require("../controllers/customers");
const validation = require("../middleware/validate");
const {handleErrors} = require("../utilities/utilities");
//const { isAuthenticated } = require('../middleware/authenticate');

router.get("/", handleErrors(customersController.getAll));

router.get("/:id", handleErrors(customersController.getSingle));

router.post("/", handleErrors(customersController.createCustomer));

router.put("/:id", handleErrors(customersController.updateCustomer));

router.delete("/:id", handleErrors(customersController.deleteCustomer));

module.exports = router;
