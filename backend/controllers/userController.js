
const userModel = require('../models/userModel');
const ActivityLog = require('../models/activityLogModel');

const getUsers = (req, res) => {
    userModel.getAllUsers((err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to get users'
            });
        }

        res.json(results);
    });
};

const addUser = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        full_name: req.body.full_name,
        role_id: req.body.role_id,
        status: req.body.status
    };

    userModel.addUser(user, (err, result) => {
        if (err) {
            console.error('Add user database error:', err);

            res.status(500).json({
                error: 'Failed to add user'
            });
        }

        ActivityLog.addLog({
            user_id: 1,
            action: 'Added User',
            table_name: 'users',
            record_id: result.insertId
        }, (logErr) => {
            if (logErr) {
                console.error('Failed to log added user:', logErr);
            }

            res.status(201).json({
                message: 'User added successfully',
                user_id: result.insertId
            });
        });
    });
};

const updateUser = (req, res) => {
    userModel.updateUser(
        req.params.id,
        req.body,
        (err, result) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: 'Failed to update user'
                });
            }

            ActivityLog.addLog({
                user_id: 1,
                action: 'Updated User',
                table_name: 'users',
                record_id: Number(req.params.id)
            }, (logErr) => {
                if (logErr) {
                    console.error('Failed to log updated user:', logErr);
                }

                res.json({
                    message: 'User updated successfully'
                });
            });
        }
    );
};

module.exports = {
    getUsers,
    addUser,
    updateUser
};
