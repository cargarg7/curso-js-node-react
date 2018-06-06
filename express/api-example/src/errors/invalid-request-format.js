const BaseError = rootRequire('errors/base')

class InvalidRequestFormatError extends BaseError {
  constructor(message) {
    super(message, 400)
  }
}

module.exports = InvalidRequestFormatError
