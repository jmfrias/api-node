"use strict"

const Persona = require('../models/Persona')
const operaciones = require('../static/operaciones.json').personas
const resultado = require('../static/resultados.json')
const mensajes = require('../static/mensajes.json').personas
const codigos = require('http-status')
const {logger} = require('./logger')
const archivoPersonas = require('../templates/personas.json')
const validaciones = require('./validaciones')

var listadoGeneralPersonas = []

const buscarPersona = (req_persona) => {
    let personasEncontradas = []

    if ( typeof req_persona.nombre == 'undefined' && typeof req_persona.edad == 'undefined' ) {
        for (let item in listadoGeneralPersonas) {
            let persona = listadoGeneralPersonas[item]
            personasEncontradas.push(persona.getPersona())
        }
    } else if ( typeof req_persona.nombre != 'undefined' && typeof req_persona.edad == 'undefined' ) {
        for (let item in listadoGeneralPersonas) {
            let persona = listadoGeneralPersonas[item]
            
            if ( persona.getNombre().includes(req_persona.nombre) )
                personasEncontradas.push(persona.getPersona())
        }
    } else if ( typeof req_persona.nombre == 'undefined' && typeof req_persona.edad != 'undefined' ) {
        for (let item in listadoGeneralPersonas) {
            let persona = listadoGeneralPersonas[item]
            
            if ( persona.getEdad() == req_persona.edad )
                personasEncontradas.push(persona.getPersona())
        }
    } else {
        for (let item in listadoGeneralPersonas) {
            let persona = listadoGeneralPersonas[item]
            
            if ( persona.getNombre().includes(req_persona.nombre) && persona.getEdad() == req_persona.edad )
                personasEncontradas.push(persona.getPersona())
        }
    }

    if (personasEncontradas.length > 0 )
        return logger(operaciones.buscar, resultado.ok, codigos.OK, mensajes.consulta.ok, personasEncontradas)
    else
        return logger(operaciones.buscar, resultado.sin_accion, codigos.NOT_FOUND, mensajes.consulta.sin_accion, personasEncontradas)
}

const buscarPosicionPersona = (req_persona) => {    
    let personasEncontradas = [] 

    if ( typeof req_persona.nombre == 'undefined' && typeof req_persona.edad == 'undefined' ) {
        return logger(operaciones.buscar_posicion, resultado.error, codigos.CONFLICT, mensajes.buscar_posicion.error, posicion)
    } else if ( typeof req_persona.nombre != 'undefined' && typeof req_persona.edad == 'undefined' ) {
        for (let item in listadoGeneralPersonas) {
            let persona = listadoGeneralPersonas[item]
            
            if ( persona.getNombre().includes(req_persona.nombre) ) {
                personasEncontradas.push({
                    ...persona.getPersona(),
                    "posicion" : item
                })
                
                if ( personasEncontradas.length > 1 )
                    return logger(operaciones.buscar_posicion, resultado.error, codigos.CONFLICT, mensajes.buscar_posicion.error, personasEncontradas)
            }
        }
    } else if ( typeof req_persona.nombre == 'undefined' && typeof req_persona.edad != 'undefined' ) {
        for (let item in listadoGeneralPersonas) {
            let persona = listadoGeneralPersonas[item]
            
            if ( persona.getEdad() == req_persona.edad ) {
                personasEncontradas.push({
                    ...persona.getPersona(),
                    "posicion" : item
                })
                
                if ( personasEncontradas.length > 1 )
                    return logger(operaciones.buscar_posicion, resultado.error, codigos.CONFLICT, mensajes.buscar_posicion.error, personasEncontradas)
            }
        }
    } else {
        for (let item in listadoGeneralPersonas) {
            let persona = listadoGeneralPersonas[item]
            
            if ( persona.getNombre().includes(req_persona.nombre) && persona.getEdad() == req_persona.edad ) {
                personasEncontradas.push({
                    ...persona.getPersona(),
                    "posicion" : item
                })
                
                if ( personasEncontradas.length > 1 )
                    return logger(operaciones.buscar_posicion, resultado.error, codigos.CONFLICT, mensajes.buscar_posicion.error, personasEncontradas)
            }
        }
    }

    if ( personasEncontradas.length == 1 )
        return logger(operaciones.buscar_posicion, resultado.ok, codigos.OK, mensajes.buscar_posicion.ok, personasEncontradas)
    else
        return logger(operaciones.buscar_posicion, resultado.sin_accion, codigos.NOT_FOUND, mensajes.buscar_posicion.sin_accion, personasEncontradas)
}

