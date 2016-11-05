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
				$.get( "/process", { path: response.src }, function(results) {
					
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