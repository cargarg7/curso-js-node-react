const jwt = require('jsonwebtoken')
const NotAuthorizedError = rootRequire('errors/not-authorized')
const { parseToken } = rootRequire('serializers/auth')

const authMiddleware = (db, config) => {
  const { secret } = config.token
  return (req, res, next) => {
    const header = req.get('Authorization')
    if (!header) return next(new NotAuthorizedError())
    parseToken(header, secret, (err, decoded) => {
      if (err) return next(err)
      req.session = decoded
      next()
    })
  }
}

module.exports = authMiddleware
