const db = require('../config/db');

const getAll = (callback) => {
    const sql = `
        SELECT
            pu.purchase_id,
            pu.supplier_id,
            s.supplier_name,
            pu.purchase_date,
            pu.total_amount,
            pu.status
        FROM purchases pu
        INNER JOIN suppliers s
            ON pu.supplier_id = s.supplier_id
        ORDER BY pu.purchase_id DESC
    `;
    db.query(sql, callback);
};

const add = (purchase, callback) => {
    const sql = `
        INSERT INTO purchases
        (supplier_id, purchase_date, total_amount, status)
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [
        purchase.supplier_id,
        purchase.purchase_date,
        purchase.total_amount,
        purchase.status || 'Completed'
    ], callback);
};

const update = (id, purchase, callback) => {
    const sql = `
        UPDATE purchases
        SET supplier_id = ?, purchase_date = ?, total_amount = ?, status = ?
        WHERE purchase_id = ?
    `;
    db.query(sql, [
        purchase.supplier_id,
        purchase.purchase_date,
        purchase.total_amount,
        purchase.status,
        id
    ], callback);
};

const remove = (id, callback) => {
    db.query(
        'UPDATE purchases SET status = ? WHERE purchase_id = ?',
        ['Cancelled', id],
        callback
    );
};

const report = (callback) => {
    const sql = `
        SELECT
            pu.purchase_id,
            s.supplier_name,
            pu.purchase_date,
            pu.total_amount,
            pu.status
        FROM purchases pu
        INNER JOINs suppliers s
            ON pu.supplier_id = s.supplier_id
        ORDER BY pu.purchase_id DESC
    `;
    db.query(sql, callback);
};

module.exports = { getAll, add, update, remove, report };
 