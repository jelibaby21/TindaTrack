const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventoryController');

router.get('/', controller.getAll);
router.post('/', controller.add);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/report/join', controller.report);

module.exports = router;