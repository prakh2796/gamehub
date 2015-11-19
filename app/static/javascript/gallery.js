$(document).ready(function() {

	// Initialize Masonry
	$('#content').masonry({
		columnWidth: 320,
		itemSelector: '.item',
		isFitWidth: true,
		isAnimated: !Modernizr.csstransitions
	}).imagesLoaded(function() {
		$(this).masonry('reload');
	});

});