
const db = require('../config/db');

const getLogs = (callback) => {
    const sql = `
        SELECT
            a.log_id,
            a.user_id,
            u.username,
            a.action,
            a.table_name,
            a.record_id,
            a.timestamp
        FROM activity_logs a
        LEFT JOIN users u
            ON a.user_id = u.user_id
        ORDER BY a.log_id DESC
    `;

    db.query(sql, callback);
};

const addLog = (log, callback) => {
    const sql = `
        INSERT INTO activity_logs
        (user_id, action, table_name, record_id)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [
        log.user_id,
        log.action,
        log.table_name || null,
        log.record_id || null
    ], callback);
};

module.exports = { getLogs, addLog };
