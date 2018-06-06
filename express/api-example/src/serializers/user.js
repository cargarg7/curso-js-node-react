const { pick } = require('lodash')

const KEYS = ['username', 'avatar', 'active', 'admin']

// parsers

const parseFilters = (filters) => {
  const attributes = {}
  if ('admin' in filters)
    attributes.admin = filters.admin === 'true' ? 1 : 0
  if ('active' in filters)
    attributes.active = filters.active === 'true' ? 1 : 0
  return attributes
}

const parseUser = (body) => {
  const user = pick(body, KEYS)
  // Boolean -> TINYINT(1)
  user.admin = (user.admin ? 1 : 0)
  user.active = (user.active ? 1 : 0)
  return user;
}

// serializers

const toJSON = (user) => {
  if (!user) return {}
  const json = pick(user, KEYS)
  // TINYINT(1) -> Boolean
  if ('admin' in json)
    json.admin = (json.admin > 0)
  if ('active' in json)
    json.active = (json.active > 0)
  return json
}

const toList = (userList) => ({
  users: userList.map(toJSON)
})

module.exports = { parseFilters, parseUser, toJSON, toList  }
