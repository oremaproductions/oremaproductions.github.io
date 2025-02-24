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
let activeCategoryTitle = document.querySelector('.galleries-container.active').getAttribute('name');

/*
add class when: 
	- vw is < 574 && .carousel-item's == 0

removeclass when:
	- vw is >= 574 && .carousel-item's > 0 
*/
const gallery_titles = {
	'photoshoot' : {'cta-header':'Your Story, Captured','cta-subtext': 'Lock in your session today', 'cta-btn-text': 'Book Your Shoot','cta-btn-link':'index.html'},
	'wedding' : {'cta-header':'Forever in Focus','cta-subtext': 'Reserve your wedding photography', 'cta-btn-text': 'Secure Your Date','cta-btn-link':'index.html'},
	'studio' : {'cta-header':'Creativity Unleashed','cta-subtext': 'Let\'s bring your vision to life', 'cta-btn-text': 'Reserve Studio Time','cta-btn-link':'index.html'},
	'graduation' : {'cta-header':'Celebrate the Milestone','cta-subtext': 'Make your graduation unforgettable', 'cta-btn-text': 'Book Your Session','cta-btn-link':'index.html'}
}
//switch if valid gallery title even exists && if next gallery title != title 
function __is_valid(title) { 
	return (gallery_titles.hasOwnProperty(title)) && (title != activeCategoryTitle) && document.querySelectorAll(`.galleries-container[name="${title}"] img`).length > 0;
}
function setCta(title) {
	if (__is_valid(title)) {
	 	document.querySelector('#gal-cta-header').innerText = gallery_titles[title]['cta-header'];
	 	document.querySelector('#gal-cta-subtext').innerText = gallery_titles[title]['cta-subtext'];
	 	document.querySelector('#gal-cta-btn').innerText = gallery_titles[title]['cta-btn-text'];
	 	document.querySelector('#gal-cta-btn').dataset.target = gallery_titles[title]['cta-btn-link'];
	 	activeCategoryTitle = title;
	 	return true;
 	}
 	
 	return false;
}
function hideGallery(title) {

	//remove active class from active gallery & .killCarousel
	return __is_valid(title) && $('.galleries-container.active, .killCarousel').removeClass('active activated');
	
}
function showGallery(title) {
//wait 300ms and add active class to selected gallery  & selected  
	
	return __is_valid(title) && $(`.galleries-container[name="${title}"], .killCarousel[data-gal="${title}"]`).addClass("active activated") && setCta(title);
}
/*	switch gallery	*/
function switchGallery(title) {
	return __is_valid(title) && hideGallery(title) && showGallery(title);
}
/*let set onclick for killCarousels: */
$('.killCarousel').on('click', (e) => {
	console.log(e.currentTarget.dataset.gal);
	let gal_title = e.currentTarget.dataset.gal;
	switchGallery(gal_title);
	setCta(gal_title);

});
