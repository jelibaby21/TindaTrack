
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Load categories
router.get('/categories', (req, res) => {
    db.query(
        'SELECT category_id, category_name FROM categories ORDER BY category_id',
        (err, results) => {
            if (err) {
                console.error('CATEGORY ERROR:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.json(results);
        }
    );
});

// Load units
router.get('/units', (req, res) => {
    db.query(
        'SELECT unit_id, unit_name, abbreviation FROM units ORDER BY unit_id',
        (err, results) => {
            if (err) {
                console.error('UNIT ERROR:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.json(results);
        }
    );
});


router.get('/suppliers', (req, res) => {
    db.query(
        'SELECT supplier_id, supplier_name FROM suppliers WHERE status = ? ORDER BY supplier_id',
        ['Active'],
        (err, results) => {
            if (err) {
                console.error('SUPPLIER ERROR:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.json(results);
        }
    );
});

module.exports = router;
