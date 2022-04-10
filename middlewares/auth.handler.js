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
//funcion para validar los usuarios uno por uno, poco escalable
/* function checkAdminRole(req,res,next){
  const user = req.user;
  if(user.role === 'admin'){
    next();
  }else{
    next(boom.unauthorized('You are not authorized'));
  }
} */

//funcion que valida varios roles, estos enviadios desde
//servicio en que se use, el role es sacado del payload que se tiene
//al momento de crear el token

//recibimos los roles
function checkRoles(...roles){
  //middleware que valida los roles
  return (req,res,next)=>{
    //obtenemos el role del payload que esta en req.user
    const user = req.user;

    //deja pasar a solo los rolesenviados
    if(roles.includes(user.role)){
      next();
    }else{
      //el que no este no deja pasar
      next(boom.unauthorized('You are not authorized'));
    }
  }
}

module.exports = { checkApiKey, checkRoles };
