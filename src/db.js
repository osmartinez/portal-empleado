const { Connection, Request, TYPES } = require('tedious');
const connection_config = require('./connection_config')
const db = {
    connected: false,
}

db.buildParams = (params, name, type, value) => {
    params.push({
        name: name,
        type: type,
        value: value,
    })
}



db.procedure = ((query, params, callback) => {
    let connection = new Connection(connection_config);
    connection.on('error', (err) => {
        connected = false
        console.log(err)
    })

    let res = []
    let request = new Request(query, (err, row_count, rows) => {
        if (err) {
            console.log(err)
            return
        }

        connection.close()

        for (let row of rows) {
            var _item = {}
            for (let prop in row) {
                _item[prop.toString()] = row[prop.toString()].value
            }
            res.push(_item)
        }

    })

    if (params != null && params.length > 0) {
        params.forEach(param => {
            request.addParameter(param.name, param.type, param.value)
        })
    }

    request.on('requestCompleted', async (row_count, more, rows) => {
        callback(res)
    })

    connection.on('connect', (err) => {
        if (err) {
            console.error(err)
        }
        else {
            connection.callProcedure(request)
        }
        db.connected = err == null
    });

})

db.query = ((query, params, callback) => {
    if (!db.connected) {
        console.log("Todavia no se ha inicializado la conexión")
        return
    }

    let res = []
    let request = new Request(query, (err, count, rows) => {
        if (err) {
            console.log('Error');
        }
        for (let row of rows) {
            var _item = {}
            for (let prop in row) {
                _item[prop.toString()] = row[prop.toString()]['value']
            }
            res.push(_item)
        }
    });

    if (params != null && params.length > 0) {
        params.forEach(param => {
            request.addParameter(param.name, param.type, param.value)
        })
    }

    request.on('requestCompleted', () => {
        callback(res)
    })

    db.connection.execSql(request);
})

module.exports = db