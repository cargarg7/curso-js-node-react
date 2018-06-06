const BaseError = rootRequire('errors/base')

module.exports = () => (err, req, res, next) => {
  console.error(err)
  if (err instanceof BaseError)
    res.status(err.statusCode).json({ error: err.message })
  else if (err.type === 'entity.parse.failed')
    res.status(err.statusCode).json({ error: 'Bad Request' })
  else
    res.status(500).json({ error: 'Internal Error' })
}
