const Joi = require('joi')
const paginationValidator = rootRequire('validators/pagination')
const InvalidRequestFormatError = rootRequire('errors/invalid-request-format')

// schemas

const userSchema = Joi.object().keys({
  username: Joi.string().min(3).max(30).required(),
  avatar: Joi.string().uri(),
  active: Joi.boolean(),
  admin: Joi.boolean()
})

const filtersSchema = Joi.object().keys({
  active: Joi.boolean(),
  admin: Joi.boolean()
})

// validators

const login = (req, res, next) => {
  Joi.validate(req.body, loginRequestSchema, (err) => {
    if (err) return next(new InvalidRequestFormatError(err.details[0].message))
    next()
  })
}

const filters = (req, res, next) => {
  const { active, admin } = req.query
  Joi.validate({ active, admin }, filtersSchema, (err) => {
    if (err) return next(new InvalidRequestFormatError(err.details[0].message))
    next()
  })
}

const list = [
  paginationValidator.pagination,
  filters
]

const update = (req, res, next) => {
  Joi.validate(req.body, userSchema, (err) => {
    if (err) return next(new InvalidRequestFormatError(err.details[0].message))
    next()
  })
}

module.exports = { list, update }
