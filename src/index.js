"use strict"

const app = require('./config/config')

app.listen(app.get('port'), () => {
    console.log('Server started on port ' + app.get('port'))
})

module.exports = app