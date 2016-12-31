var express	= require('express');
var multer		= require('multer');
var auth 		= require('./auth');
var func			= require('./functions');
var config 		= require('../config');
var model 		= require('./model');
var AWS 		= require('aws-sdk');
var vision 		= require('@google-cloud/vision')({
	projectId: config.googleProjectID,
	credentials: {
		client_email: config.googleClientEmail,
		private_key: config.googlePrivateKey
	}
});

// configure multer upload middleware
var storage	= multer.memoryStorage();
var upload		= multer({ storage: storage });

// configure AWS
AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey});

// declare instance of express router
var router = express.Router();

/********** ROUTES *************/

/* GET workout view */
router.get('/view/:id?', auth.reroute, function(req, res, next){
	
	// get workout id
	var workoutId = null;
	if(req.params.id) {
		workoutId = req.params.id
	} else if(req.session.workoutId){
		workoutId = req.session.workoutId
	}
	
	// look for workout
	if(workoutId){
	
		// get workout
		model.Workout.findOne({ _id: workoutId }, function (err, workout) {

			if (err) { return next(err); }
			
			if(workout){
				
				console.log("STATUS:");
				console.log(req.user);
				console.log(workout.userId);
				console.log(req.user == null);
				
				// save workout id to session
				req.session.workoutId = workoutId;
				
				// check whether there is a signed-in user and whether workout has a user associated with it
				if (req.user != null && workout.userId == null){
					
					// save user id to workout
					workout.userId = req.user._id;
					workout.save(function(err, user){
						if(err) return next(err);
							console.log("WE JUST SAVED THE WORKOUT");
							// show workout page
							res.render('workout', {
								  title: 'ReadErg'
								, user: req.user
								, workout: workout
							});
					});
					
				} else {
					
					// just show workout page
					res.render('workout', {
						  title: 'ReadErg'
						, user: req.user
						, workout: workout
					});
					
				}
				
			} else {
				res.send('No matching workout found');
			}
			
		});
	} else {
		res.send('No workout ID provided');
	}
	
});

/* POST upload image to aws s3 */
router.post('/upload', upload.single('pm'), function(req, res, next){
	
	console.log('Uploading photo...');

	var s3 = new AWS.S3({signatureVersion: 'v4'});
	
	s3.createBucket({Bucket: 'readerg'}, function() {
		
		func.getRandomString(10, function(err, code) {
			
			if (err) { return next(err); }
			
			var params = {Bucket: 'readerg', Key: code + '.jpg', Body: req.file.buffer, ACL: 'public-read'};
			
			s3.putObject(params, function(err, data) {

				if (err){
					console.log(err);
				} else {
					console.log('Successfully uploaded data to https://s3.us-east-2.amazonaws.com/readerg/' + code + '.jpg');
					
					// once uploaded, reply with url to image
					res.send({src: 'https://s3.us-east-2.amazonaws.com/readerg/' + code + '.jpg'});
					
				}        
			});
		});
	});
});

