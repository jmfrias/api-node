'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const operaciones = require('../static/operaciones.json')
const resultados = require('../static/resultados.json')
const mensajes = require('../static/mensajes.json')
const codigos = require('../static/codigos.json')
const info = require('../static/info.json')

chai.should()
chai.use(chaiHttp)

describe('TEST HealthCheck', () => {
    describe("GET /health", () => {
        it("Devuele estado del servicio", (done) => {
            chai.request(server)
                .get("/health")
                .end((err, response) => {
                    response.should.have.status(codigos.ok)
                    response.body.should.be.a('object')                    
                    response.body.should.have.property('operacion').eq(operaciones.healthcheck)
                    response.body.should.have.property('resultado').eq(resultados.ok)
                    response.body.should.have.property('codigo').eq(codigos.ok)
                    response.body.should.have.property('mensaje').eq(mensajes.ok.healthcheck)
                    response.body.should.have.property('datos').should.be.a('object')
                    done()
                })
        })
    })
})