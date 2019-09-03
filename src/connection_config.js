const config =
{
    authentication: {
        options: {
            userName: 'oscar_user_db', // update me
            password: '@@112233Aa' // update me
        },
        type: 'default'
    },
    server: 'somos-arneplant.database.windows.net', // update me
    options:
    {
        database: 'somos-arneplant', //update me
        encrypt: true,
        rowCollectionOnRequestCompletion: true,
        useColumnNames: true // For easier JSON formatting
    }
}

module.exports = config