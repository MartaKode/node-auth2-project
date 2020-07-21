const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const authenticate = require('./auth/authenticate-middleware')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api', authRouter)
server.use('/api/users',authenticate, usersRouter) // needs login authentication

server.get('/', (req, res) => {
    res.json({api: 'up'})
})

module.exports = server