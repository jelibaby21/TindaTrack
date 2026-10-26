const db = require('../config/db');

const getAll = (callback) => {
    const sql = `
        SELECT
            i.batch_id,
            i.product_id,
            p.product_name,
            i.quantity,
            i.expiration_date,
            i.status
        FROM inventory_batches i
        LEFT JOIN products p ON i.product_id = p.product_id
        ORDER BY i.batch_id
    `;
    db.query(sql, callback);
};

const add = (item, callback) => {
    const sql = `
        INSERT INTO inventory_batches
        (product_id, quantity, received_date, expiration_date, status)
        VALUES (?, ?, CURDATE(), ?, ?)
    `;

    db.query(sql, [
        item.product_id,
        item.quantity,
        item.expiration_date,
        item.status || 'Active'
    ], callback);
};

const update = (id, item, callback) => {
    const sql = `
        UPDATE inventory_batches
        SET quantity = ?, expiration_date = ?, status = ?
        WHERE batch_id = ?
    `;
    db.query(sql, [
        item.quantity,
        item.expiration_date,
        item.status,
        id
    ], callback);
};

const remove = (id, callback) => {
    db.query(
        'UPDATE inventory_batches SET status = ? WHERE batch_id = ?',
        ['Inactive', id],
        callback
    );
};

const report = (callback) => {
    const sql = `
        SELECT
            p.product_id,
            p.product_name,
            i.batch_id,
            i.quantity,
            i.expiration_date,
            i.status
        FROM products p
        LEFT JOIN inventory_batches i
            ON p.product_id = i.product_id
        ORDER BY p.product_id
    `;
    db.query(sql, callback);
};

module.exports = { getAll, add, update, remove, report };