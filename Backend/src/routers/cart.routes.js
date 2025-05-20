const {Router} = require('express');    
const router=Router();  
const {addFoodToCart,removeFoodFromCart,getCart}=require('../controllers/cart.controller');
const {authenticate}=require('../middlewares/authenticate.middleware');
router.patch('/add',authenticate,addFoodToCart);
router.patch('/remove',authenticate,removeFoodFromCart);
router.get('/get-cart',authenticate,getCart);

module.exports=router;