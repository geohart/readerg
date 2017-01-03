$(function() {
	
	// function to handle click away with menu open
	$(document).mouseup(function (e) {
		var container = $("div#menu");
		
		// check whether menu is visible
		if (container.css('display') != 'none') {

			// check whether click occurred outside the menu
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				container.slideUp();
				$('div#overlay').slideUp();
			}
			
		}
	
	});
	
	// function to display menu
	$('button#menu').click(function() {
		
		// check if menu is showing and hide or show accordingly
		if ($("div#menu").css('display') == 'none') {
			$('div#overlay').slideDown();
			$('div#menu').slideDown();
		} else {
			$('div#menu').slideUp();
			$('div#overlay').slideUp();
		}
		
	});
	
});