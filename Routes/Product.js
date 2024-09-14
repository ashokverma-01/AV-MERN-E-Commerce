const multer = require('multer');
const path = require('path');
const express = require('express');
const {
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    } = require('../Controllers/Product.js');

// image upload code 
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/'); 
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + file.originalname.slice(-4);
            cb(null, uniqueSuffix);  
        }
    });   
const upload = multer({ storage: storage });


const router = express.Router();

router.post('/add-product',upload.single('image'), addProduct);
router.get('/get-product',getProduct);
router.get('/:id',getProductById);
router.put('/update-product/:id',updateProduct);
router.delete('/delete-product/:id', deleteProduct);


module.exports = router;
