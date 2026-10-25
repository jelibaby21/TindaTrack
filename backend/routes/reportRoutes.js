const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportController');

router.get('/user-report', reportController.getUserReport);

module.exports = router;