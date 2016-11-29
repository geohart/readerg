var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var config	= require('../config');  
var bcrypt = require('bcrypt-nodejs');

// connect to database
mongoose.connect(config.database);

// setup a database reference variable
var db = mongoose.connection;

// handle connection errors
db.on('error', console.error.bind(console, 'connection error:'));

// handle successful connection
db.once('open', function() {
	
	// define schemas and compile into models:
	
	// photo
	var photoSchema = new mongoose.Schema();
	photoSchema.add({
		  url: String
		, text: String
	});
	var Photo = mongoose.model('photo', photoSchema);

	// interval
	var intervalSchema = new mongoose.Schema();
	intervalSchema.add({
		  distance: Number
		, duration: Number
		, split: Number
		, strokerate: Number
	});
	var Interval = mongoose.model('interval', intervalSchema);
	
	// workout
	var workoutSchema = new mongoose.Schema();
	workoutSchema.add({
		  uploadId: String
		, date: Number
		, intervals: [intervalSchema]
		, rest: Number
	});
	var Workout = mongoose.model('workout', workoutSchema);
	
	// user schema
	var userSchema = new mongoose.Schema();
	userSchema.add({
	    username: String
	  , password: String
	  , name: String
	  , gender: String
	  , dob: Number
	  , photo: String
	  , workouts: [workoutSchema]
	  , verified: Number
	  , created: Number
	});
	userSchema.pre('save', function(callback) {
		
		var user = this;

		// Break out if the password hasn't changed
		if (!user.isModified('password')) return callback();
		
		// Password changed so we need to hash it
		bcrypt.genSalt(5, function(err, salt) {
			if (err) return callback(err);

			bcrypt.hash(user.password, salt, null, function(err, hash) {
				if (err) return callback(err);

				user.password = hash;
				callback();
			});
		});
		
	});
	userSchema.methods.verifyPassword = function(password, callback) {
		bcrypt.compare(password, this.password, function(err, isMatch) {
			if (err) return callback(err);
			callback(null, isMatch);
		});
	};
	var User = mongoose.model('user', userSchema);

	exports.Photo = Photo;
	exports.User = User;
	exports.Workout = Workout;
	exports.Interval = Interval;

});
	
exports.db = db;