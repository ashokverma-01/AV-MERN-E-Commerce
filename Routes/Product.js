const express = require('express');
const {
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    getProductById
    } = require('../Controllers/Product.js');


const router = express.Router();

router.post('/add-product', addProduct);
router.get('/get-product',getProduct);
router.get('/:id',getProductById);
router.put('/update-product/:id',updateProduct);
router.delete('/delete-product/:id', deleteProduct);


module.exports = router;
