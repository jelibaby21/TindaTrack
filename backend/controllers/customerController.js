const Customer = require('../models/customerModel');

const getAll = (req, res) => {
    Customer.getAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(200).json(results);
    });
};

const add = (req, res) => {
    if (!req.body.customer_name) {
        return res.status(400).json({ message: 'Customer name is required' });
    }

    Customer.add(req.body, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(201).json({
            message: 'Customer added successfully',
            customer_id: result.insertId
        });
    });
};

const update = (req, res) => {
    Customer.update(req.params.id, {
        customer_name: req.body.customer_name,
        contact_number: req.body.contact_number,
        address: req.body.address,
        status: req.body.status
    }, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer updated successfully' });
    });
};

const remove = (req, res) => {
    Customer.remove(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deactivated' });
    });
};

module.exports = { getAll, add, update, remove };