const express = require('express');
const passport = require('passport');


const AuthService = require('./../services/auth.service');

const service = new AuthService();

const router = express.Router();

//uso del middleware de passport para autenticar, definimos el tipo de autenticacion
//que es local y la session false por que eso es con jwt
router.post('/login',passport.authenticate('local',{session:false}),
async ( req,res,next)=>{
  try{
    //obtener el usurio en el request
    const user = req.user;
    //respondemos con json la firma del token hecho en auth.service en el metodo signToken
    res.json(service.signToken(user));
  }catch(error){
    next(error)
  }
}
);
//enviemos correo al email
router.post('/recovery',
async ( req,res,next)=>{
  try{
    //obtenemo solo el email del body
    const {email} = req.body;
    //lo enviamos a sendRecovery para que revise que este y si essta envie un email
    //a la direccion proporcioanda y re responde en json
    const response = await service.sendRecovery(email);
    res.json(response);

  }catch(error){
    next(error)
  }
}
);
module.exports = router
