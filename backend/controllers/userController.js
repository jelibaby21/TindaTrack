
const User = require('../models/userModel');
const ActivityLog = require('../models/activityLogModel');

// The current system uses the owner account as the actor.
const ACTOR_USER_ID = 1;

// Save an activity log
const logActivity = (action, recordId, callback) => {
    ActivityLog.addLog({
        user_id: ACTOR_USER_ID,
        action: action,
        table_name: 'users',
        record_id: recordId
    }, (err) => {
        if (err) {
            console.log('ACTIVITY LOG ERROR:', err);
        }

        callback();
    });
};

const getUsers = (req, res) => {
    User.getUsers((err, results) => {
        if (err) {
            console.log('USER ERROR:', err);

            return res.status(500).json({
                message: 'Database error',
                error: err.message
            });
        }

        res.status(200).json(results);
    });
};

const addUser = (req, res) => {
    const { username, password, full_name, role_id } = req.body;

    if (!username || !password || !full_name || !role_id) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    User.addUser(
        { username, password, full_name, role_id },
        (err, result) => {
            if (err) {
                console.log('ADD USER ERROR:', err);

                return res.status(500).json({
                    message: 'Database error',
                    error: err.message
                });
            }

            logActivity('Added User', result.insertId, () => {
                res.status(201).json({
                    message: 'User added successfully',
                    user_id: result.insertId
                });
            });
        }
    );
};

const updateUser = (req, res) => {
    const userId = req.params.id;
    const data = req.body;

    User.updateUser(userId, data, (err, result) => {
        if (err) {
            console.log('UPDATE USER ERROR:', err);

            return res.status(500).json({
                message: 'Database error',
                error: err.message
            });
        }

        let action = 'Updated User';

        if (data.status === 'Inactive') {
            action = 'Deactivated User';
        } else if (data.status === 'Active') {
            action = 'Activated User';
        }

        logActivity(action, userId, () => {
            res.json({
                message: 'User updated successfully'
            });
        });
    });
};

module.exports = {
    getUsers,
    addUser,
    updateUser
};
