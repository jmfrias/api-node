'use strict'

const operations = require('../static/operations.json')
const results = require('../static/results.json')
const messages = require('../static/messages.json').healthcheck
const codes = require('http-status')
const {logger} = require('./logger')
const Health = require('../models/heath')

module.exports = {
    health: ()  => {
        let health
        try {
            health = new Health(messages.ok)            
        } catch (err) {
            return logger(operations.healthcheck, results.error, codes.INTERNAL_SERVER_ERROR , "Service not working" + err)
        }
        
        return logger(operations.healthcheck, results.ok, codes.OK,  health.getHealth(), [])
    }
}