const db = require('../config/db');

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

module.exports = {
    getUserReport
};