const Product = require('../models/productModel');

const getAll = (req, res) => {
    Product.getAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(200).json(results);
    });
};

const add = (req, res) => {
    const { product_name, category_id, unit_id, price, status } = req.body;

    if (!product_name || !category_id || !unit_id || price === undefined) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    Product.add(
        { product_name, category_id, unit_id, price, status: status || 'Active' },
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(201).json({
                message: 'Product added successfully',
                product_id: result.insertId
            });
        }
    );
};

const update = (req, res) => {
    Product.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
    });
};

const remove = (req, res) => {
    Product.remove(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deactivated' });
    });
};

const report = (req, res) => {
    Product.report((err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(200).json(results);
    });
};

module.exports = { getAll, add, update, remove, report };