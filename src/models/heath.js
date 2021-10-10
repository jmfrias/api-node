'use strict'

class Health {
    mensaje = ''

    constructor(msj) {        
        this.mensaje = msj
    }

    getHealth() {
        return this.mensaje
    }
}

module.exports = Health