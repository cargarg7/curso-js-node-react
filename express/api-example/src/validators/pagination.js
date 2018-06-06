const Joi = require('joi')
const InvalidRequestFormatError = rootRequire('errors/invalid-request-format')

// schemas

const paginationSchema = Joi.object().keys({
  page: Joi.number().integer().min(0),
  perPage: Joi.number().integer().min(10).max(50)
})

// validators

const pagination = (req, res, next) => {
  const { page, perPage } = req.query
  Joi.validate({ page, perPage }, paginationSchema, (err) => {
    if (err) return next(new InvalidRequestFormatError(err.details[0].message))
    next()
  })
}

module.exports = { pagination }
