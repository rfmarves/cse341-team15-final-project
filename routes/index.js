const express = require('express');
const router = express.Router();

router.use('/', require('./swagger.js'));
router.use('/events', require('./events.js'));
router.use('/tickets', require('./tickets.js'));
router.use('/customers', require('./customers.js'));
router.use('/venues', require('./venues.js'));
router.use('/admin', require('./admin.js'));


module.exports = router;
