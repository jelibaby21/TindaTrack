const ActivityLog = require('../models/activityLogModel');
console.log('ACTIVITY LOG CONTROLLER LOADED');

const getLogs = (req, res) => {
    ActivityLog.getLogs((err, results) => {

        if (err) {
            console.log('ACTIVITY LOG ERROR:', err);

            return res.status(500).json({
                message: 'Database error',
                error: err.message
            });
        }

        console.log('ACTIVITY LOG RESULTS:', results);

        res.status(200).json(results);
    });
};

const addLog = (req, res) => {
    const {
        user_id,
        action,
        table_name,
        record_id
    } = req.body;

    if (!user_id || !action) {
        return res.status(400).json({
            message: 'user_id and action are required'
        });
    }

    ActivityLog.addLog(
        {
            user_id,
            action,
            table_name,
            record_id
        },
        (err, result) => {

            if (err) {
    console.log(err);

    return res.status(500).json({
        message: 'Database error',
        error: err.message
    });
}
            res.status(201).json({
                message: 'Activity logged',
                log_id: result.insertId
            });
        }
    );
};

module.exports = {
    getLogs,
    addLog
};
