const mysqlConnection = require('../db/connection')

exports.getAll = (req, res) => {
    mysqlConnection.query('SELECT * FROM heroku_d17f7b91da1e213.users', (err, results) => {
        if(err) {
            res.json(err)
        } else {
            res.json({ data: results })
        }
    })
}

exports.remove = (req, res) => {
    mysqlConnection.query('DELETE FROM heroku_d17f7b91da1e213.users', (err, results) => {
        if(err) {
            res.json(err)
        } else {
            res.json('Deleted!')
        }
    })
}