const express = require('express');
const router = express.Router();

const ticketsController = require('../controllers/venues');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', venuesController.getAll);

router.get('/:id', venuesController.getSingle);

router.post('/', isAuthenticated, validation.saveVenue, venuesController.createVenue);

router.put('/:id', isAuthenticated, validation.saveVenue, venuesController.updateVenue);

router.delete('/:id', isAuthenticated, venuesController.deleteVenue);

module.exports = router;
