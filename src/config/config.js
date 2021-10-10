'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const env = dotenv.config()
dotenvExpand(env)
const yaml = require('yamljs')

/*SWAGGER*/
const swaggerUI = require('swagger-ui-express')
const swaggerConfig = yaml.load(path.resolve(__dirname, '../static/swagger.yml'))

const app = express ()

app.set('port', process.env.APP_PORT || 3000)
app.use(bodyParser.urlencoded( {extended: false} ))
app.use(bodyParser.json())

app.use('/health', require('../routes/health'))
app.use('/' || '/swagger', swaggerUI.serve, swaggerUI.setup(swaggerConfig))

module.exports = app