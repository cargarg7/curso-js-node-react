const userModel = rootRequire('models/user')

const canUpdateUser = (db, id, callback) => {
  userModel.findOne(db, { id }, (err, user) => {
    if (err) return callback(err)
    callback(null, user.admin && user.active)
  })
}

module.exports = { canUpdateUser }
