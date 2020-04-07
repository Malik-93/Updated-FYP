const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/login')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn )

router.route('/dashboard')
.get((req, res) => {
  res.send('this is dashboard')
})
router.route('/secret')
  .get(passportJWT, UsersController.secret);

module.exports = router;