/* GET process image with google vision api */
router.get('/process', function(req, res, next){
	
	console.log('Processing text...');
	
	var url = req.query.path;
	
	// call api
	vision.detectText(url, function(err, text, apiResponse){
		
		if (err) { return next(err); }
		
		console.log('Successfully processed text.');
		console.log(apiResponse);

		// process results
		
		var minx;
		var miny;
		var maxx;
		var maxy;
		
		// cycle through polygons to get benchmark locations (View and Menu)
		for(i=0; i<apiResponse.responses[0].textAnnotations.length; i++){
			if(apiResponse.responses[0].textAnnotations[i].description.toUpperCase() == "VIEW"){
				minx = apiResponse.responses[0].textAnnotations[i].boundingPoly.vertices[0].x;
				miny = apiResponse.responses[0].textAnnotations[i].boundingPoly.vertices[0].y;
			} else if (apiResponse.responses[0].textAnnotations[i].description.toUpperCase() == "MENU") {
				maxx = apiResponse.responses[0].textAnnotations[i].boundingPoly.vertices[0].x;
				maxy = apiResponse.responses[0].textAnnotations[i].boundingPoly.vertices[0].y;
			}
		}

		// retain some data
		var keep = JSON.parse('[]');
		
		// calculate each objects coordinates in percentage terms relative to view and menu objects
		for(i=0; i<apiResponse.responses[0].textAnnotations.length; i++){
			// compare y coordinate -- looking for between 25% and 32% from top
			var myy = ((apiResponse.responses[0].textAnnotations[i].boundingPoly.vertices[0].y - miny) / (maxy - miny));
			
			if(myy > 0.25 && myy < 0.32){
				// append to new json object
				keep.push(apiResponse.responses[0].textAnnotations[i]);
			}
		}
		
		// sort by x coordinate
		var sorted = keep.sort(function(a, b) {
			return parseFloat(a.boundingPoly.vertices[0].x) - parseFloat(b.boundingPoly.vertices[0].x);
		});
		
		var status = 0;
		
		// check number of objects (expecting 4)
		if (sorted.length > 4) {
			
			// note exception
			status = 1;
			
			// create an array noting whether each element should merge with its neighbor and initialize to 0
			var mergers = new Array(sorted.length);
			var merges = 0;
			
			// cycle through each polygon and compare position of x coordinate of upper left and upper right corners of sequential polygons
			for(i=0;i<(sorted.length - 1);i++){
				var leftx = sorted[i].boundingPoly.vertices[1].x; // <-- upper right corner
				var rightx = sorted[i+1].boundingPoly.vertices[0].x; // <-- upper left corner
				
				// check how close polygons are
				if((rightx - leftx) / (maxx - minx + 0.00001) < 0.01){
					// note merger with element to the right
					mergers[i] = 1;
					merges = merges + 1;
				} else {
					mergers[i] = 0;
				}
			}
			
			if(merges > 0){
				// create a new array to hold final version of content
				// var merged = new Array(sorted.length - merges);
				
				for(i=0; i<mergers.length; i++){
					j = mergers.length - 1 - i;
					
					if(mergers[j] > 0){
						sorted[j].description = sorted[j].description + sorted[j+1].description; // merge jth and j+1th entry
						sorted.splice(j + 1, 1); // delete j+1th entry
					}		
				}
			}
			
			// insert missing colons as needed
			if(sorted[0].description.indexOf(":") < 0){
				var len = sorted[0].description.length;
				sorted[0].description = sorted[0].description.substring(0, len - 4) + ":" + sorted[0].description.substring(len - 4);
			}
			
			if(sorted[2].description.indexOf(":") < 0){
				var len = sorted[2].description.length;
				sorted[2].description = sorted[2].description.substring(0, len - 4) + ":" + sorted[2].description.substring(len - 4);
			}
			
		} else if (sorted.length < 4) {
			status = 1; // some data was combined or is missing
		} else {
			status = 2; // data looks good
		}
		
		// now extract just the text
		var text = JSON.parse('[]');
		for(i=0; i<sorted.length; i++){
			text.push(sorted[i].description);
		}
		
		// save upload and processed text from vision api
		var photo = new model.Photo({
			  url: url
			, text: JSON.stringify(apiResponse)
		});
		
		photo.save(function(err, photo){
			if(err) return next(err);
			
			// return results
			result = { "status" : status, "fields" : text, "uploadId" : photo._id };
			console.log(result);
			res.send(result);
		});
	});
});

/* POST save workout */
router.post('/save', function(req, res, next){
	
	console.log('Data received...');
	
	console.log(req.body);
	
	// check for required fields and do basic error checking
	if(req.body.mytime && req.body.mydistance && req.body.mytime.trim() != "" && req.body.mydistance.trim() != ""){
		
		// convert date, time, and split into numeric formats
		var date = new Date(req.body.mydate).getTime();
		var split = req.body.mysplit.trim().split(":", 2);
		split = split[0] * 60 + split[1] * 1 
		var time = req.body.mytime.trim().split(":", 3);
		if(time.length > 2){
			time = time[0] * 60 * 60 + time[1] * 60 + time[0] * 1;
		} else {
			time = time[0] * 60 + time[1] * 1;
		}
		
		// create a new interval object
		var interval = new model.Interval({
			  distance: req.body.mydistance
			, duration: time
			, split: split
			, strokerate: req.body.mystrokerate
		});
		
		// create a new workout object
		var workout = new model.Workout({
			  uploadId: req.body.myuploadid
			, date: date
			, intervals: []
			, rest: 0
		});
		
		// append interval to workout
		workout.intervals.push(interval);
		
		// check whether a user exists
		if(req.user){
			workout.userId = req.user._id;
		}
			
		// otherwise, save workout and route to workout view -- give user an opportunity to login to claim later
		workout.save(function(err, user){
			if(err) return next(err);
			
			// route to workout view
			res.redirect('/workout/view/' + workout._id);
			
		});
		
	} else {
		res.status(400).send({'message' : 'Error. Missing values for interval time and/or distance.'});
	}
	
});

module.exports = router;