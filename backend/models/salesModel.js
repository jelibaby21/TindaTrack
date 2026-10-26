const db = require('../config/db');

const getAll = (callback) => {
    const sql = `
        SELECT
            s.sale_id,
            s.customer_id,
            c.customer_name,
            s.user_id,
            s.sale_date,
            s.total_amount,
            s.payment_type
        FROM sales s
        LEFT JOIN customers c
            ON s.customer_id = c.customer_id
        ORDER BY s.sale_id DESC
    `;
    db.query(sql, callback);
};

const add = (sale, callback) => {
    const sql = `
        INSERT INTO sales
        (customer_id, user_id, sale_date, total_amount, payment_type)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [
        sale.customer_id || null,
        sale.user_id,
        sale.sale_date,
        sale.total_amount,
        sale.payment_type
    ], callback);
};

const update = (id, sale, callback) => {
    const sql = `
        UPDATE sales
        SET customer_id = ?, user_id = ?, sale_date = ?,
            total_amount = ?, payment_type = ?
        WHERE sale_id = ?
    `;
    db.query(sql, [
        sale.customer_id || null,
        sale.user_id,
        sale.sale_date,
        sale.total_amount,
        sale.payment_type,
        id
    ], callback);
};

const remove = (id, callback) => {
    db.query(
        'DELETE FROM sales WHERE sale_id = ?',
        [id],
        callback
    );
};

const report = (callback) => {
    const sql = `
        SELECT
            s.sale_id,
            c.customer_name,
            s.user_id,
            s.sale_date,
            s.total_amount,
            s.payment_type
        FROM sales s
        LEFT JOIN customers c
            ON s.customer_id = c.customer_id
        ORDER BY s.sale_id DESC
    `;
    db.query(sql, callback);
};

module.exports = { getAll, add, update, remove, report };