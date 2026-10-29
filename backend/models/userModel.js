const db = require('../config/db');

const getUsers = (callback) => {
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

const addUser = (data, callback) => {
    const sql = `
        INSERT INTO users
        (username, password, full_name, role_id)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.username,
            data.password,
            data.full_name,
            data.role_id
        ],
        callback
    );
};

const updateUser = (userId, data, callback) => {
    const sql = `
        UPDATE users
        SET username = ?,
            full_name = ?,
            role_id = ?,
            status = ?
        WHERE user_id = ?
    `;

    db.query(
        sql,
        [
            data.username,
            data.full_name,
            data.role_id,
            data.status,
            userId
        ],
        callback
    );
};

const deactivateUser = (userId, callback) => {
    const sql = `
        UPDATE users
        SET status = 'Inactive'
        WHERE user_id = ?
    `;

    db.query(sql, [userId], callback);
};

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deactivateUser
};