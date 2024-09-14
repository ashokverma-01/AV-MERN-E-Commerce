// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ashok@123";


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use 10 as salt rounds for better security

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: req.file.path 
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '365d' });

    // Send the response with the token
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '365d' });

    // Send the response with the token
    res.status(200).json({ message: `Welcome ${user.name}`, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//get all user
exports.getUsers = async (req, res)=>{
  try{
    const users = await User.find().sort({timeTemps:-1});
    res.status(200).json(users)
  }
  catch(error){
    res.status(500).json(error.message)
  }
  
}

exports.userProfile = async (req,res)=>{
  
    res.json({user:req.user})
  
}
