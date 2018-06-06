const mysql = require('mysql')
const { map, join, assign, isEmpty } = require('lodash')
const DatabaseError = rootRequire('errors/database')

class BaseModel {
  constructor(table) {
    this.table = table
  }
  attributesToQuery(attributes) {
    const conditions = map(
      attributes,
      (value, key) => mysql.format(`\`${key}\` = ?`, [value])
    )
    const where = join(conditions, ' AND ')
    const query = `SELECT * FROM ${this.table}`
    return isEmpty(where) ? query : `${query} WHERE ${where}`
  }
  find(db, attributes, page, perPage, callback) {
    const from = page * perPage
    const to = from + perPage
    const fullQuery = this.attributesToQuery(attributes)
    db.query(`${fullQuery} LIMIT ?, ?`, [from, to], (err, results) => {
      if (err) return callback(new DatabaseError(err.message))
      callback(null, results)
    })
  }
  findOne(db, attributes, callback) {
    const query = `${this.attributesToQuery(attributes)} LIMIT 1`
    db.query(query, (err, results) => {
      if (err) return callback(new DatabaseError(err.message))
      callback(null, assign({}, results[0]))
    })
  }
  update(db, id, data, callback) {
    db.query(`UPDATE ${this.table} SET ?`, data, (err, results) => {
      if (err) return callback(new DatabaseError(err.message))
      callback(null, results.affectedRows)
    })
  }
}

module.exports = BaseModel
