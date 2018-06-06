const BaseError = rootRequire('errors/base')

class NotFoundError extends BaseError {
  constructor() {
    super('Not Found', 404)
  }
}

module.exports = NotFoundError
