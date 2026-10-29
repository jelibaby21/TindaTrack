const db = require('../config/db');

const getLogs = (callback) => {
    const sql = `
        SELECT
            al.log_id,
            u.username,
            al.action,
            al.table_name,
            al.record_id,
            al.description,
            al.log_date
        FROM activity_logs al
        INNER JOIN users u
            ON al.user_id = u.user_id
        ORDER BY al.log_id ASC
    `;

    db.query(sql, callback);
};

const addLog = (data, callback) => {
    const sql = `
        INSERT INTO activity_logs
        (user_id, action, table_name, record_id)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.user_id,
            data.action,
            data.table_name,
            data.record_id
        ],
        callback
    );
};

module.exports = {
    getLogs,
    addLog
};