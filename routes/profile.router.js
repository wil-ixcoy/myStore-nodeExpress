//esta ruta maneja la obtencion de las ordenes de compra
const express = require('express');
const passport = require('passport');


const OrderService = require('../services/order.service');

const service = new OrderService();


const router = express.Router();
//ruta para obtener todas las ordenes
router.get('/my-orders',
passport.authenticate('jwt',{session:false}),
async ( req,res,next)=>{
  try{
    //recibimos el usuario de req
    const user = req.user;
    //recibimos las ordenes y a findByUser le pasamos el id del usuario
    //que esta en el payload de sub en user
    const orders = await service.findByUser(user.sub);
    res.json(orders);
  }catch(error){
    next(error)
  }
}
);
module.exports = router
