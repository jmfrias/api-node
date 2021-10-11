'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const operations = require('../static/operations.json')
const results = require('../static/results.json')
const messages = require('../static/messages.json')
const codes = require('http-status')
const info = require('../static/info.json')

chai.should()
chai.use(chaiHttp)

describe('Status HealthCheck', () => {
    describe("GET /health", () => {
        it("Returns service status", (done) => {
            chai.request(server)
                .get("/health")
                .end((err, response) => {
                    response.should.have.status(codes.OK)
                    done()
                })
        })
    })
})

describe('Body HealthCheck', () => {
    describe("GET /health", () => {
        it("Returns service status", (done) => {
            chai.request(server)
                .get("/health")
                .end((err, response) => {
                    response.body.should.be.a('object')
                    done()
                })
        })
    })
})

describe('Test HealthCheck', () => {
    describe("GET /health", () => {
        it("Returns service status", (done) => {
            chai.request(server)
                .get("/health")
                .end((err, response) => {
                    response.body.should.have.property('operation').eq(operations.healthcheck)
                    response.body.should.have.property('result').eq(results.ok)
                    response.body.should.have.property('code').eq(codes.OK)
                    response.body.should.have.property('message').eq(messages.healthcheck.ok)                    
                    done()
                })
        })
    })
})

describe('Version HealthCheck', () => {
    describe("GET /health", () => {
        it("Returns service status", (done) => {
            chai.request(server)
                .get("/health")
                .end((err, response) => {
                    response.body.should.have.property('meta')
                        .and.a('object')
                        .and.have.property('version').eq('v1.0')
                    done()
                })
        })
    })
})