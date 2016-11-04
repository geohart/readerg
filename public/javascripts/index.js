$(function() {
	
	$('#uploadForm').submit(function() {
		
        $('h4#currentStatus').html('Uploading image...');
		$('#status').show();
		$('#uploader').hide();
		
        $(this).ajaxSubmit({
            error: function(xhr) {
				status('Error: ' + xhr.status);
            }, success: function(response) {
				$('h4#currentStatus').html('Processing text...');
				$('img#result').attr('src', response.src);

                console.log(response);

				// call processing step
				$.get( "/process", { path: response.src }, function(response) {
					
					var results = extractData(response);
					
					// get today's date
					var date = new Date();
					var day = date.getDate();
					var month = date.getMonth() + 1;
					var year = date.getFullYear();
					var mydate = month + '/' + day + '/' + year;	
					
					// populate fields
					$('#mydate').val(mydate);
					$('#mytime').val(results.fields[0]);
					$('#mydistance').val(results.fields[1]);
					$('#mysplit').val(results.fields[2]);
					$('#mystrokerate').val(results.fields[3]);
					
					// display alert message as needed
					if(results.status == 0){
						$('#messageTitle').html("Error: ");
						$('span#message').html("Sorry, something went wrong - try again.")
						$('div#alert').show();
					} else if(results.status == 1){
						$('#messageTitle').html("Heads Up: ");
						$('span#message').html("We might have made a mistake - check that the results match the photo you uploaded before saving.")
						$('div#alert').show();
					} else {
						$('div#alert').hide();
					}
					
					$('#status').hide();
					$('#results').show();
					
					console.log(results);
					
					return true;
					
				});
				
            }
		});
        
		return false;
    
	}); 
});

