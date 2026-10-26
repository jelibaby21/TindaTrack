const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);
router.put('/users/:id', userController.updateUser);

router.get('/users/report/join', require('../controllers/reportController').getUserReport);

module.exports = router;