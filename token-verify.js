const jwt = require('jsonwebtoken');
//debe estar como variable de entorno
const secret = "mysecret";
//se puede agregar varios valores, como el scope para permisos, el rol, etc

//En el payload no se debe guardar información sensible
const payload = {
  //como saber cual es el usuario, identificador
  sub: 1,
  //como saber cual es el rol
  role: 'customer',
};

//function que crea el token y lo retorna
function signToken(secret,payload){
  return jwt.sign(payload,secret,{
    expiresIn: '7d'
  });
}
//firmamos el token pasandole el secret y el payload para crea y token
const token = signToken(secret,payload);
console.log(token);
