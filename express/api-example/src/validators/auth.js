const Joi = require('joi')
const InvalidRequestFormatError = rootRequire('errors/invalid-request-format')

// schemas

const loginRequestSchema = Joi.object().keys({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(4).max(30).required()
})

// validators

const login = (req, res, next) => {
  Joi.validate(req.body, loginRequestSchema, (err) => {
    if (err) return next(new InvalidRequestFormatError(err.details[0].message))
    next()
  })
}

module.exports = { login }
