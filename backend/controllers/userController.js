
const User = require('../models/userModel');
const ActivityLog = require('../models/activityLogModel');

const getUsers = (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) {
            console.log('USER ERROR:', err);
            return res.status(500).json({
                message: 'Failed to get users',
                error: err.message
            });
        }

        res.status(200).json(results);
    });
};

const addUser = (req, res) => {
    const {
        username,
        password,
        full_name,
        role_id,
        status
    } = req.body;

    if (!username || !password || !full_name || !role_id) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const user = {
        username,
        password,
        full_name,
        role_id,
        status: status || 'Active'
    };

    User.addUser(user, (err, result) => {
        if (err) {
            console.log('ADD USER ERROR:', err);
            return res.status(500).json({
                message: 'Database error',
                error: err.message
            });
        }

        ActivityLog.addLog({
            user_id: req.body.logged_in_user_id,
            action: 'Added User',
            table_name: 'users',
            record_id: result.insertId
        }, (logErr) => {
            if (logErr) {
                console.log('ADD USER LOG ERROR:', logErr);
            }
        });

        res.status(201).json({
            message: 'User added successfully',
            user_id: result.insertId
        });
    });
};

const updateUser = (req, res) => {
    const userId = req.params.id;

    const allowedFields = [
        'username',
        'full_name',
        'role_id',
        'status'
    ];

    const updates = {};

    allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    });

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({
            message: 'No valid fields provided'
        });
    }

    User.updateUser(userId, updates, (err, result) => {
        if (err) {
            console.log('UPDATE USER ERROR:', err);
            return res.status(500).json({
                message: 'Database error',
                error: err.message
            });
        }

        ActivityLog.addLog({
            user_id: req.body.logged_in_user_id,
            action: 'Updated User',
            table_name: 'users',
            record_id: userId
        }, (logErr) => {
            if (logErr) {
                console.log('UPDATE USER LOG ERROR:', logErr);
            }
        });

        res.json({
            message: 'User updated successfully'
        });
    });
};

const deactivateUser = (req, res) => {
    const userId = req.params.id;

    User.deactivateUser(userId, (err, result) => {
        if (err) {
            console.log('DEACTIVATE USER ERROR:', err);
            return res.status(500).json({
                message: 'Database error',
                error: err.message
            });
        }

        ActivityLog.addLog({
            user_id: req.body.logged_in_user_id,
            action: 'Deactivated User',
            table_name: 'users',
            record_id: userId
        }, (logErr) => {
            if (logErr) {
                console.log('DEACTIVATE USER LOG ERROR:', logErr);
            }
        });

        res.json({
            message: 'User deactivated successfully'
        });
    });
};

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deactivateUser
};
