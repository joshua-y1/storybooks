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

// @desc Show edit page
// @route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (request, response) => {
  try {
    const story = await Story.findOne({
      _id: request.params.id
    }).lean();

    if (!story) {
      return response.render('error/404');
    };

    if (story.user != request.user.id) {
      response.redirect('/stories');
    } else {
      response.render('stories/edit', {
          story,
      });
    };
  } catch(err) {
    console.error(err);
    return response.render('error/500');
  };
});

// @desc Update story
// @route PUT /stories/:id
router.put('/:id', ensureAuth, async (request, response) => {
  try{
    let story = await Story.findById(request.params.id).lean();

    if (!story) {
      return response.render('error/404')
    }

    if (story.user != request.user.id) {
      response.redirect('/stories');
    } else {
      story = await Story.findOneAndUpdate({ _id: request.params.id }, request.body, {
        new: true,
        runValidators: true
      });

      response.redirect('/dashboard');
    };
  } catch(err) {
    console.error(err);
    return response.render('error/500');
  };
});

// @desc Delete story
// @route DELETE /stories/:id
router.delete('/:id', ensureAuth, async (request, response) => {
  try {
    await Story.findByIdAndDelete({ _id: request.params.id });
    response.redirect('/dashboard');
  } catch(err) {
    console.error(err);
    return response.render('error/500');
  };
});


module.exports = router;