const timeago = require('timeago.js')
const hbsHelpers = {}

hbsHelpers.timeAgo = (datetime)=> {
    return timeago.format(datetime,'es_ES')
}

hbsHelpers.json = (content)=>{
    return JSON.stringify(content)
}

module.exports = hbsHelpers;