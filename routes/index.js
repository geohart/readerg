var express 	= require('express');
var router		= express.Router();
var model 		= require('./model');
var auth 		= require('./auth');
var mongoose = require('mongoose');

/*********** SETUP OTHER ROUTES ***********/

router.use('/auth', require('./auth').router); // setup pathways to authentication actions (see auth.js for details)
router.use('/workout', require('./workout')); // setup pathway to workout actions (see workout.js for details)

/*********** VIEWS ***********/

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'ReadErg', user: req.user });
});

/* GET user view */
router.get('/user', auth.reroute, function(req, res, next){
	
	// check if a user exists
	if(req.user){
		
		// get workouts belonging to this user
		model.Workout.find({ userId : req.user._id }, function(err, workouts){
			
			if (err) { return next(err); }
			
			// render view
			res.render('user', { title: 'ReadErg',  user: req.user, workouts: workouts});
			
		});
		
	} else {
		// ask user to sign in
		res.redirect('/signin');
	}
	
});

/* GET signup view */
router.get('/signin', function(req, res, next){
	if(req.user){
		res.redirect(req.session.lastPath);
	} else {
		res.render('signin', {title: 'ReadErg'});
	}
});

module.exports = router;