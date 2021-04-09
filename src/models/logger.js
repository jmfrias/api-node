'use strict'
class Logger {
    logger = {
        "fecha" : new Date(new Date()-3600*1000*3).toISOString(),
        "nombre" : "api-node",
        "meta" : require('../static/info.json'),
        "operacion": "",
        "resultado": "",
        "codigo" : "",
        "mensaje" : "",        
        "datos" : ""
    }
        
    constructor(operacion, resultado, codigo, mensaje, datos) {
        this.logger.operacion = operacion
        this.logger.resultado = resultado
        this.logger.codigo = codigo
        this.logger.mensaje = mensaje
        this.logger.datos = datos
    }

    getLogger() {
        console.log(JSON.stringify(this.logger))
        return this.logger
    }

}

module.exports = Logger