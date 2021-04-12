"use strict"

const contPersonas = require('./controller/persona')
const app = require('./config/config')

app.listen(app.get('port'), () => {
    contPersonas.inicio()
    console.log('Server started on port ' + app.get('port'))
})

module.exports = app