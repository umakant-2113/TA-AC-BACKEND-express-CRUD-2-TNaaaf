var express = require('express');
var router = express.Router();
let Article = require('../models/articleSchema');

// update the likes value

router.get('/likes/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: +1 } }, (err, articles) => {
    if (err) return next(err);
    res.redirect('/article/' + id);
  });
});

//update the dislike value
router.get('/dislikes/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: {likes: -1 } }, (err, articles) => {
    if (err) return next(err);
    res.redirect('/article/' + id);
  });
});

/* GET users listing. */
router.get('/new', (req, res, next) => {
  res.render('Articleform');
});

router.post('/new', (req, res, next) => {
  // console.log(req.body)
  Article.create(req.body, (err, articles) => {
    // console.log(err,articles)
    if (err) return next(err);
    res.redirect('/article/list');
  });
});

//list of all articles
router.get('/list', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render('titlelist', { articles });
  });
});

// display single user details
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, articles) => {
    if (err) return next(err);
    console.log(articles);
    res.render('singleuser', { articles });
  });
});

// edit and update value
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, articles) => {
    res.render('Updateform', { articles });
  });
});

// updated value
router.post('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, articles) => {
    if (err) return next(err);
    res.redirect('/article/' + id);
  });
});

// delete single data
router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndDelete(id, (err, articles) => {
    if (err) return next(err);
    res.redirect('/article/' + id);
  });
});


module.exports = router;
