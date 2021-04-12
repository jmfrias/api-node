"use strict"

const operaciones = require('../static/operaciones.json').personas
const resultado = require('../static/resultados.json')
const codigos = require('http-status')
const validator = require('validator')
const {logger} = require('./logger')

const validarNombre = (nombre) => {
    if ( typeof nombre == "undefined" )
        return logger(operaciones.validar_datos, resultado.ok, codigos.OK, "Validacion nombre: Campo nombre vacio", {})

    if (typeof nombre != "string" )
        return logger(operaciones.validar_datos, resultado.error, codigos.BAD_REQUEST, "Validacion nombre: El nombre debe de ser un string", {})
    
    if ( ! validator.isAlpha(validator.blacklist(nombre, ' ')) || validator.isEmpty(nombre) )
        return logger(operaciones.validar_datos, resultado.error, codigos.BAD_REQUEST, "Validacion nombre: El campo nombre debe estar compuesto por letras o espacios en blanco", {})
    
    if ( validator.blacklist(nombre, ' ').length < 5 || validator.blacklist(nombre, ' ').length > 100 )
        return logger(operaciones.validar_datos, resultado.error, codigos.BAD_REQUEST, "Validacion nombre: El largo del nombre debe estar entre 5 y 100 caracteres", {})
    
    return logger(operaciones.validar_datos, resultado.ok, codigos.OK, "Validacion nombre: Campo nombre valido", {}) 
}

const validarEdad = (edad) => {
    if ( typeof edad == "undefined" )
        return logger(operaciones.validar_datos, resultado.ok, codigos.OK, "Validacion edad: Campo edad vacio", {})

    if (! validator.isNumeric(edad.toString(), {no_symbols: true}) )
        return logger(operaciones.validar_datos, resultado.error, codigos.BAD_REQUEST, "Validacion edad: La edad debe ser un numero entero", {})

    if ( ! validator.isInt(edad.toString(), {min: 1, max: 120}) )
        return logger(operaciones.validar_datos, resultado.error, codigos.BAD_REQUEST, "Validacion edad: La edad debe estar entre 1 y 120", {})
    
    return logger(operaciones.validar_datos, resultado.ok, codigos.OK, "Validacion edad: Campo edad valido", {}) 
}

module.exports = {
    validarRequest: (operacion, req_persona, tipo) => {
        let keysValidas = ["nombre", "edad"]
        let minimo = false
        let mensaje = ''

        for (let key of Object.keys(req_persona)) {
            if ( ! keysValidas.includes(key) ) {
                if ( tipo == "parametro" )
                    mensaje = "Validacion de Request - El parametro " + key + " no es valido para el request. Parametros validos: nombre y edad "
                else 
                    mensaje = "Validacion de Request - La key " + key + " no es valida para el requestBody en la operacion " + operacion + ". Keys validas: nombre y edad."

                return logger(operaciones.validar_request, resultado.error, codigos.BAD_REQUEST, mensaje, {})
            }
        }

        if ( operacion == operaciones.insertar) {
            for (let key of keysValidas) {
                if ( ! Object.keys(req_persona).includes(key) ) {
                    return logger(operaciones.validar_request, resultado.error, codigos.BAD_REQUEST, "Validacion de Request - El parametro " + key + " es requerido para la operacion " + operacion + ". ", {})
                }
            }
        }
        
        return logger(operaciones.validar_request, resultado.ok, codigos.OK, "Validacion de Request Body - Request body valido para la operacion " + operacion + ".", {})        
    },
    validarCampos: (req_persona) => {
        let validacionNombre, validacionEdad

        validacionNombre = validarNombre(req_persona.nombre)
            
        if ( validacionNombre.resultado != resultado.ok )
            return logger(operaciones.validar_datos, validacionNombre.resultado, validacionNombre.codigo, validacionNombre.mensaje, {})
        
        validacionEdad = validarEdad(req_persona.edad)

        if ( validacionEdad.resultado != resultado.ok )
            return logger(operaciones.validar_datos, validacionEdad.resultado, validacionEdad.codigo, validacionEdad.mensaje, {})
        
        return logger(operaciones.validar_datos, resultado.ok, codigos.OK, "Validacion de campos exitosa", {}) 
    }
}