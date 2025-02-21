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



