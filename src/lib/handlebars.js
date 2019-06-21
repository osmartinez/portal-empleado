const timeago = require('timeago.js')
const hbsHelpers = {}

var locale = function(number, index, total_sec) {
    // number: the timeago / timein number;
    // index: the index of array below;
    // total_sec: total seconds between date to be formatted and today's date;
    return [
      ['just now', 'right now'],
      ['hace %s segundos', 'dentro de %s segundos'],
      ['hace 1 minuto', 'dentro de 1 minuto'],
      ['hace %s minutos', 'dentro de %s minutos'],
      ['hace 1 hora', 'dentro de 1 hora'],
      ['hace %s horas', 'dentro de %s horas'],
      ['hace 1 día', 'mañana'],
      ['hace %s días', 'dentro de %s días'],
      ['hace 1 semana', 'la semana que viene'],
      ['hace %s semanas', 'dentro de %s semanas'],
      ['el mes pasado', 'el mes que viene'],
      ['hace %s meses', 'dentro de %s meses'],
      ['el año pasado', 'el año que viene'],
      ['hace %s años', 'dentro de %s años']
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