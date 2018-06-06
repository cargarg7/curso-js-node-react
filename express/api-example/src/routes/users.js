const { Router } = require('express')
const authMiddleware = rootRequire('middleware/auth')
const userModel = rootRequire('models/user')
const userSerializer = rootRequire('serializers/user')
const paginationSerializer = rootRequire('serializers/pagination')
const usersValidator = rootRequire('validators/users')
const usersPolicy = rootRequire('policies/users')

const listUsers = db => (req, res, next) => {
  const attributes = userSerializer.parseFilters(req.query)
  const { page, perPage } = paginationSerializer.parsePage(req.query)
  userModel.find(db, attributes, page, perPage, (err, result) => {
    if (err) return next(err)
    const response = userSerializer.toList(result)
    res.json(response)
    // MEJORA: loguear la operacion!
  })
}

const updateUser = db => (req, res, next) => {
  const { userId } = req.session
  const { id } = req.params
  usersPolicy.canUpdateUser(db, userId, (err) => {
    if (err) return next(err)
    const userData = userSerializer.parseUser(req.body)
    userModel.update(db, id, userData, (err) => {
      if (err) return next(err)
      userModel.findOne(db, { id }, (err, updatedUser) => {
        if (err) return next(err)
        const response = userSerializer.toJSON(updatedUser)
        res.json(response)
        // MEJORA: loguear la operacion!
      })
    })
  }) 
}

module.exports = (db, config) => {

  const router = new Router()
  const private = authMiddleware(db, config)

  router.get('/', private, usersValidator.list, listUsers(db))
  router.put('/:id', private, usersValidator.update, updateUser(db))

  return router
}
