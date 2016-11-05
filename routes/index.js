/* Todo: 
update interface: 
	nice form, 
	digital representation of pm with edits
save workout
point to readerg.ghart.org
*/

var express 	= require('express');
var config		= require('../config');
var AWS 		= require('aws-sdk');
var vision 		= require('@google-cloud/vision')({
	projectId: config.googleProjectID,
	credentials: {
		client_email: config.googleClientEmail,
		private_key: config.googlePrivateKey
	}
});
var multer		= require('multer');
var router		= express.Router();
var func			= require('./functions');

// configure AWS
AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey});

// configure multer upload middleware
var storage	= multer.memoryStorage();
var upload		= multer({ storage: storage });

/*********** VIEWS ***********/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ReadErg' });
});


/*********** GET/POST ROUTES ***********/

/* post image to aws s3 */
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

/* process image with google vision api */
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

		// return results
		result = { "status" : status, "fields" : text };
		
		console.log(result);
		
		res.send(result);
		
	});
});

module.exports = router;
