const Purchase = require('./models/purchaseModel');

const getAll = (req, res) => {
    Purchase.getAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(200).json(results);
    });
};

const add = (req, res) => {
    const { supplier_id, purchase_date, total_amount } = req.body;

    if (!supplier_id || !purchase_date || total_amount === undefined) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    Purchase.add(req.body, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(201).json({
            message: 'Purchase added successfully',
            purchase_id: result.insertId
        });
    });
};

const update = (req, res) => {
    Purchase.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(200).json({ message: 'Purchase updated successfully' });
    });
};

const remove = (req, res) => {
    Purchase.remove(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(200).json({ message: 'Purchase cancelled' });
    });
};

const report = (req, res) => {
    Purchase.report((err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(200).json(results);
    });
};

module.exports = { getAll, add, update, remove, report };
