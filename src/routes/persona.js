'use strict'

const {Router} = require('express')
const router = Router()
const contPersona = require('../controller/persona')
const operaciones = require('../static/operaciones.json').personas
const resultado = require('../static/resultados.json')
const codigos = require('http-status')
const {logger} = require('../controller/logger')

router.get('/', async(req, res) => {    
    const persona = contPersona.consulta(req.query)
    res.status(persona.codigo).send(persona)
})

router.post('/', async(req, res) => {    
    if ( Object.keys(req.body).length == 0 )
        res.status(codigos.BAD_REQUEST).send(logger(operaciones.insertar, resultado.error, codigos.BAD_REQUEST, "Validacion Request: El requestBody no puede estar vacio", {}))

    const persona = contPersona.insert(req.body)
    res.status(persona.codigo).send(persona)
})

router.patch('/', async(req, res) => {
    if ( Object.keys(req.query).length == 0 )
        res.status(codigos.BAD_REQUEST).send(logger(operaciones.update, resultado.error, codigos.BAD_REQUEST, "Validacion de Request - Se debe de ingresar al menos un parametro (nombre y/o edad) para la operacion: " + operaciones.update + ".", {}))
    
    if ( Object.keys(req.body).length == 0 )
        res.status(codigos.BAD_REQUEST).send(logger(operaciones.update, resultado.error, codigos.BAD_REQUEST, "Validacion Request: El requestBody no puede estar vacio", {}))

    const persona = contPersona.update(req.query, req.body)
    res.status(persona.codigo).send(persona)
})

router.delete('/', async(req, res) => {
    if ( Object.keys(req.query).length == 0 )
        res.status(codigos.BAD_REQUEST).send(logger(operaciones.eliminar, resultado.error, codigos.BAD_REQUEST, "Validacion de Request - Se debe de ingresar al menos un parametro (nombre y/o edad) para la operacion: " + operaciones.eliminar + ".", {}))

    const persona = contPersona.delete(req.query)
    res.status(persona.codigo).send(persona)
})

module.exports = router