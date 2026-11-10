const db = require('../config/db');

const getAll = (callback) => {
    const sql = `
        SELECT
            pu.purchase_id,
            s.supplier_name,
            u.full_name,
            pu.purchase_date,
            pu.total_amount
        FROM purchases pu
        INNER JOIN suppliers s
            ON pu.supplier_id = s.supplier_id
        INNER JOIN users u
            ON pu.user_id = u.user_id
        ORDER BY pu.purchase_id DESC
    `;
    db.query(sql, callback);
};

const add = (purchase, callback) => {
    const sql = `
        INSERT INTO purchases
        (supplier_id, user_id, purchase_date, total_amount)
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [
        purchase.supplier_id,
        purchase.user_id,
        purchase.purchase_date,
        purchase.total_amount
    ], callback);
};

const update = (id, purchase, callback) => {
    const sql = `
        UPDATE purchases
        SET supplier_id = ?, purchase_date = ?, total_amount = ?
        WHERE purchase_id = ?
    `;
    db.query(sql, [
        purchase.supplier_id,
        purchase.purchase_date,
        purchase.total_amount,
        id
    ], callback);
};

const remove = (id, callback) => {
    db.query(
        'DELETE FROM purchases WHERE purchase_id = ?',
        [id],
        callback
    );
};

const report = (callback) => {
    const sql = `
        SELECT
            pu.purchase_id,
            s.supplier_name,
            u.full_name,
            pu.purchase_date,
            pu.total_amount
        FROM purchases pu
        INNER JOIN suppliers s
            ON pu.supplier_id = s.supplier_id
        INNER JOIN users u
            ON pu.user_id = u.user_id
        ORDER BY pu.purchase_id DESC
    `;
    db.query(sql, callback);
};

module.exports = { getAll, add, update, remove, report };
