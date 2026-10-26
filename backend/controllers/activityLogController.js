const ActivityLog = require('../models/activityLogModel');

const getLogs = (req, res) => {
    ActivityLog.getLogs((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json(results);
    });
};

const addLog = (req, res) => {
    const { user_id, action, description } = req.body;

    if (!user_id || !action) {
        return res.status(400).json({
            message: 'user_id and action are required'
        });
    }

    ActivityLog.addLog(
        { user_id, action, description },
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Database error'
                });
            }

            res.status(201).json({
                message: 'Activity logged',
                log_id: result.insertId
            });
        }
    );
};

module.exports = { getLogs, addLog };
