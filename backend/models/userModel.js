const db = require('../config/db');

const getAllUsers = (callback) => {
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

const addUser = (user, callback) => {
    const sql = `
        INSERT INTO users
        (username, full_name, role_id, status)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [user.username, user.full_name, user.role_id, user.status],
        callback
    );
};

const updateUser = (id, user, callback) => {

    const sql = `
        UPDATE users
        SET full_name = COALESCE(?, full_name),
            status = COALESCE(?, status)
        WHERE user_id = ?
    `;

    db.query(
        sql,
        [user.full_name || null, user.status || null, id],
        callback
    );
};

module.exports = {
    getAllUsers,
    addUser,
    updateUser
};