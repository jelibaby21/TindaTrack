const db = require('../config/db');

const getAll = (callback) => {
    db.query(
        'SELECT * FROM customers ORDER BY customer_id',
        callback
    );
};

const add = (customer, callback) => {
    const sql = `
        INSERT INTO customers
        (customer_name, contact_number, address, status)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [
        customer.customer_name,
        customer.contact_number,
        customer.address,
        customer.status || 'Active'
    ], callback);
};

const update = (id, customer, callback) => {
    const sql = `
        UPDATE customers
        SET customer_name = ?, contact_number = ?, address = ?, status = ?
        WHERE customer_id = ?
    `;

    db.query(sql, [
        customer.customer_name,
        customer.contact_number,
        customer.address,
        customer.status,
        id
    ], callback);
};

const remove = (id, callback) => {
    db.query(
        'UPDATE customers SET status = ? WHERE customer_id = ?',
        ['Inactive', id],
        callback
    );
};

module.exports = { getAll, add, update, remove };