const NotFoundError = rootRequire('errors/not-found')

module.exports = () => (req, res, next) => {
  next(new NotFoundError())
}

