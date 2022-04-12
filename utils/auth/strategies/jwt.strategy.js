//usamos strategy y extract para obtener el token desde el request
//con el uso de passport-jwt
const { Strategy, ExtractJwt } = require('passport-jwt');

/* const  config  = require('../../../config/config');
 */
//creamos opciones para la estrategia obteiendo el token desde el authHeader
//que se encuetra
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'clavesecretaparaeljsonwebtokencomono',
}
//creamos la estrategia con el payload y lanzamos done con null y el payload
const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;



