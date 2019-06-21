globalHelpers = {}

globalHelpers.stringifyUsers = (users)=>{
    let users_str = ''
    users.forEach(user=>{
        users_str += user+","
    })
    users_str = users_str.substr(0,users_str.length-1)
    return users_str
}

module.exports = globalHelpers