function extractData(data){
	
	/*var sample = {"text":["Concept 2.\nView Detail\n10000m\nOct 22 2016\ntime meter 1500m 7m\n38 24.7 10000 1:55.2 20\n7:43.9 2000 1:55.9 18\n74 ,1 4000 1 56,7 19\n7:40.9 6000 155.2 20\n7:39 4 8000 1:54 21\n7:33.5 100\n1:53.3 23\nCHANGE\nCHANGE\nDISPLAY\nUNITS\nPM 3\nMENU\nBACK\n","Concept","2.","View","Detail","10000m","Oct","22","2016","time","meter","1500m","7m","38","24.7","10000","1:55.2","20","7:43.9","2000","1:55.9","18","74",",1","4000","1","56,7","19","7:40.9","6000","155.2","20","7:39","4","8000","1:54","21","7:33.5","100","1:53.3","23","CHANGE","CHANGE","DISPLAY","UNITS","PM","3","MENU","BACK"],"response":{"responses":[{"textAnnotations":[{"locale":"en","description":"Concept 2.\nView Detail\n10000m\nOct 22 2016\ntime meter 1500m 7m\n38 24.7 10000 1:55.2 20\n7:43.9 2000 1:55.9 18\n74 ,1 4000 1 56,7 19\n7:40.9 6000 155.2 20\n7:39 4 8000 1:54 21\n7:33.5 100\n1:53.3 23\nCHANGE\nCHANGE\nDISPLAY\nUNITS\nPM 3\nMENU\nBACK\n","boundingPoly":{"vertices":[{"x":456,"y":643},{"x":2743,"y":643},{"x":2743,"y":3220},{"x":456,"y":3220}]}},{"description":"Concept","boundingPoly":{"vertices":[{"x":635,"y":643},{"x":1550,"y":643},{"x":1550,"y":810},{"x":635,"y":810}]}},{"description":"2.","boundingPoly":{"vertices":[{"x":1630,"y":643},{"x":1775,"y":643},{"x":1775,"y":810},{"x":1630,"y":810}]}},{"description":"View","boundingPoly":{"vertices":[{"x":592,"y":1015},{"x":829,"y":1019},{"x":827,"y":1132},{"x":590,"y":1128}]}},{"description":"Detail","boundingPoly":{"vertices":[{"x":862,"y":1019},{"x":1128,"y":1024},{"x":1126,"y":1137},{"x":860,"y":1132}]}},{"description":"10000m","boundingPoly":{"vertices":[{"x":604,"y":1183},{"x":963,"y":1192},{"x":960,"y":1301},{"x":601,"y":1292}]}},{"description":"Oct","boundingPoly":{"vertices":[{"x":594,"y":1324},{"x":771,"y":1324},{"x":771,"y":1414},{"x":594,"y":1414}]}},{"description":"22","boundingPoly":{"vertices":[{"x":824,"y":1324},{"x":928,"y":1324},{"x":928,"y":1414},{"x":824,"y":1414}]}},{"description":"2016","boundingPoly":{"vertices":[{"x":974,"y":1324},{"x":1188,"y":1324},{"x":1188,"y":1414},{"x":974,"y":1414}]}},{"description":"time","boundingPoly":{"vertices":[{"x":836,"y":1425},{"x":1056,"y":1425},{"x":1056,"y":1545},{"x":836,"y":1545}]}},{"description":"meter","boundingPoly":{"vertices":[{"x":1132,"y":1425},{"x":1421,"y":1425},{"x":1421,"y":1545},{"x":1132,"y":1545}]}},{"description":"1500m","boundingPoly":{"vertices":[{"x":1476,"y":1425},{"x":1749,"y":1425},{"x":1749,"y":1545},{"x":1476,"y":1545}]}},{"description":"7m","boundingPoly":{"vertices":[{"x":1823,"y":1425},{"x":1952,"y":1425},{"x":1952,"y":1545},{"x":1823,"y":1545}]}},{"description":"38","boundingPoly":{"vertices":[{"x":691,"y":1590},{"x":803,"y":1590},{"x":803,"y":1682},{"x":691,"y":1682}]}},{"description":"24.7","boundingPoly":{"vertices":[{"x":813,"y":1590},{"x":1033,"y":1590},{"x":1033,"y":1682},{"x":813,"y":1682}]}},{"description":"10000","boundingPoly":{"vertices":[{"x":1132,"y":1590},{"x":1399,"y":1590},{"x":1399,"y":1682},{"x":1132,"y":1682}]}},{"description":"1:55.2","boundingPoly":{"vertices":[{"x":1460,"y":1590},{"x":1757,"y":1590},{"x":1757,"y":1682},{"x":1460,"y":1682}]}},{"description":"20","boundingPoly":{"vertices":[{"x":1834,"y":1590},{"x":1942,"y":1590},{"x":1942,"y":1682},{"x":1834,"y":1682}]}},{"description":"7:43.9","boundingPoly":{"vertices":[{"x":748,"y":1734},{"x":1035,"y":1734},{"x":1035,"y":1822},{"x":748,"y":1822}]}},{"description":"2000","boundingPoly":{"vertices":[{"x":1181,"y":1734},{"x":1399,"y":1734},{"x":1399,"y":1822},{"x":1181,"y":1822}]}},{"description":"1:55.9","boundingPoly":{"vertices":[{"x":1482,"y":1734},{"x":1759,"y":1734},{"x":1759,"y":1822},{"x":1482,"y":1822}]}},{"description":"18","boundingPoly":{"vertices":[{"x":1823,"y":1734},{"x":1945,"y":1734},{"x":1945,"y":1822},{"x":1823,"y":1822}]}},{"description":"74","boundingPoly":{"vertices":[{"x":748,"y":1854},{"x":893,"y":1854},{"x":893,"y":1942},{"x":748,"y":1942}]}},{"description":",1","boundingPoly":{"vertices":[{"x":943,"y":1854},{"x":1037,"y":1854},{"x":1037,"y":1942},{"x":943,"y":1942}]}},{"description":"4000","boundingPoly":{"vertices":[{"x":1185,"y":1856},{"x":1399,"y":1856},{"x":1399,"y":1936},{"x":1185,"y":1936}]}},{"description":"1","boundingPoly":{"vertices":[{"x":1482,"y":1854},{"x":1544,"y":1854},{"x":1544,"y":1942},{"x":1482,"y":1942}]}},{"description":"56,7","boundingPoly":{"vertices":[{"x":1563,"y":1854},{"x":1753,"y":1854},{"x":1753,"y":1942},{"x":1563,"y":1942}]}},{"description":"19","boundingPoly":{"vertices":[{"x":1842,"y":1854},{"x":1944,"y":1854},{"x":1944,"y":1942},{"x":1842,"y":1942}]}},{"description":"7:40.9","boundingPoly":{"vertices":[{"x":748,"y":1962},{"x":1039,"y":1962},{"x":1039,"y":2064},{"x":748,"y":2064}]}},{"description":"6000","boundingPoly":{"vertices":[{"x":1181,"y":1962},{"x":1401,"y":1962},{"x":1401,"y":2064},{"x":1181,"y":2064}]}},{"description":"155.2","boundingPoly":{"vertices":[{"x":1470,"y":1962},{"x":1759,"y":1962},{"x":1759,"y":2064},{"x":1470,"y":2064}]}},{"description":"20","boundingPoly":{"vertices":[{"x":1825,"y":1962},{"x":1949,"y":1962},{"x":1949,"y":2064},{"x":1825,"y":2064}]}},{"description":"7:39","boundingPoly":{"vertices":[{"x":748,"y":2094},{"x":944,"y":2094},{"x":944,"y":2188},{"x":748,"y":2188}]}},{"description":"4","boundingPoly":{"vertices":[{"x":964,"y":2094},{"x":1042,"y":2094},{"x":1042,"y":2188},{"x":964,"y":2188}]}},{"description":"8000","boundingPoly":{"vertices":[{"x":1179,"y":2094},{"x":1399,"y":2094},{"x":1399,"y":2188},{"x":1179,"y":2188}]}},{"description":"1:54","boundingPoly":{"vertices":[{"x":1466,"y":2094},{"x":1682,"y":2094},{"x":1682,"y":2188},{"x":1466,"y":2188}]}},{"description":"21","boundingPoly":{"vertices":[{"x":1834,"y":2094},{"x":1944,"y":2094},{"x":1944,"y":2188},{"x":1834,"y":2188}]}},{"description":"7:33.5","boundingPoly":{"vertices":[{"x":750,"y":2218},{"x":1036,"y":2216},{"x":1037,"y":2305},{"x":751,"y":2307}]}},{"description":"100","boundingPoly":{"vertices":[{"x":1139,"y":2218},{"x":1278,"y":2218},{"x":1278,"y":2300},{"x":1139,"y":2300}]}},{"description":"1:53.3","boundingPoly":{"vertices":[{"x":1468,"y":2212},{"x":1764,"y":2210},{"x":1765,"y":2299},{"x":1469,"y":2301}]}},{"description":"23","boundingPoly":{"vertices":[{"x":1828,"y":2210},{"x":1945,"y":2209},{"x":1946,"y":2298},{"x":1829,"y":2299}]}},{"description":"CHANGE","boundingPoly":{"vertices":[{"x":1311,"y":3004},{"x":1705,"y":3002},{"x":1705,"y":3093},{"x":1311,"y":3095}]}},{"description":"CHANGE","boundingPoly":{"vertices":[{"x":456,"y":3016},{"x":855,"y":3016},{"x":855,"y":3100},{"x":456,"y":3100}]}},{"description":"DISPLAY","boundingPoly":{"vertices":[{"x":1322,"y":3114},{"x":1699,"y":3114},{"x":1699,"y":3194},{"x":1322,"y":3194}]}},{"description":"UNITS","boundingPoly":{"vertices":[{"x":513,"y":3130},{"x":795,"y":3118},{"x":799,"y":3207},{"x":517,"y":3219}]}},{"description":"PM","boundingPoly":{"vertices":[{"x":2356,"y":692},{"x":2609,"y":692},{"x":2609,"y":798},{"x":2356,"y":798}]}},{"description":"3","boundingPoly":{"vertices":[{"x":2675,"y":692},{"x":2743,"y":692},{"x":2743,"y":798},{"x":2675,"y":798}]}},{"description":"MENU","boundingPoly":{"vertices":[{"x":2415,"y":2986},{"x":2689,"y":2974},{"x":2692,"y":3057},{"x":2419,"y":3069}]}},{"description":"BACK","boundingPoly":{"vertices":[{"x":2439,"y":3104},{"x":2682,"y":3093},{"x":2686,"y":3180},{"x":2443,"y":3191}]}}]}]}};*/
	
	var minx;
	var miny;
	var maxx;
	var maxy;
	
	// cycle through polygons to get benchmark locations (View and Menu)
	$.each(data.response.responses[0].textAnnotations, function(index, object){
		if(object.description.toUpperCase() == "VIEW"){
			minx = object.boundingPoly.vertices[0].x;
			miny = object.boundingPoly.vertices[0].y;
		} else if (object.description.toUpperCase() == "MENU") {
			maxx = object.boundingPoly.vertices[0].x;
			maxy = object.boundingPoly.vertices[0].y;
		}
	});

	// retain some data
	var keep = JSON.parse('[]');
	
	// calculate each objects coordinates in percentage terms relative to view and menu objects
	$.each(data.response.responses[0].textAnnotations, function(index, object){
		// compare y coordinate -- looking for between 25% and 32% from top
		var myy = ((object.boundingPoly.vertices[0].y - miny) / (maxy - miny));
		
		if(myy > 0.25 && myy < 0.32){
			// append to new json object
			keep.push(object);
		}
	});
	
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
	$.each(sorted, function(index, object){
		text.push(object.description);
	});

	// return results
	result = { "status" : status, "fields" : text };
	
	console.log(result);
	
	return result;
	
}