// initial setup

require('./infrastructure/init')

// app modules

const express = require('express')
const morgan = require('morgan')
const dbModule = rootRequire('infrastructure/db')
const routes = rootRequire('routes')
const config = rootRequire('config')

// infrastructure initalization

const db = dbModule.connect(config.db)

// app initialization

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

// routes

app.use('/login', routes.login(db, config))
app.use('/users', routes.users(db, config))

// handle 404 and 500 errors

app.all('*', routes.notFound(db, config))
app.use(routes.errorHandler(db, config))

// server start

const server = app.listen(config.app.port)
console.log(`* ready on port ${config.app.port}`)

module.exports = { server, db, config }
