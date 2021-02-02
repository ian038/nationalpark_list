const mysqlConnection = require('../db/connection')

exports.getAll = (req, res) => {
    mysqlConnection.query(`SELECT * FROM ${process.env.DB_DATABASE}.users`, (err, results) => {
        if(err) {
            res.json(err)
        } else {
            res.json({ data: results })
        }
    })
}

exports.remove = (req, res) => {
    mysqlConnection.query(`DELETE FROM ${process.env.DB_DATABASE}.users`, (err, results) => {
        if(err) {
            res.json(err)
        } else {
            res.json('Deleted!')
        }
    })
}