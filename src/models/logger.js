'use strict'

class Logger {
    static #info = require('../static/info.json')

    #logger = {
        "date" : new Date(new Date()-3600*1000*3).toISOString(),
        "name" : "api-node",
        "meta" : Logger.#info,
        "operation": "",
        "result": "",
        "code" : "",
        "message" : "",
        "data" : ""
    }
        
    constructor(operation, result, code, message, data) {
        this.#logger.operation = operation
        this.#logger.result = result
        this.#logger.code = code
        this.#logger.message = message
        this.#logger.data = data
    }

    getLogger() {
        console.log(JSON.stringify(this.#logger))
        return this.#logger
    }
}

module.exports = Logger