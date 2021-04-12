'use strict'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const env = dotenv.config()
dotenvExpand(env)

/*SWAGGER*/
const swaggerUI = require('swagger-ui-express')
const swaggerConfig = require('../static/swagger.json')

const app = express ()

app.set('port', process.env.PORT)
app.use(bodyParser.urlencoded( {extended: false} ))
app.use(bodyParser.json())

app.use('/health', require('../routes/health'))
app.use('/personas', require('../routes/persona'))
app.use('/' || '/swagger', swaggerUI.serve, swaggerUI.setup(swaggerConfig))

module.exports = app