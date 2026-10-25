const reportModel = require('../models/reportModel');

const getUserReport = (req, res) => {

    reportModel.getUserReport((err, results) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: 'Failed to get user report'
            });
        }

        res.json(results);
    });
};

module.exports = {
    getUserReport
};