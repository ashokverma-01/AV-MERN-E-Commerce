const express = require('express');
const router = express.Router();
const {addToCart,getCartItems,removeCartItems,clearCart,decreaseProductQty} = require('../Controllers/Cart.js');
const {Authenticated} = require('../Middlewares/Auth.js')


// Route for user registration
router.post('/add',Authenticated,addToCart);
router.get('/get',Authenticated,getCartItems);
router.delete('/remove/:productId',Authenticated,removeCartItems)
router.delete('/clear',Authenticated,clearCart)
router.post('/qty',Authenticated,   decreaseProductQty)



module.exports = router;
