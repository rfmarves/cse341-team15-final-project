const express = require('express');
const router = express.Router();

const venuesController = require('../controllers/venues');
//const validation = require('../middleware/validate');
//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', venuesController.getAll);

router.get('/:id', venuesController.getSingle);

router.post('/', venuesController.createVenue);

router.put('/:id', venuesController.updateVenue);

router.delete('/:id', venuesController.deleteVenue);

module.exports = router;
