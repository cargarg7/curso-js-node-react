const { Router } = require('express')
const jwt = require('jsonwebtoken')
const authValidator = rootRequire('validators/auth')
const authSerializer = rootRequire('serializers/auth')
const authPolicy = rootRequire('policies/auth')
const userModel = rootRequire('models/user')

const generateToken = (db, config) => (req, res, next) => {
  const { username, password } = authSerializer.parseCredentials(req.body)
  userModel.findOne(db, { username }, (err, user) => {
    if (err) return next(err)
    authPolicy.validatePassword(password, user.password, user.salt, (err) => {
      if (err) return next(err)
      const response = authSerializer.toToken(user, config)
      res.json(response)
    })
  })
}

module.exports = (db, config) => {
  const router = new Router()
  router.post('/', authValidator.login, generateToken(db, config))
  return router
}
