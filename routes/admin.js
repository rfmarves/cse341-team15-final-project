const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', adminController.getAll);

router.get('/:id', adminController.getSingle);

router.post('/', isAuthenticated, validation.saveTicket, adminController.createTicket);

router.put('/:id', isAuthenticated, validation.saveTicket, adminController.updateTicket);

router.delete('/:id', isAuthenticated, adminController.deleteTicket);

module.exports = router;
