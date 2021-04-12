"use strict"

const operaciones = require('../static/operaciones.json').personas
const resultado = require('../static/resultados.json')
const codigos = require('http-status')
const validator = require('validator')
const {logger} = require('./logger')

const validarNombre = (nombre) => {
    if (typeof nombre != "string" )
        return logger(operaciones.validar_datos, resultado.error, codigos.BAD_REQUEST, "Validacion nombre: El nombre debe de ser un string", {})
    
    if ( ! validator.isAlpha(validator.blacklist(nombre, ' ')) )
        return logger(operaciones.validar_datos, resultado.error, codigos.BAD_REQUEST, "Validacion nombre: El campo nombre debe estar compuesto por letras o espacios en blanco", {})
    
    if ( validator.blacklist(nombre, ' ').length < 5 || validator.blacklist(nombre, ' ').length > 100 )
        return logger(operaciones.validar_datos, resultado.error, codigos.BAD_REQUEST, "Validacion nombre: El largo del nombre debe estar entre 5 y 100 caracteres", {}) 
    
    return logger(operaciones.validar_datos, resultado.ok, codigos.OK, "Validacion nombre: Campo nombre valido", {}) 
}

const validarEdad = (edad) => {
    if (! validator.isNumeric(edad.toString(), {no_symbols: true}) )
        return logger(operaciones.validar_datos, resultado.error, codigos.BAD_REQUEST, "Validacion edad: La edad debe ser un numero entero", {})

    if ( ! validator.isInt(edad.toString(), {min: 1, max: 120}) )
        return logger(operaciones.validar_datos, resultado.error, codigos.BAD_REQUEST, "Validacion edad: La edad debe estar entre 1 y 120", {})
    
    return logger(operaciones.validar_datos, resultado.ok, codigos.OK, "Validacion edad: Campo edad valido", {}) 
}

module.exports = {
    validarRequest: (operacion, req_query, req_body) => {
        switch (operacion) {
            case operaciones.consulta:
                
                break
        }
    },
    validarCampos: (req_persona) => {
        let validacionNombre, validacionEdad

        if (req_persona.nombre) {
            validacionNombre = validarNombre(req_persona.nombre)
            
            if ( validacionNombre.resultado != resultado.ok )
                return logger(operaciones.validar_datos, validacionNombre.error, validacionNombre.codigo, validacionNombre.mensaje, {})
        }                    
        
        if (req_persona.edad) {
            validacionEdad = validarEdad(req_persona.edad)

            if ( validacionEdad.resultado != resultado.ok )
                return logger(operaciones.validar_datos, validacionEdad.error, validacionEdad.codigo, validacionEdad.mensaje, {})
        }

        return logger(operaciones.validar_datos, resultado.ok, codigos.OK, "Validacion de campos exitosa", {}) 
    }
}