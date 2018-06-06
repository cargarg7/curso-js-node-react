const mysql = require('mysql')

exports.connect = (config) => {
  return mysql.createConnection(config)
}
