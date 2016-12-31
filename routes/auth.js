var express	= require('express');
var passport 	= require('passport');
var model 		= require('./model');
var config		= require('../config');

// declare instance of express router
var router = express.Router();

/********* ROUTES ***********/

// authentication with Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// authentication with google call back
router.get('/google/callback/', passport.authenticate('google', {  
	successRedirect: '/auth/success',
	failureRedirect: '/',
}));

/* Handle log out */
router.get('/logout', function(req, res, next){
	req.logout();
	req.session.lastPath = null;
	res.redirect('/');
});

/* Handle post-authentication event */
router.get('/success', function(req, res, next){
	if(req.session.lastPath){
		res.redirect(req.session.lastPath);
	} else {
		res.redirect('/');
	}
});

/********* MIDDLEWARE FUNCTION TO HANDLE POST-LOGIN REROUTING ***********/

reroute = function(req, res, next){
	req.session.lastPath = req.originalUrl;
	console.log(req.session);
	next();
};

/********* AUTH CONFIG *********/

var googleAuth = {
	clientID: config.authGoogleClientId,
	clientSecret: config.authGoogleSecret,
	callbackURL: config.authGoogleCallback
}

var facebookAuth = {
	clientID: 'YOUR-FB-CLIENT-ID',
	clientSecret: 'YOUR-FB-CLIENT-SECRET',
	callbackURL: 'http://localhost:3000/auth/facebook/callback'
}

var twitterAuth = {
	consumerKey: 'YOUR-TWITTER-CONSUMER-KEY',
	consumerSecret: 'YOUR-TWITTER-CONSUMER-SECRET',
	callbackURL: 'http://localhost:3000/auth/twitter/callback'
}

/*var authCallback = {
	login: 'http://localhost:5000',
	claim: ''
}*/

/********* EXPORTS *********/

exports.reroute = reroute;
exports.googleAuth = googleAuth;
exports.router = router;