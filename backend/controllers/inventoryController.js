const Inventory = require('../models/inventoryModel');

const getAll = (req, res) => {
Inventory.getAll((err, results) => {
if (err) {
console.error('Inventory getAll error:', err.message);
return res.status(500).json({ message: 'Database error' });
}
res.status(200).json(results);
});
};

const add = (req, res) => {
const { product_id, quantity, expiration_date } = req.body;

if (!product_id || quantity === undefined) {
    return res.status(400).json({ message: 'Product and quantity are required' });
}

let status = 'Normal';

if (Number(quantity) <= 5) status = 'LOW STOCK';

if (expiration_date) {
    const today = new Date();
    const expiry = new Date(expiration_date);
    const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (days < 0) status = 'EXPIRED';
    else if (days <= 30) status = 'EXPIRING SOON';
}

Inventory.add(
    { product_id, quantity, expiration_date, status },
    (err, result) => {
        if (err) {
            console.error('Inventory add error:', err.message);
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
Inventory.update(req.params.id, req.body, (err, result) => {
if (err) {
console.error('Inventory update error:', err.message);
return res.status(500).json({ message: 'Database error' });
}

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Batch not found' });
    }

    res.status(200).json({ message: 'Inventory updated successfully' });
});

};

const remove = (req, res) => {
Inventory.remove(req.params.id, (err, result) => {
if (err) {
console.error('Inventory remove error:', err.message);
return res.status(500).json({ message: 'Database error' });
}

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Batch not found' });
    }

    res.status(200).json({ message: 'Inventory deactivated' });
});

};

const report = (req, res) => {
Inventory.report((err, results) => {
if (err) {
console.error('Inventory report error:', err.message);
return res.status(500).json({ message: 'Database error' });
}

    res.status(200).json(results);
});

};

module.exports = { getAll, add, update, remove, report };