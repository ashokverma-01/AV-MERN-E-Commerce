const express = require('express');
const router = express.Router();
const {addAddress,getAddress} = require('../Controllers/Address.js');
const {Authenticated} = require('../Middlewares/Auth.js')


// Route for user registration
router.post('/add',Authenticated,addAddress);
router.get('/get',Authenticated,getAddress);

module.exports = router;
