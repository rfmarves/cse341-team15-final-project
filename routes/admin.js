const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const validation = require('../middleware/validate');
//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', adminController.getAll);

router.get('/:id', adminController.getSingle);

router.post('/', adminController.createAdmin);

router.put('/:id', adminController.updateAdmin);

router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
