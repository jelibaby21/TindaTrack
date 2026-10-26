const db = require('../config/db');

const getAll = (callback) => {
    const sql = `
        SELECT
            d.debt_id,
            d.customer_id,
            c.customer_name AS full_name,
            d.sale_id,
            d.amount,
            d.amount_paid,
            d.balance,
            d.status,
            d.due_date
        FROM debts d
        LEFT JOIN customers c
            ON d.customer_id = c.customer_id
        ORDER BY d.debt_id DESC
    `;
    db.query(sql, callback);
};

const add = (debt, callback) => {
    const sql = `
        INSERT INTO debts
        (customer_id, sale_id, amount, amount_paid, balance, status, due_date)
        VALUES (?, ?, ?, 0, ?, 'UNPAID', ?)
    `;
    db.query(sql, [
        debt.customer_id,
        debt.sale_id || null,
        debt.amount,
        debt.amount,
        debt.due_date
    ], callback);
};

const pay = (id, payment, callback) => {
    const sql = `
        UPDATE debts
        SET
            balance = amount - (amount_paid + ?),
            status =
                CASE
                    WHEN amount - (amount_paid + ?) <= 0 THEN 'PAID'
                    ELSE 'UNPAID'
                END,
            amount_paid = amount_paid + ?
        WHERE debt_id = ?
    `;
    db.query(sql, [payment, payment, payment, id], callback);
};

const remove = (id, callback) => {
    db.query(
        'UPDATE debts SET status = ? WHERE debt_id = ?',
        ['CANCELLED', id],
        callback
    );
};

const report = (callback) => {
    const sql = `
        SELECT
            d.debt_id,
            d.customer_id,
            c.customer_name AS full_name,
            d.amount,
            d.amount_paid,
            d.balance,
            d.status,
            dp.payment_id,
            dp.amount_paid AS payment_amount,
            dp.payment_date
        FROM debts d
        LEFT JOIN customers c
            ON d.customer_id = c.customer_id
        LEFT JOIN debt_payments dp
            ON d.debt_id = dp.debt_id

        UNION

        SELECT
            d.debt_id,
            d.customer_id,
            c.customer_name AS full_name,
            d.amount,
            d.amount_paid,
            d.balance,
            d.status,
            dp.payment_id,
            dp.amount_paid AS payment_amount,
            dp.payment_date
        FROM debts d
        RIGHT JOIN debt_payments dp
            ON d.debt_id = dp.debt_id
        LEFT JOIN customers c
            ON d.customer_id = c.customer_id
        ORDER BY debt_id;
    `;

    db.query(sql, callback);
};

module.exports = { getAll, add, pay, remove, report };