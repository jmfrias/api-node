'use strict'

const {Router} = require('express')
const router = Router()
const contPersona = require('../controller/persona')

router.get('/', async(req, res) => {    
    const persona = contPersona.consulta(req.query)
    res.status(persona.codigo).send(persona)
})

router.post('/', async(req, res) => {    
    const persona = contPersona.insert(req.body)
    res.status(persona.codigo).send(persona)
})

router.patch('/', async(req, res) => {    
    const persona = contPersona.update(req.query, req.body)
    res.status(persona.codigo).send(persona)
})

router.delete('/', async(req, res) => {    
    const persona = contPersona.delete(req.query)
    res.status(persona.codigo).send(persona)
})

module.exports = router