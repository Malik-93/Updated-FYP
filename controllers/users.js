const JWT = require('jsonwebtoken');
const { User } = require('../models/models');
const { JWT_SECRET } = require('../configurations');
const utils = require('../utils');
const reponseHandler = utils.reponseHandler;

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
      return reponseHandler(res, 403, { message: 'Email is already in use' })
    }
    // Create a new user
    const newUser = new User({ fname, lname, email, password });
    await newUser.save();
    return reponseHandler(res, 200, { success: true, message: 'Welcome! You are successfully sign Up', user: newUser })
  },

  signIn: async (req, res, next) => {
    const newUser = req.user
    if (!newUser) {
      return reponseHandler(res, 401, { success: false, message: 'invalid email or password' });
    }
    // Generate token
    const token = signToken(newUser);
    return reponseHandler(res, 200, { success: true, message: 'Welocome! successfully Sign In', id: req.user._id, user: req.user, token: token });
  },
  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  }
}