const express = require('express');
const router = express.Router();

const ticketsController = require('../controllers/tickets');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', ticketsController.getAll);

router.get('/:id', ticketsController.getSingle);

router.post('/', isAuthenticated, validation.saveTicket, ticketsController.createTicket);

router.put('/:id', isAuthenticated, validation.saveTicket, ticketsController.updateTicket);

router.delete('/:id', isAuthenticated, ticketsController.deleteTicket);

module.exports = router;
