const BaseModel = require('./base.js')

class UserModel extends BaseModel {
  constructor() {
    super('users')
  }
}

module.exports = new UserModel()
