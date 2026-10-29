const User = require('../models/userModel');

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
    const {
        username,
        password,
        full_name,
        role_id
    } = req.body;

    if (!username || !password || !full_name || !role_id) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    User.addUser(
        {
            username,
            password,
            full_name,
            role_id
        },
        (err, result) => {

            if (err) {
                console.log('ADD USER ERROR:', err);

                return res.status(500).json({
                    message: 'Database error',
                    error: err.message
                });
            }

            res.status(201).json({
                message: 'User added successfully',
                user_id: result.insertId
            });
        }
    );
};

const updateUser = (req, res) => {
    const userId = req.params.id;

    const {
        username,
        full_name,
        role_id,
        status
    } = req.body;

    User.updateUser(
        userId,
        {
            username,
            full_name,
            role_id,
            status
        },
        (err, result) => {

            if (err) {
                console.log('UPDATE USER ERROR:', err);

                return res.status(500).json({
                    message: 'Database error',
                    error: err.message
                });
            }

            res.json({
                message: 'User updated successfully'
            });
        }
    );
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