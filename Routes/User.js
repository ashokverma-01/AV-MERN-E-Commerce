const express = require('express');
const router = express.Router();
const {register,login,getUsers,userProfile} = require('../Controllers/User.js');
const {Authenticated} = require('../Middlewares/Auth.js')

// Route for user registration
router.post('/register',register);
router.post('/login',login);
router.get('/alluser',getUsers);
router.get('/profile',Authenticated,userProfile);


module.exports = router;
