const Sale = require('../models/salesModel');

const getAll = (req, res) => {
    Sale.getAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(200).json(results);
    });
};

const add = (req, res) => {
    const { sale_date, total_amount, payment_type } = req.body;
    if (!sale_date || total_amount === undefined || !payment_type) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }
    Sale.add(req.body, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(201).json({
            message: 'Sale recorded successfully',
            sale_id: result.insertId
        });
    });
};

const update = (req, res) => {
    Sale.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json({ message: 'Sale updated successfully' });
    });
};

const remove = (req, res) => {
    Sale.remove(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json({ message: 'Sale cancelled' });
    });
};

const report = (req, res) => {
    Sale.report((err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(200).json(results);
    });
};

module.exports = { getAll, add, update, remove, report };