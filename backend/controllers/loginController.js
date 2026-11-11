
const User = require('../models/userModel');

const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username and password are required'
        });
    }

    User.loginUser(username, password, (err, results) => {
        if (err) {
            console.log('LOGIN ERROR:', err);
            return res.status(500).json({
                success: false,
                message: 'Database error'
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: results[0]
        });
    });
};

module.exports = { login };
