const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Story = require('../models/Story');

// @desc Show add page
// @route GET /stories/add
router.get('/add', ensureAuth, (request, response) => {
  response.render('stories/add');
});

// @desc Process add form
// @route POST /stories
router.post('/', ensureAuth, async (request, response) => {
  try {
    request.body.user = request.user.id;
    await Story.create(request.body);
    response.redirect('/dashboard');
  } catch(err) {
    console.error(err);
    response.render('error/500');
  }
});

// @desc Show all stories
// @route GET /stories/add
router.get('/', ensureAuth, async (request, response) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' }) 
      .lean();
    response.render('stories/index', {
        stories,
    });
  } catch(err) {
    console.error(err);
    response.render('error/500');
  }
})


module.exports = router;