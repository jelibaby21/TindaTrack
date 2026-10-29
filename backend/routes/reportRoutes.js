const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportController');

// User Report
router.get('/user-report', reportController.getUserReport);

// Report 1 — Sales Report
router.get('/sales-report', reportController.getSalesReport);

// Report 2 — Sales Details Report
router.get('/sales-details-report', reportController.getSalesDetailsReport);

// Report 3 — Inventory Report
router.get('/inventory-report', reportController.getInventoryReport);

// Report 4 — Debt Report
router.get('/debt-report', reportController.getDebtReport);

// Report 5 — Purchase Report
router.get('/purchase-report', reportController.getPurchaseReport);

// Report 6 — Purchase Details Report
router.get('/purchase-details-report', reportController.getPurchaseDetailsReport);

module.exports = router;