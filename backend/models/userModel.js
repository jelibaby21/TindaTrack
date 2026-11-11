
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

// Updates only the fields sent by the frontend
const updateUser = (userId, data, callback) => {
    const allowedFields = [
        'username',
        'full_name',
        'role_id',
        'status'
    ];

    const fields = Object.keys(data).filter(
        field =>
            allowedFields.includes(field) &&
            data[field] !== undefined
    );

    if (fields.length === 0) {
        return callback(new Error('No valid fields provided'));
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

module.exports = {
    getUsers,
    addUser,
    updateUser
};
