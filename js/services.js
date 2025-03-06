let params = new URLSearchParams(document.location.search);
let service_id = params.get('service');
const services = {
	'service1' : {
		'cover_img' : 'imgs/orema11.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'alias' : 'Photoshoot',
		'price' : '$120 / hr',
		'payment_link' : ''
	}, 
	'service2' : {
		'cover_img' : 'imgs/orema13.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'alias' : 'Studio',
		'price' : '$200 / hr',
		'payment_link' : ''
	}, 
	'service3' : {
		'cover_img' : 'imgs/orema9.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'alias' : 'Grad Photos',
		'price' : '$70 / hr',
		'payment_link' : ''
	}, 
	'service4' : {
		'cover_img' : 'imgs/orema3.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'alias' : 'Weddings',
		'price' : '$300 / hr',
		'payment_link' : ''
	}, 
	'service5' : {
		'cover_img' : 'imgs/orema16.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'alias' : 'Photoshoot',
		'price' : '$120 / hr',
		'payment_link' : ''
	}
}



function is_valid_service(){
	return service_id != null && services.hasOwnProperty(service_id);
}
function get_service_data(service_id) {
	return (is_valid_service() && services[service_id]) || services['service1'];
}
function update_service(service_id) {
	let service = get_service_data(service_id);
	document.querySelector('#coverImg').setAttribute('src', service['cover_img']);
	document.querySelector('#service_description').innerText = service['description'];
	document.querySelector('#service').value = service['alias'];
	document.querySelectorAll('span[name=service_alias]').forEach((ele, index) => { ele.innerText = service['alias']});
	document.querySelectorAll('p[name=service_price]').forEach((ele, index) => { ele.innerText = service['price']});
	
	let active_service_id = (is_valid_service(service_id)) ? service_id: "service1";
	populate_other_services(active_service_id); 
	return true;

}
//List all services 
/*<div class="col-12 col-sm-6 p-2 row m-0  thmb ">
                <div class="col thmb-cover p-0"><img src="imgs/orema13.jpg" alt="" class="img-fluid"></div>
                <div class="w-auto flex-col justify-content-center thmb-text pl-2 text-white">
                    <span class="fs-5 thmb-name font-3">Service #3</span>
                    <span class="thmb-description fs-5 font-2">Service Description</span>
                    <span class="thmb-action font-2">$39.99</span>
                </div>
                <div class="col thmb-btn d-flex"><button class="btn btn-danger text-white font-2">Book</button></div>
            </div>*/
function populate_other_services(active_service_id) {
	for (var i = 0; i < Object.keys(services).length; i++){
		if(Object.keys(services)[i] != active_service_id){
			let service = services[Object.keys(services)[i]];
			let $div = $("<div>", {class: "col-12 col-sm-6 p-2 row m-0 row-cols-3 thmb"});
			let $div2 = $("<div>", {class: "col-4 thmb-cover p-0"});
			let $div3 = $("<div>", {class: "col-5 p-0 flex-col justify-content-center thmb-text pl-2 text-white"});
			let $div4 = $("<div>", {class: "col-3 thmb-btn d-flex"});
			let $span = $("<span>", {class: "fs-5 thmb-name font-3"});
			$span.html(service['alias']);
			let $span2 = $("<span>", {class: "thmb-description fs-5 font-2"});
			$span2.html(service['description']);
			let $span3 = $("<span>", {class: "thmb-action font-2"});
			$span3.html(service['price']);
			let $img = $("<img>", {class: "img-fluid", src: service['cover_img']});
			let $button = $("<button>", {class: "btn btn-danger text-white font-2", onclick: 'redirectTo("./booking.html?service=' + Object.keys(services)[i] + '","replace")'});
			$button.html('Book');
			$div3.append($span);
			$div3.append($span2);
			$div3.append($span3);
			$div2.append($img);
			$div4.append($button);
			$div.append($div2);
			$div.append($div3);
			$div.append($div4);

			$('#services').append($div);
		}
	}
}

	update_service(service_id);
	

