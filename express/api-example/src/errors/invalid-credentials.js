const BaseError = rootRequire('errors/base')

class InvalidCredentialsError extends BaseError {
  constructor() {
    super('Invalid username or password', 401)
  }
}

module.exports = InvalidCredentialsError
