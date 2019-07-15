const timeago = require('timeago.js')
const hbsHelpers = {}

var locale = function(number, index, total_sec) {
    // number: the timeago / timein number;
    // index: the index of array below;
    // total_sec: total seconds between date to be formatted and today's date;
    return [
      ['ahora', 'ahora'],
      ['hace %s segundos', 'hace %s segundos'],
      ['hace 1 minuto', 'hace 1 minuto'],
      ['hace %s minutos', 'hace %s minutos'],
      ['hace 1 hora', 'hace 1 hora'],
      ['hace %s horas', 'hace %s horas'],
      ['hace 1 día', 'ayer'],
      ['hace %s días', 'hace %s días'],
      ['hace 1 semana', 'la semana pasada'],
      ['hace %s semanas', 'hace %s semanas'],
      ['hace 1 mes', 'el mes pasado'],
      ['hace %s meses', 'hace %s meses'],
      ['hace 1 año', 'el año pasado'],
      ['hace %s años', 'hace %s años']
    ][index];
  };

  timeago.register('es_ES',locale)

hbsHelpers.timeAgo = (datetime)=> {
    return timeago.format(datetime,'es_ES')
}

hbsHelpers.json = (content)=>{
    return JSON.stringify(content)
}

module.exports = hbsHelpers;