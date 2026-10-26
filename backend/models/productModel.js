const db = require('../config/db');

const getAll = (callback) => {
    const sql = `
        SELECT
            p.product_id,
            p.product_name,
            c.category_name,
            u.unit_name,
            p.price,
            p.status
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.category_id
        LEFT JOIN units u ON p.unit_id = u.unit_id
        ORDER BY p.product_id
    `;
    db.query(sql, callback);
};

const add = (product, callback) => {
    const sql = `
        INSERT INTO products
        (product_name, category_id, unit_id, price, status)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [
        product.product_name,
        product.category_id,
        product.unit_id,
        product.price,
        product.status
    ], callback);
};

const update = (id, product, callback) => {
    const sql = `
        UPDATE products
        SET product_name = ?, category_id = ?, unit_id = ?, price = ?, status = ?
        WHERE product_id = ?
    `;
    db.query(sql, [
        product.product_name,
        product.category_id,
        product.unit_id,
        product.price,
        product.status,
        id
    ], callback);
};

const remove = (id, callback) => {
    db.query(
        'UPDATE products SET status = ? WHERE product_id = ?',
        ['Inactive', id],
        callback
    );
};

const report = (callback) => {
    const sql = `
        SELECT p.product_id, p.product_name,
               c.category_name, u.unit_name,
               p.price, p.status
        FROM products p
        INNER JOIN categories c
            ON p.category_id = c.category_id
        LEFT JOIN units u
            ON p.unit_id = u.unit_id
        ORDER BY p.product_id
    `;
    db.query(sql, callback);
};

module.exports = { getAll, add, update, remove, report };