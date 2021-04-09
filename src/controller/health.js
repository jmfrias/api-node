'use strict'

const operaciones = require('../static/operaciones.json')
const resultado = require('../static/resultados.json')
const mensajes = require('../static/mensajes.json')
const codigos = require('http-status')
const {logger} = require('./logger')
const Health = require('../models/heath')

module.exports = {
    health: ()  => {
        let health
        try {
            health = new Health(mensajes.ok.healthcheck)            
        } catch (err) {
            return logger(operaciones.healthcheck, resultado.error, codigos.INTERNAL_SERVER_ERROR , "Error en el servicio. " + err)
        }
        
        return logger(operaciones.healthcheck, resultado.ok, codigos.OK,  health.getHealth(), {})
    }
}