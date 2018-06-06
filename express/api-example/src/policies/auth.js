const crypto = require('crypto')
const InvalidCredentialsError = rootRequire('errors/invalid-credentials')

const hashPassword = (password, hashSalt) => {
  const hash = crypto.createHash('sha256')
  hash.update(`${password}${hashSalt}`)
  return hash.digest('hex')
}

const validatePassword = (password, hashedPassword, hashSalt, callback) => {
  const hashed = hashPassword(password, hashSalt)
  callback(hashed === hashedPassword ? null : new InvalidCredentialsError())
}

module.exports = { hashPassword, validatePassword }
