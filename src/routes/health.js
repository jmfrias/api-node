'use strict'

const {Router} = require('express')
const router = Router()
const contHealth = require('../controller/health')

router.get('/', async(req, res) => {
    const health = contHealth.health()

    res.status(health.code).send(health)
})

module.exports = router