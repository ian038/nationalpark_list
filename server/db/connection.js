const mysql = require('mysql')
require('dotenv').config()

const db_config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true
}

let mysqlPool = mysql.createPool({ connectionLimit: 5, ...db_config})
mysqlPool.getConnection(function(err, connection) {
  if (err) {
    throw err; // not connected!
  } else if(!err) {
    console.log("No error")
  }
  if(connection) {
    console.log("DB opened")
  }
});


// function handleDisconnect() {
//   // recreate connection
//   mysqlConnection = mysql.createPool({ connectionLimit: 5, ...db_config})
//   mysqlPool.connect((err) => {
//     if(!err) {
//         console.log('DB opened')
//     } else {
//         console.log('Error' + err)
//         setTimeout(handleDisconnect, 2000)
//     }
//   })

//   mysqlPool.on('Error', (err) => {
//     console.log('db error', err)
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') {
//       handleDisconnect()
//     } else {
//       throw err
//     }
//   })
// }

// handleDisconnect()

module.exports = mysqlPool