const jwt = require('jsonwebtoken');
//debe estar como variable de entorno
const secret = "mysecret";

const token = "adadfadf";


//function verifica el token
function verifyToken(token,secret){
  return jwt.verify(token,secret);
}
//recibe el token verificado, se usa el secret para verificar
const payload = verifyToken(token,secret);
console.log(payload);
