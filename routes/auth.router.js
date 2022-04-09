const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const router = express.Router();

//uso del middleware de passport para autenticar, definimos el tipo de autenticacion
//que es local y la session false por que eso es con jwt
router.post('/login',passport.authenticate('local',{session:false}),
async ( req,res,next)=>{
  try{
    const user = req.user;
    //creamos el payload
    const payload = {
      sub: user.id,
      role: user.role
    }
    //firmamos el token y los mostramos en el res.json
    const token = jwt.sign(payload,config.jwtSecret);
    res.json({user,token})
  }catch(error){
    next(error)
  }
}
);
module.exports = router
