const { pick } = require('lodash')
const jwt = require('jsonwebtoken')
const InvalidTokenError = rootRequire('errors/invalid-token')

// parsers

const parseCredentials = (body) => {
  return pick(body, ['username', 'password'])
}

const parseToken = (header, secret, callback) => {
  const token = header.match(/Bearer (.*)$/)[1]
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return callback(new InvalidTokenError())
    callback(null, decoded)
  })
}

// serializers

const toToken = (user, config) => {
  const secret = config.token.secret
  const token = jwt.sign({ userId: user.id }, secret)
  return { token }
}

module.exports = { parseCredentials, parseToken, toToken }
