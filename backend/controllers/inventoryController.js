
const Inventory = require('../models/inventoryModel');

const getAll = (req, res) => {
    Inventory.getAll((err, results) => {
        if (err) {
            console.error('Get inventory error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        res.json(results);
    });
};

const add = (req, res) => {
    const { product_id, quantity, expiration_date } = req.body;

    if (!product_id || quantity === undefined || quantity === '' ||
        Number(quantity) < 0 || !Number.isFinite(Number(quantity))) {
        return res.status(400).json({
            message: 'Please enter a valid product and quantity.'
        });
    }

    const status = 'Active';

    Inventory.add(
        {
            product_id,
            quantity,
            expiration_date: expiration_date || null,
            status
        },
        (err, result) => {
            if (err) {
                console.error('Inventory add error:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            res.status(201).json({
                message: `Inventory added. Status: ${status}`,
                batch_id: result.insertId
            });
        }
    );
};

const update = (req, res) => {
    const { quantity, expiration_date } = req.body;
    const id = req.params.id;

    if (quantity === undefined || quantity === '' ||
        Number(quantity) < 0 || !Number.isFinite(Number(quantity))) {
        return res.status(400).json({
            message: 'Please enter a valid quantity.'
        });
    }

    const status = 'Active';

    Inventory.update(
        id,
        {
            quantity,
            expiration_date: expiration_date || null,
            status
        },
        (err) => {
            if (err) {
                console.error('Update inventory error:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            res.json({ message: 'Inventory updated successfully.' });
        }
    );
};

const remove = (req, res) => {
    Inventory.remove(req.params.id, (err) => {
        if (err) {
            console.error('Deactivate inventory error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        res.json({ message: 'Inventory deactivated successfully.' });
    });
};

const report = (req, res) => {
    Inventory.report((err, results) => {
        if (err) {
            console.error('Inventory report error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        res.json(results);
    });
};

module.exports = {
    getAll,
    add,
    update,
    remove,
    report
};
