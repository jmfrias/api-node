"use strict"

class Persona {
    #persona = {
        "nombre" : "",
        "edad" : ""
    }
    
    constructor(nombre, edad) {
        this.#persona.nombre = nombre
        this.#persona.edad = edad
    }
    
    setNombre(nombre) {
        this.#persona.nombre = nombre
    }

    setEdad(edad) {
        this.#persona.edad = edad
    }

    getPersona() {
        return this.#persona
    }

    getNombre() {
        return this.#persona.nombre
    }

    getEdad() {
        return this.#persona.edad
    }
}

module.exports = Persona