const reportModel = require('../models/reportModel');


// USER REPORT
const getUserReport = (req, res) => {
    reportModel.getUserReport((err, results) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                message: 'Failed to get user report'
            });
        }

        res.json(results);
    });
};


// REPORT 1 — SALES REPORT
const getSalesReport = (req, res) => {
    reportModel.getSalesReport((err, results) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                message: 'Failed to get sales report'
            });
        }

        res.json(results);
    });
};


// REPORT 2 — SALES DETAILS REPORT
const getSalesDetailsReport = (req, res) => {
    reportModel.getSalesDetailsReport((err, results) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                message: 'Failed to get sales details report'
            });
        }

        res.json(results);
    });
};


// REPORT 3 — INVENTORY REPORT
const getInventoryReport = (req, res) => {
    reportModel.getInventoryReport((err, results) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                message: 'Failed to get inventory report'
            });
        }

        res.json(results);
    });
};


// REPORT 4 — DEBT REPORT
const getDebtReport = (req, res) => {
    reportModel.getDebtReport((err, results) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                message: 'Failed to get debt report'
            });
        }

        res.json(results);
    });
};


// REPORT 5 — PURCHASE REPORT
const getPurchaseReport = (req, res) => {
    reportModel.getPurchaseReport((err, results) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                message: 'Failed to get purchase report'
            });
        }

        res.json(results);
    });
};


// REPORT 6 — PURCHASE DETAILS REPORT
const getPurchaseDetailsReport = (req, res) => {
    reportModel.getPurchaseDetailsReport((err, results) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                message: 'Failed to get purchase details report'
            });
        }

        res.json(results);
    });
};


module.exports = {
    getUserReport,
    getSalesReport,
    getSalesDetailsReport,
    getInventoryReport,
    getDebtReport,
    getPurchaseReport,
    getPurchaseDetailsReport
};