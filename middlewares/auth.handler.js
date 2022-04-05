const boom = require('@hapi/boom');
const config = require('../config/config')

//funcion middleware que revise el api key
function checkApiKey(req, res, next) {
  ///obtenemos la apikey del los haders, que es la api
  const apiKey = req.headers['api'];
  //si es igual a 123 que sea next
  if (apiKey === config.apiKey) {
    next();
  } else {
    //si no, que lanze un error
    next(boom.unauthorized('Invalid API key'));
  }
}

module.exports = { checkApiKey };
