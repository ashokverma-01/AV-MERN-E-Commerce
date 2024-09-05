const jwt = require("jsonwebtoken");
const JWT_SECRET = "ashok@123";
const User = require("../Models/User"); // Adjust the path to your User model

exports.Authenticated = async (req, res, next) => {
  const token = req.header("Auth");    
  if (!token) {
    return res.status(401).json({ message: 'Please log in first' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
