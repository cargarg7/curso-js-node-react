const BaseError = rootRequire('errors/base')

class InvalidTokenError extends BaseError {
  constructor() {
    super('Invalid authorization token', 401)
  }
}

module.exports = InvalidTokenError
