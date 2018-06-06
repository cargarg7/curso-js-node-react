const BaseError = rootRequire('errors/base')

class NotAuthorizedError extends BaseError {
  constructor() {
    super('Not Authorized', 401)
  }
}

module.exports = NotAuthorizedError
