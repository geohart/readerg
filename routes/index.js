/* Todo: 
update interface: 
	nice form, 
	digital representation of pm with edits
save workout
point to readerg.ghart.org
*/

var express 	= require('express');
var AWS 		= require('aws-sdk');
var vision 		= require('@google-cloud/vision')({
	projectId: 'ergvision-143823',
	keyFilename: './private/googleCredential.json'
});
var multer		= require('multer');
var config		= require('../private/config');
var router		= express.Router();
var func			= require('./functions');

// configure AWS
AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey});

// configure multer upload middleware
var storage	= multer.memoryStorage();
var upload		= multer({ storage: storage });

/*********** Get Views ***********/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ReadErg' });
});


/*********** GET ROUTES **************/

/* post image to aws s3 */
router.post('/upload', upload.single('pm'), function(req, res, next){
	
	console.log(req.params);
	console.log(req.file);

	var s3 = new AWS.S3({signatureVersion: 'v4'});
	
	s3.createBucket({Bucket: 'readerg'}, function() {
		
		func.getRandomString(10, function(err, code) {
			
			if (err) { return next(err); }
			
			var params = {Bucket: 'readerg', Key: code + '.jpg', Body: req.file.buffer, ACL: 'public-read'};
			
			s3.putObject(params, function(err, data) {

				if (err){
					console.log(err);
				} else {
					console.log('Successfully uploaded data to readerg/' + code + '.jpg');
					
					// once uploaded, reply with url to image
					res.send({src: 'https://s3.us-east-2.amazonaws.com/readerg/' + code + '.jpg'});
					
				}        
			});
		});
	});
});

/* process image with google vision api */
router.get('/process', function(req, res, next){
	
	var url = req.query.path;
	
	vision.detectText(url, function(err, text, apiResponse){
		
		if (err) { return next(err); }
		
		res.send({text: text, response: apiResponse});
		
	});
	
	//res.send('done');
	
});

module.exports = router;
