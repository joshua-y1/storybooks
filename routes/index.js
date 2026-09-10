const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (request, response) => {
  response.render('login', {
    layout: 'login'
  });
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, (request, response) => {
  response.render('dashboard', {
    name: request.user.firstName,
  });
})

module.exports = router