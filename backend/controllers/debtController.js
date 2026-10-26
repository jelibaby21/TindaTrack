const Debt = require('../models/debtModel');
const db = require('../config/db');

const getAll = (req, res) => {
    Debt.markOverdue((err) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        Debt.getAll((err, results) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(200).json(results);
        });
    });
};

const add = (req, res) => {
    const { customer_id, amount, due_date } = req.body;

    if (!customer_id || amount === undefined || Number(amount) <= 0) {
        return res.status(400).json({
            message: 'Valid customer and amount are required'
        });
    }

    Debt.add(req.body, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        res.status(201).json({
            message: 'Debt recorded successfully',
            debt_id: result.insertId
        });
    });
};

const payment = (req, res) => {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
        return res.status(400).json({
            message: 'Payment must be greater than zero'
        });
    }

    const checkSql = 'SELECT balance FROM debts WHERE debt_id = ?';

    db.query(checkSql, [req.params.id], (checkErr, rows) => {
        if (checkErr) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Debt not found' });
        }

        if (amount > Number(rows[0].balance)) {
            return res.status(400).json({
                message: 'Payment cannot be greater than remaining balance'
            });
        }

        Debt.pay(req.params.id, amount, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }

            const insertPayment = `
                INSERT INTO debt_payments
                (debt_id, amount_paid, payment_date)
                VALUES (?, ?, NOW())
            `;

            db.query(
                insertPayment,
                [req.params.id, amount],
                (paymentErr) => {
                    if (paymentErr) {
                        return res.status(500).json({
                            message: 'Payment record failed'
                        });
                    }

                    res.status(200).json({
                        message: 'Payment recorded successfully'
                    });
                }
            );
        });
    });
};

const remove = (req, res) => {
    Debt.remove(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Debt not found' });
        }
        res.status(200).json({ message: 'Debt cancelled' });
    });
};

const report = (req, res) => {
    Debt.report((err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(200).json(results);
    });
};

const getAlerts = (req, res) => {
    Debt.markOverdue((err) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        Debt.getAlerts((err, results) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(200).json(results);
        });
    });
}; 

module.exports = { getAll, add, payment, remove, report, getAlerts };