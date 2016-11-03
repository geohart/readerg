$(function() {
	
	$('#uploadForm').submit(function() {
        $('#results').show();
		$('#uploader').hide();
        $(this).ajaxSubmit({
            error: function(xhr) {
				status('Error: ' + xhr.status);
            }, success: function(response) {
				$('img#result').attr('src', response.src);
				$('#loading').hide();
				$('#loaded').show();
				$('#processing').show();
                console.log(response);

				// call processing step
				$.get( "/process", { path: response.src }, function(response) {
					console.log(response);
					$('#processing').hide();
					$('#processed').show();
					$('#datatab').tab('show');
					
					return true;
					
				});
				
            }
		});
        
		return false;
    
	}); 
});

function drawBoxes(data){
	
	var sample = {"text":["Concept 2.\nView Detail\n10000m\nOct 22 2016\ntime meter 1500m 7m\n38 24.7 10000 1:55.2 20\n7:43.9 2000 1:55.9 18\n74 ,1 4000 1 56,7 19\n7:40.9 6000 155.2 20\n7:39 4 8000 1:54 21\n7:33.5 100\n1:53.3 23\nCHANGE\nCHANGE\nDISPLAY\nUNITS\nPM 3\nMENU\nBACK\n","Concept","2.","View","Detail","10000m","Oct","22","2016","time","meter","1500m","7m","38","24.7","10000","1:55.2","20","7:43.9","2000","1:55.9","18","74",",1","4000","1","56,7","19","7:40.9","6000","155.2","20","7:39","4","8000","1:54","21","7:33.5","100","1:53.3","23","CHANGE","CHANGE","DISPLAY","UNITS","PM","3","MENU","BACK"],"response":{"responses":[{"textAnnotations":[{"locale":"en","description":"Concept 2.\nView Detail\n10000m\nOct 22 2016\ntime meter 1500m 7m\n38 24.7 10000 1:55.2 20\n7:43.9 2000 1:55.9 18\n74 ,1 4000 1 56,7 19\n7:40.9 6000 155.2 20\n7:39 4 8000 1:54 21\n7:33.5 100\n1:53.3 23\nCHANGE\nCHANGE\nDISPLAY\nUNITS\nPM 3\nMENU\nBACK\n","boundingPoly":{"vertices":[{"x":456,"y":643},{"x":2743,"y":643},{"x":2743,"y":3220},{"x":456,"y":3220}]}},{"description":"Concept","boundingPoly":{"vertices":[{"x":635,"y":643},{"x":1550,"y":643},{"x":1550,"y":810},{"x":635,"y":810}]}},{"description":"2.","boundingPoly":{"vertices":[{"x":1630,"y":643},{"x":1775,"y":643},{"x":1775,"y":810},{"x":1630,"y":810}]}},{"description":"View","boundingPoly":{"vertices":[{"x":592,"y":1015},{"x":829,"y":1019},{"x":827,"y":1132},{"x":590,"y":1128}]}},{"description":"Detail","boundingPoly":{"vertices":[{"x":862,"y":1019},{"x":1128,"y":1024},{"x":1126,"y":1137},{"x":860,"y":1132}]}},{"description":"10000m","boundingPoly":{"vertices":[{"x":604,"y":1183},{"x":963,"y":1192},{"x":960,"y":1301},{"x":601,"y":1292}]}},{"description":"Oct","boundingPoly":{"vertices":[{"x":594,"y":1324},{"x":771,"y":1324},{"x":771,"y":1414},{"x":594,"y":1414}]}},{"description":"22","boundingPoly":{"vertices":[{"x":824,"y":1324},{"x":928,"y":1324},{"x":928,"y":1414},{"x":824,"y":1414}]}},{"description":"2016","boundingPoly":{"vertices":[{"x":974,"y":1324},{"x":1188,"y":1324},{"x":1188,"y":1414},{"x":974,"y":1414}]}},{"description":"time","boundingPoly":{"vertices":[{"x":836,"y":1425},{"x":1056,"y":1425},{"x":1056,"y":1545},{"x":836,"y":1545}]}},{"description":"meter","boundingPoly":{"vertices":[{"x":1132,"y":1425},{"x":1421,"y":1425},{"x":1421,"y":1545},{"x":1132,"y":1545}]}},{"description":"1500m","boundingPoly":{"vertices":[{"x":1476,"y":1425},{"x":1749,"y":1425},{"x":1749,"y":1545},{"x":1476,"y":1545}]}},{"description":"7m","boundingPoly":{"vertices":[{"x":1823,"y":1425},{"x":1952,"y":1425},{"x":1952,"y":1545},{"x":1823,"y":1545}]}},{"description":"38","boundingPoly":{"vertices":[{"x":691,"y":1590},{"x":803,"y":1590},{"x":803,"y":1682},{"x":691,"y":1682}]}},{"description":"24.7","boundingPoly":{"vertices":[{"x":813,"y":1590},{"x":1033,"y":1590},{"x":1033,"y":1682},{"x":813,"y":1682}]}},{"description":"10000","boundingPoly":{"vertices":[{"x":1132,"y":1590},{"x":1399,"y":1590},{"x":1399,"y":1682},{"x":1132,"y":1682}]}},{"description":"1:55.2","boundingPoly":{"vertices":[{"x":1460,"y":1590},{"x":1757,"y":1590},{"x":1757,"y":1682},{"x":1460,"y":1682}]}},{"description":"20","boundingPoly":{"vertices":[{"x":1834,"y":1590},{"x":1942,"y":1590},{"x":1942,"y":1682},{"x":1834,"y":1682}]}},{"description":"7:43.9","boundingPoly":{"vertices":[{"x":748,"y":1734},{"x":1035,"y":1734},{"x":1035,"y":1822},{"x":748,"y":1822}]}},{"description":"2000","boundingPoly":{"vertices":[{"x":1181,"y":1734},{"x":1399,"y":1734},{"x":1399,"y":1822},{"x":1181,"y":1822}]}},{"description":"1:55.9","boundingPoly":{"vertices":[{"x":1482,"y":1734},{"x":1759,"y":1734},{"x":1759,"y":1822},{"x":1482,"y":1822}]}},{"description":"18","boundingPoly":{"vertices":[{"x":1823,"y":1734},{"x":1945,"y":1734},{"x":1945,"y":1822},{"x":1823,"y":1822}]}},{"description":"74","boundingPoly":{"vertices":[{"x":748,"y":1854},{"x":893,"y":1854},{"x":893,"y":1942},{"x":748,"y":1942}]}},{"description":",1","boundingPoly":{"vertices":[{"x":943,"y":1854},{"x":1037,"y":1854},{"x":1037,"y":1942},{"x":943,"y":1942}]}},{"description":"4000","boundingPoly":{"vertices":[{"x":1185,"y":1856},{"x":1399,"y":1856},{"x":1399,"y":1936},{"x":1185,"y":1936}]}},{"description":"1","boundingPoly":{"vertices":[{"x":1482,"y":1854},{"x":1544,"y":1854},{"x":1544,"y":1942},{"x":1482,"y":1942}]}},{"description":"56,7","boundingPoly":{"vertices":[{"x":1563,"y":1854},{"x":1753,"y":1854},{"x":1753,"y":1942},{"x":1563,"y":1942}]}},{"description":"19","boundingPoly":{"vertices":[{"x":1842,"y":1854},{"x":1944,"y":1854},{"x":1944,"y":1942},{"x":1842,"y":1942}]}},{"description":"7:40.9","boundingPoly":{"vertices":[{"x":748,"y":1962},{"x":1039,"y":1962},{"x":1039,"y":2064},{"x":748,"y":2064}]}},{"description":"6000","boundingPoly":{"vertices":[{"x":1181,"y":1962},{"x":1401,"y":1962},{"x":1401,"y":2064},{"x":1181,"y":2064}]}},{"description":"155.2","boundingPoly":{"vertices":[{"x":1470,"y":1962},{"x":1759,"y":1962},{"x":1759,"y":2064},{"x":1470,"y":2064}]}},{"description":"20","boundingPoly":{"vertices":[{"x":1825,"y":1962},{"x":1949,"y":1962},{"x":1949,"y":2064},{"x":1825,"y":2064}]}},{"description":"7:39","boundingPoly":{"vertices":[{"x":748,"y":2094},{"x":944,"y":2094},{"x":944,"y":2188},{"x":748,"y":2188}]}},{"description":"4","boundingPoly":{"vertices":[{"x":964,"y":2094},{"x":1042,"y":2094},{"x":1042,"y":2188},{"x":964,"y":2188}]}},{"description":"8000","boundingPoly":{"vertices":[{"x":1179,"y":2094},{"x":1399,"y":2094},{"x":1399,"y":2188},{"x":1179,"y":2188}]}},{"description":"1:54","boundingPoly":{"vertices":[{"x":1466,"y":2094},{"x":1682,"y":2094},{"x":1682,"y":2188},{"x":1466,"y":2188}]}},{"description":"21","boundingPoly":{"vertices":[{"x":1834,"y":2094},{"x":1944,"y":2094},{"x":1944,"y":2188},{"x":1834,"y":2188}]}},{"description":"7:33.5","boundingPoly":{"vertices":[{"x":750,"y":2218},{"x":1036,"y":2216},{"x":1037,"y":2305},{"x":751,"y":2307}]}},{"description":"100","boundingPoly":{"vertices":[{"x":1139,"y":2218},{"x":1278,"y":2218},{"x":1278,"y":2300},{"x":1139,"y":2300}]}},{"description":"1:53.3","boundingPoly":{"vertices":[{"x":1468,"y":2212},{"x":1764,"y":2210},{"x":1765,"y":2299},{"x":1469,"y":2301}]}},{"description":"23","boundingPoly":{"vertices":[{"x":1828,"y":2210},{"x":1945,"y":2209},{"x":1946,"y":2298},{"x":1829,"y":2299}]}},{"description":"CHANGE","boundingPoly":{"vertices":[{"x":1311,"y":3004},{"x":1705,"y":3002},{"x":1705,"y":3093},{"x":1311,"y":3095}]}},{"description":"CHANGE","boundingPoly":{"vertices":[{"x":456,"y":3016},{"x":855,"y":3016},{"x":855,"y":3100},{"x":456,"y":3100}]}},{"description":"DISPLAY","boundingPoly":{"vertices":[{"x":1322,"y":3114},{"x":1699,"y":3114},{"x":1699,"y":3194},{"x":1322,"y":3194}]}},{"description":"UNITS","boundingPoly":{"vertices":[{"x":513,"y":3130},{"x":795,"y":3118},{"x":799,"y":3207},{"x":517,"y":3219}]}},{"description":"PM","boundingPoly":{"vertices":[{"x":2356,"y":692},{"x":2609,"y":692},{"x":2609,"y":798},{"x":2356,"y":798}]}},{"description":"3","boundingPoly":{"vertices":[{"x":2675,"y":692},{"x":2743,"y":692},{"x":2743,"y":798},{"x":2675,"y":798}]}},{"description":"MENU","boundingPoly":{"vertices":[{"x":2415,"y":2986},{"x":2689,"y":2974},{"x":2692,"y":3057},{"x":2419,"y":3069}]}},{"description":"BACK","boundingPoly":{"vertices":[{"x":2439,"y":3104},{"x":2682,"y":3093},{"x":2686,"y":3180},{"x":2443,"y":3191}]}}]}]}};
	
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var img = $('#testresult');
	
	context.beginPath();
	context.rect(188, 50, 200, 100);
	context.lineWidth = 7;
	context.strokeStyle = 'black';
	context.stroke();
	
}