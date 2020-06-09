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

  let connection

  function handleDisconnect() {
    // recreate connection
    connection = mysql.createConnection({
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
          setTimeout(handleDisconnect, 2000)
      }
    })
  
    mysqlConnection.on('Error', (err) => {
      console.log('db error', err)
      if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect()
      } else {
        throw err
      }
    })
  }

  handleDisconnect()

module.exports = mysqlConnection