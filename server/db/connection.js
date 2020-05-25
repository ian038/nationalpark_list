const mysql = require('mysql')
require('dotenv').config()

// Database
const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
  })
  
  mysqlConnection.connect((err) => {
    if(!err) {
        console.log('DB opened')
    } else {
        console.log('Error' + err)
    }
  })

module.exports = mysqlConnection