const consultaPersonas = (req_persona) => {     
    if ( listadoGeneralPersonas.length > 0 ) {
        const busquedaPersona = buscarPersona(req_persona)
        return logger(operaciones.consulta, busquedaPersona.resultado, busquedaPersona.codigo, busquedaPersona.mensaje, busquedaPersona.datos)
    } else
        return logger(operaciones.consulta, resultado.sin_accion, codigos.NOT_FOUND, mensajes.consulta.sin_accion, {})
}

const insertarPersona = (req_persona) => {
    let busquedaPersona = buscarPersona(req_persona)

    if (busquedaPersona.resultado == resultado.sin_accion) {
        listadoGeneralPersonas.push(new Persona(req_persona.nombre, req_persona.edad))

        busquedaPersona = buscarPersona(req_persona)

        if (busquedaPersona.resultado == resultado.sin_accion)
            return logger(operaciones.insertar, busquedaPersona.resultado, codigos.SERVICE_UNAVAILABLE, mensajes.insertar.error, {})
        else 
            return logger(operaciones.insertar, resultado.ok, codigos.OK, mensajes.insertar.ok, {})
        
    } else
        return logger(operaciones.insertar, resultado.sin_accion, codigos.CONFLICT, mensajes.insertar.sin_accion, {})
}

const eliminarPersona = (req_persona) => {     
    if ( listadoGeneralPersonas.length > 0 ) {
        let busquedaPersona = buscarPosicionPersona(req_persona)

        if (busquedaPersona.resultado == resultado.ok) {
            listadoGeneralPersonas.splice(busquedaPersona.datos[0].posicion, 1)
            busquedaPersona = buscarPersona(req_persona)

            if (busquedaPersona.resultado == resultado.sin_accion)
                return logger(operaciones.eliminar, resultado.ok, codigos.OK, mensajes.eliminar.ok, {})
            else
                return logger(operaciones.eliminar, resultado.error, codigos.SERVICE_UNAVAILABLE, mensajes.eliminar.error, {})
            
        } else
            return logger(operaciones.eliminar, busquedaPersona.resultado, busquedaPersona.codigo, busquedaPersona.mensaje, {})
    } else
        return logger(operaciones.eliminar, resultado.sin_accion, codigos.NOT_FOUND, mensajes.eliminar.sin_accion, {})
}

const actualizarPersona = (req_persona, nuevos_datos) => {
    if ( listadoGeneralPersonas.length > 0 ) {
        let busquedaPersona = buscarPosicionPersona(req_persona)

        if (busquedaPersona.resultado == resultado.ok) {
            let posicion = busquedaPersona.datos[0].posicion

            if ( typeof nuevos_datos.nombre != 'undefined')
                listadoGeneralPersonas[posicion].setNombre(nuevos_datos.nombre)
            
            if ( typeof nuevos_datos.edad != 'undefined' )
                listadoGeneralPersonas[posicion].setEdad(nuevos_datos.edad)

            busquedaPersona = buscarPersona(nuevos_datos)

            if (busquedaPersona.resultado == resultado.sin_accion)
                return logger(operaciones.update, resultado.error, codigos.SERVICE_UNAVAILABLE, mensajes.update.error, {})
            else 
                return logger(operaciones.update, resultado.ok, codigos.OK, mensajes.update.ok, {})
        } else
            return logger(operaciones.update, resultado.sin_accion, busquedaPersona.codigo, busquedaPersona.mensaje, {})
    } else
        return logger(operaciones.update, resultado.sin_accion, codigos.NOT_FOUND, mensajes.update.sin_accion, {})
}

