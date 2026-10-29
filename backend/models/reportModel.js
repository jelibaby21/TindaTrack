const db = require('../config/db');

// USER REPORT
const getUserReport = (callback) => {
    const sql = `
        SELECT
            u.user_id,
            u.username,
            u.full_name,
            r.role_name,
            u.status
        FROM users u
        INNER JOIN roles r
            ON u.role_id = r.role_id
    `;

    db.query(sql, callback);
};


// REPORT 1 — SALES + CUSTOMERS + USERS
const getSalesReport = (callback) => {
    const sql = `
        SELECT
            s.sale_id AS 'Sale ID',
            c.customer_name AS 'Customer',
            u.username AS 'User',
            s.sale_date AS 'Sale Date',
            s.total_amount AS 'Total Amount',
            s.payment_type AS 'Payment Type'
        FROM sales s
        INNER JOIN users u
            ON s.user_id = u.user_id
        LEFT JOIN customers c
            ON s.customer_id = c.customer_id
        ORDER BY s.sale_id;
    `;

    db.query(sql, callback);
};


// REPORT 2 — SALES + SALE ITEMS + PRODUCTS
const getSalesDetailsReport = (callback) => {
    const sql = `
        SELECT
            s.sale_id AS 'Sale ID',
            p.product_name AS 'Product',
            si.quantity AS 'Quantity',
            si.unit_price AS 'Unit Price',
            si.subtotal AS 'Subtotal'
        FROM sales s
        INNER JOIN sale_items si
            ON s.sale_id = si.sale_id
        INNER JOIN products p
            ON si.product_id = p.product_id
        ORDER BY s.sale_id;
    `;

    db.query(sql, callback);
};


// REPORT 3 — INVENTORY BATCHES + PRODUCTS + UNITS
const getInventoryReport = (callback) => {
    const sql = `
        SELECT
            ib.batch_id AS 'Batch ID',
            p.product_name AS 'Product',
            ib.quantity AS 'Quantity',
            un.unit_name AS 'Unit',
            ib.received_date AS 'Received Date',
            ib.expiration_date AS 'Expiration Date',
            ib.status AS 'Status'
        FROM inventory_batches ib
        INNER JOIN products p
            ON ib.product_id = p.product_id
        INNER JOIN units un
            ON p.unit_id = un.unit_id
        ORDER BY p.product_name;
    `;

    db.query(sql, callback);
};


// REPORT 4 — DEBTS + CUSTOMERS + DEBT PAYMENTS
const getDebtReport = (callback) => {
    const sql = `
        SELECT
            d.debt_id AS 'Debt ID',
            c.customer_name AS 'Customer',
            d.debt_date AS 'Debt Date',
            d.due_date AS 'Due Date',
            d.amount AS 'Amount',
            d.amount_paid AS 'Amount Paid',
            d.balance AS 'Balance',
            d.status AS 'Status',
            dp.payment_date AS 'Payment Date',
            dp.amount_paid AS 'Payment Amount'
        FROM debts d
        INNER JOIN customers c
            ON d.customer_id = c.customer_id
        LEFT JOIN debt_payments dp
            ON d.debt_id = dp.debt_id
        ORDER BY d.debt_id;
    `;

    db.query(sql, callback);
};


// REPORT 5 — PURCHASES + SUPPLIERS + USERS
const getPurchaseReport = (callback) => {
    const sql = `
        SELECT
            pu.purchase_id AS 'Purchase ID',
            sp.supplier_name AS 'Supplier',
            u.username AS 'User',
            pu.purchase_date AS 'Purchase Date',
            pu.total_amount AS 'Total Amount'
        FROM purchases pu
        INNER JOIN suppliers sp
            ON pu.supplier_id = sp.supplier_id
        INNER JOIN users u
            ON pu.user_id = u.user_id
        ORDER BY pu.purchase_id;
    `;

    db.query(sql, callback);
};


// REPORT 6 — PURCHASES + PURCHASE ITEMS + PRODUCTS
const getPurchaseDetailsReport = (callback) => {
    const sql = `
        SELECT
            pu.purchase_id AS 'Purchase ID',
            p.product_name AS 'Product',
            pi.quantity AS 'Quantity',
            pi.unit_cost AS 'Unit Cost',
            pi.subtotal AS 'Subtotal'
        FROM purchases pu
        INNER JOIN purchase_items pi
            ON pu.purchase_id = pi.purchase_id
        INNER JOIN products p
            ON pi.product_id = p.product_id
        ORDER BY pu.purchase_id;
    `;

    db.query(sql, callback);
};


module.exports = {
    getUserReport,
    getSalesReport,
    getSalesDetailsReport,
    getInventoryReport,
    getDebtReport,
    getPurchaseReport,
    getPurchaseDetailsReport
};