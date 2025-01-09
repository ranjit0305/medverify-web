const express = require('express');
const router = express.Router();
const distributorController = require('../controllers/distributorController');

router.post('/signup', distributorController.signup);
router.post('/login', distributorController.login);

module.exports = router;
