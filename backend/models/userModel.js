
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

// Alias for compatibility with controllers using getUsers
const getUsers = getAllUsers;

const addUser = (data, callback) => {
    const sql = `
        INSERT INTO users
        (username, password, full_name, role_id, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.username,
            data.password,
            data.full_name,
            data.role_id,
            data.status
        ],
        callback
    );
};

const updateUser = (userId, data, callback) => {
    const allowedFields = [
        'username',
        'full_name',
        'role_id',
        'status'
    ];

    const fields = allowedFields.filter(
        field => data[field] !== undefined
    );

    if (fields.length === 0) {
        return callback(new Error('No fields to update'));
    }

    const setClause = fields
        .map(field => `${field} = ?`)
        .join(', ');

    const values = fields.map(field => data[field]);
    values.push(userId);

    const sql = `
        UPDATE users
        SET ${setClause}
        WHERE user_id = ?
    `;

    db.query(sql, values, callback);
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
    getAllUsers,
    getUsers,
    addUser,
    updateUser,
    deactivateUser
};
