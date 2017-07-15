const express = require('express');
const router = express.Router();
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

//Route to get meals page
router.get('/', authHelpers.loginRequired, function(req, res, next) {
  models.Meals.findAll({}).then(function(meals) {
    res.render('meals/index',  {
      meals: meals
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('meals/new', {
    title: 'Add A Meal'
  });
});

// puts the data from the meal form into the meal table
router.post('/', function (req, res, next) {
  models.Meals.create({
    meal_name: req.body.meal_name,
    amount: req.body.amount,
    restaurant_name: req.body.restaurant_name,
    location: req.body.location,
    review: req.body.review
  }).then(function (meals) {
    res.redirect('/meals');
  });
});

router.get('/:id/edit', function(req, res, next) {
  models.Meals.findById(req.params.id).then(function(meals) {
    res.render('meals/edit', { meals : meals });
  });
});

// deletes the meal
router.delete('/:id', function(req, res, next) {
  models.Meals.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(meals) {
    res.redirect('/meals');
  });
});

router.get('/:id', function(req, res, next) {
  models.Meals.findById(req.params.id).then(function(meals) {
    res.render('meals/show', { meals : meals });
  });
});

router.put('/:id', function(req, res, next) {
  models.Meals.update({
  meals_name:req.body.meals_name
  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/meals/');
  });
});

module.exports = router;
