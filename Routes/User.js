const express = require('express');
const multer = require('multer')
const router = express.Router();
const {register,login,getUsers,userProfile} = require('../Controllers/User.js');
const {Authenticated} = require('../Middlewares/Auth.js')


// image upload code 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'user/'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + file.originalname.slice(-4);
        cb(null, uniqueSuffix);  
    }
});   
const upload = multer({ storage: storage });

// Route for user registration
router.post('/register',upload.single('image'),register);
router.post('/login',login);
router.get('/alluser',getUsers);
router.get('/profile',Authenticated,userProfile);


module.exports = router;
