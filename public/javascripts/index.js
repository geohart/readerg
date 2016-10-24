$(function() {
	
	$('#uploadForm').submit(function() {
        $('#loading').show();
		$('#uploader').hide();
        $(this).ajaxSubmit({
            error: function(xhr) {
				status('Error: ' + xhr.status);
            }, success: function(response) {
				$('#status').empty().text("File uploaded successfully to <a href='" + response.src + "'>" + response.src + "</a>");
				$('img#result').attr('src', response.src).show();
				$('#loading').hide();
                console.log(response);
            }
		});
        
		return false;
    
	}); 
});

// handle form submisssion
function uploadImage(){
	
	// load spinner
	
	var data = new FormData();
	
	console.log($('#upload').attr('files'));
	/*
	$.each($('#upload')[0].files, function(i, file) {
		data.append('file-'+i, file);
	});
	
	console.log(data);
	
	$.ajax({
		url: '/upload',
		data: data,
		cache: false,
		contentType: false,
		processData: false,
		type: 'POST',
		success: function(data){
			alert(data);
		}
	});

	/*
	// create a form data object and add the files
	var files = $('#upload').attr('files');
	var data = new FormData();
	
	$.each(files, function(key, value){
		data.append(key, value);
	});
	
	console.log(files);
	console.log(data);
	*/
	
	/*
	var data = new FormData();
	$.each(files, function(key, value){
		data.append(key, value);
	});
	
	// ajax post to server
	$.post('/upload', data, function(response) {
			if(typeof response.error === 'undefined'){
				// success
				alert('hi');
			} else {
				// handle errors
				console.log('Errors: ' + response.error);
			}
			
			// stop spinner
			
	}, "json");*/
	
}
		
function setSharing(share, them) {
	// if sharing, get current position
	if(share == 1){
		updatePosition();
	}

	// ajax post to database
	$.post('/setShare', {id: '#{find._id}', code: '#{sessionCode}', share: share}, function(data) {
		// show image
		
		if (them == 0){
			if(share == 0){
				$('#momSharing').hide();
				$('#momStopped').show();
			}else{
				$('#momStopped').hide();
				$('#momSharing').show();
			}
		}else{
			if(share == 0){
				$('#totSharing').hide();
				$('#totStopped').show();
			}else{
				$('#totStopped').hide();
				$('#totSharing').show();
			}
		}

		// update map
		updateMarkers('#{find._id}', '#{sessionCode}');
	});
}