module.exports = {
    inicio: () => {
        for (let item in archivoPersonas) {
            let persona = archivoPersonas[item]            
            listadoGeneralPersonas.push(new Persona(persona.nombre, persona.edad))
        }

        return logger(operaciones.inicio, resultado.ok, codigos.OK, mensajes.inicio.ok, {})
    },
    consulta: (req_query) => {
        let validacionRequest = validaciones.validarRequest(operaciones.consulta, req_query, "parametro")

        if ( validacionRequest.resultado != resultado.ok )
            return logger(operaciones.consulta, validacionRequest.resultado, validacionRequest.codigo, validacionRequest.mensaje, {})

        const {nombre, edad} = req_query
        let req_persona = {}

        if (typeof nombre != undefined)
            req_persona['nombre'] = nombre            
        
        if (typeof edad != undefined) 
            req_persona['edad'] = edad

        let validacionCampos = validaciones.validarCampos(req_persona)

        if ( validacionCampos.resultado != resultado.ok )
            return logger(operaciones.consulta, validacionCampos.resultado, validacionCampos.codigo, validacionCampos.mensaje, {})
        else
            return consultaPersonas(req_persona)
    },
    insert: (req_body) => {        
        let validacionRequest = validaciones.validarRequest(operaciones.insertar, req_body, "body")

        if ( validacionRequest.resultado != resultado.ok )
            return logger(operaciones.insertar, validacionRequest.resultado, validacionRequest.codigo, validacionRequest.mensaje, {})

        const {nombre, edad} = req_body
        let req_persona = {
            "nombre" : nombre,
            "edad" : edad
        }

        let validacionCampos = validaciones.validarCampos(req_persona)

        if ( validacionCampos.resultado != resultado.ok )
            return logger(operaciones.insertar, validacionCampos.resultado, validacionCampos.codigo, validacionCampos.mensaje, {})
        else
            return insertarPersona(req_persona)
    },
    update: (req_query, req_body) => {
        let validacionRequest = validaciones.validarRequest(operaciones.update, req_query, "parametro")

        if ( validacionRequest.resultado != resultado.ok )
            return logger(operaciones.update, validacionRequest.resultado, validacionRequest.codigo, validacionRequest.mensaje, {})

        validacionRequest = validaciones.validarRequest(operaciones.update, req_body, "body")

        if ( validacionRequest.resultado != resultado.ok )
            return logger(operaciones.update, validacionRequest.resultado, validacionRequest.codigo, validacionRequest.mensaje, {})

        let {nombre, edad} = req_query
        let req_persona = {}

        if (typeof nombre != undefined) 
            req_persona['nombre'] = nombre
        
        if (typeof edad != undefined) 
            req_persona['edad'] = edad

        let validacionCampos = validaciones.validarCampos(req_persona)

        if ( validacionCampos.resultado != resultado.ok )
            return logger(operaciones.update, validacionCampos.resultado, validacionCampos.codigo, validacionCampos.mensaje, {})
        
        let nuevos_datos = {}

        if (typeof req_body["nombre"] != undefined) 
            nuevos_datos['nombre'] = req_body["nombre"]
        
        if (typeof req_body["edad"] != undefined) 
            nuevos_datos['edad'] = req_body["edad"]

        validacionCampos = validaciones.validarCampos(nuevos_datos)

        if ( validacionCampos.resultado != resultado.ok )
            return logger(operaciones.update, validacionCampos.resultado, validacionCampos.codigo, validacionCampos.mensaje, {})

        return actualizarPersona(req_persona, nuevos_datos)
    },
    delete: (req_query) => {
        let validacionRequest = validaciones.validarRequest(operaciones.eliminar, req_query, "parametro")

        if ( validacionRequest.resultado != resultado.ok )
            return logger(operaciones.eliminar, validacionRequest.resultado, validacionRequest.codigo, validacionRequest.mensaje, {})

        const {nombre, edad} = req_query
        let req_persona = {}

        if (typeof nombre != undefined) 
            req_persona['nombre'] = nombre
        
        if (typeof edad != undefined) 
            req_persona['edad'] = edad

        let validacionCampos = validaciones.validarCampos(req_persona)

        if ( validacionCampos.resultado != resultado.ok )
            return logger(operaciones.eliminar, validacionCampos.resultado, validacionCampos.codigo, validacionCampos.mensaje, {})
        else
            return eliminarPersona(req_persona)
    }
}