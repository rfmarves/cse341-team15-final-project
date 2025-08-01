const express = require('express');
const router = express.Router();

const customersController = require('../controllers/customers');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', customersController.getAll);

router.get('/:id', customersController.getSingle);

router.post('/', isAuthenticated, validation.saveTicket, customersController.createTicket);

router.put('/:id', isAuthenticated, validation.saveTicket, customersController.updateTicket);

router.delete('/:id', isAuthenticated, customersController.deleteTicket);

module.exports = router;
