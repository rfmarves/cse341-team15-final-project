const express = require('express');
const router = express.Router();

const ticketsController = require('../controllers/tickets');
//const validation = require('../middleware/validate');
//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', ticketsController.getAll);

router.get('/:id', ticketsController.getSingle);

router.post('/', ticketsController.createTicket);

router.put('/:id', ticketsController.updateTicket);

router.delete('/:id',  ticketsController.deleteTicket);

module.exports = router;
