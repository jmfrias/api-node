'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const operaciones = require('../static/operaciones.json').personas
const resultados = require('../static/resultados.json')
const mensajes = require('../static/mensajes.json').personas
const codigos = require('http-status')
const info = require('../static/info.json')

chai.should()
chai.use(chaiHttp)

describe('TEST PERSONA', () => {
    describe("GET personas", () => {
        it("Devuele todas las personas", (done) => {
            chai.request(server)
                .get("/personas")
                .end((err, response) => {
                    response.should.have.status(codigos.OK)
                    response.body.should.be.a('object')
                    response.body.should.have.property('operacion').eq(operaciones.consulta)
                    response.body.should.have.property('resultado').eq(resultados.ok)
                    response.body.should.have.property('codigo').eq(codigos.OK)
                    response.body.should.have.property('mensaje').eq(mensajes.consulta.ok)
                    response.body.should.have.property('datos').to.be.an('array')
                    done()
                })
        })
    })
    describe("POST persona", () => {
        it("Agrego una persona", (done) => {
            chai.request(server)
                .post("/personas")
                .set('content-type', 'application/json')
                .send({"nombre": "persona test", "edad" : 14})
                .end((err, response) => {
                    response.should.have.status(codigos.OK)
                    response.body.should.be.a('object')
                    response.body.should.have.property('operacion').eq(operaciones.insertar)
                    response.body.should.have.property('resultado').eq(resultados.ok)
                    response.body.should.have.property('codigo').eq(codigos.OK)
                    response.body.should.have.property('mensaje').eq(mensajes.insertar.ok)
                    response.body.should.have.property('datos').to.be.an('object')
                    done()
                })
        })
    })
    describe("UPDATE persona", () => {
        it("Actualizo una persona", (done) => {
            chai.request(server)
                .patch("/personas?nombre=persona test&edad=14")
                .set('content-type', 'application/json')
                .send({"nombre": "persona test actualizada", "edad" : 41})
                .end((err, response) => {
                    response.should.have.status(codigos.OK)
                    response.body.should.be.a('object')                    
                    response.body.should.have.property('operacion').eq(operaciones.update)
                    response.body.should.have.property('resultado').eq(resultados.ok)
                    response.body.should.have.property('codigo').eq(codigos.OK)
                    response.body.should.have.property('mensaje').eq(mensajes.update.ok)
                    response.body.should.have.property('datos').to.be.an('object')
                    done()
                })
        })
    })
    describe("DELETE persona", () => {
        it("Elimino una persona", (done) => {
            chai.request(server)
                .delete("/personas?nombre=persona test actualizada&edad=41")
                .end((err, response) => {
                    response.should.have.status(codigos.OK)
                    response.body.should.be.a('object')                    
                    response.body.should.have.property('operacion').eq(operaciones.eliminar)
                    response.body.should.have.property('resultado').eq(resultados.ok)
                    response.body.should.have.property('codigo').eq(codigos.OK)
                    response.body.should.have.property('mensaje').eq(mensajes.eliminar.ok)
                    response.body.should.have.property('datos').to.be.an('object')
                    done()
                })
        })
    })
    describe("GET persona eliminada", () => {
        it("Busco la persona eliminada", (done) => {
            chai.request(server)
                .get("/personas?nombre=persona test actualizada&edad=41")
                .end((err, response) => {
                    response.should.have.status(codigos.NOT_FOUND)
                    response.body.should.be.a('object')                    
                    response.body.should.have.property('operacion').eq(operaciones.consulta)
                    response.body.should.have.property('resultado').eq(resultados.sin_accion)
                    response.body.should.have.property('codigo').eq(codigos.NOT_FOUND)
                    response.body.should.have.property('mensaje').eq(mensajes.consulta.sin_accion)
                    response.body.should.have.property('datos').to.be.an('array')
                    done()
                })
        })
    })
})