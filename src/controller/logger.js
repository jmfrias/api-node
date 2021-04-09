'use strict' ;

const Logger = require('../models/logger')

module.exports = {
    logger: (operacion, resultado, codigo, mensaje, datos)  => {
        const newLog = new Logger(operacion, resultado, codigo, mensaje, datos)
        return newLog.getLogger()
    }
}