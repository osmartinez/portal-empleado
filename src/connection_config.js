const config =
{
    authentication: {
        options: {
            userName: 'oscar', // update me
            password: 'Oeseceaerre2' // update me
        },
        type: 'default'
    },
    server: 'portal-empleado.database.windows.net', // update me
    options:
    {
        database: 'portal_empleado', //update me
        encrypt: true,
        rowCollectionOnRequestCompletion: true,
        useColumnNames: true // For easier JSON formatting
    }
}

module.exports = config