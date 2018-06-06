const BaseError = rootRequire('errors/base')

class DatabaseError extends BaseError {
  constructor(message) {
    super(message, 500)
  }
}

module.exports = DatabaseError
