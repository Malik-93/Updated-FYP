const JWT = require('jsonwebtoken');
const { User } = require('../models/models');
const { JWT_SECRET } = require('../configurations');

signToken = user => {
  return JWT.sign({
    iss: 'Clothing',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { fname, lname, email, password } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ email });
    if (foundUser) { 
      return res.status(403).json({ message: 'Email is already in use'});
    }

    // Create a new user
    const newUser = new User({ fname, lname, email, password });
    await newUser.save();

    // Generate the token
    const token = signToken(newUser);

    // Respond with token
    res.status(200).json({success: true, message: 'Welcome! You are successfully sign Up', user: newUser, data: token });
  },

  signIn: async (req, res, next) => {
    const newUser = req.user
    
    if(!newUser) {
      res.json({ success: false, message: 'invalid email or password' })
    }
    // Generate token
    const token = signToken( newUser );
    console.log(token)
    // res.redirect('/cart');
    res.status(200).json({success: true, message: 'Welocome! successfully Sign In', user: req.user, data: token });
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  }
}