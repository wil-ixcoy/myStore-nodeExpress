const express = require('express');
const passport = require('passport')

const router = express.Router();

//uso del middleware de passport para autenticar, definimos el tipo de autenticacion
//que es local y la session false por que eso es con jwt
router.post('/login',passport.authenticate('local',{session:false}),
async ( req,res,next)=>{
  try{
    res.json(req.user)
  }catch(error){
    next(error)
  }
}
);
module.exports = router
