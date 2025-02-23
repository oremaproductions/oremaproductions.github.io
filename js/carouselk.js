$('.killCarousel').addClass('carousel-item');


function isCarouselGoing () {
	return ($('.carousel-item').length > 0) ? true : false;
}

function handleCarouselK (){ 
	//window >= sm carousel Still going -> remove class
	//window >= sm carousel not moving
	if (window.innerWidth >= 574 && isCarouselGoing()) {
		$('.killCarousel').removeClass('carousel-item');
	} else if (window.innerWidth <= 574 && !isCarouselGoing()){
		$('.killCarousel').addClass('carousel-item');
	} else {

	}
}
$(window).on('resize', handleCarouselK);
handleCarouselK();


/*
add class when: 
	- vw is < 574 && .carousel-item's == 0

removeclass when:
	- vw is >= 574 && .carousel-item's > 0 
*/
const gallery_titles = ['photoshoot', 'studio', 'graduation']; 

//switch if valid gallery title even exists && if next gallery title != title 
function __is_valid(title) {
	console.log(title);
	return (gallery_titles.indexOf(title) > -1) && (title != document.querySelector('.galleries-container.active').getAttribute('name'));
}
function hideGallery(title) {

	//remove active class from active gallery & .killCarousel
	return $('.galleries-container.active, .killCarousel').removeClass('active activated');
	
}
function showGallery(title) {
//wait 300ms and add active class to selected gallery  & selected  
	return $(`.galleries-container[name="${title}"], .killCarousel[data-gal="${title}"]`).addClass("active activated") ;
}
/*	switch gallery	*/
function switchGallery(title) {
	return __is_valid(title) && hideGallery(title) && showGallery(title);
}
/*let set onclick for killCarousels: */
$('.killCarousel').on('click', (e) => {
	console.log(e.currentTarget);
	switchGallery(e.currentTarget.dataset.gal);

});
