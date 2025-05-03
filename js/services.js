let params = new URLSearchParams(document.location.search);
let service_id = params.get('service');
const services = {
	'basic' : {
		'cover_img' : 'imgs/orema11.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'title' : 'Basic Package',
		'price' : '$100 / 30 minutes',
		'payment_link' : ''
	}, 
	'premium' : {
		'cover_img' : 'imgs/orema13.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'title' : 'Premium Package',
		'price' : '$150 / 45 minutes',
		'payment_link' : ''
	}, 
	'silver' : {
		'cover_img' : 'imgs/orema9.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'title' : 'Silver Package',
		'price' : '$250 / hr',
		'payment_link' : ''
	}, 
	'gold' : {
		'cover_img' : 'imgs/orema3.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'title' : 'Gold Package',
		'price' : '$350 / 2 hrs',
		'payment_link' : ''
	}, 
	'events' : {
		'cover_img' : 'imgs/orema19.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'title' : 'Events',
		'price' : '$75 / hr',
		'payment_link' : ''
	},
	'graduations' : {
		'cover_img' : 'imgs/orema3.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'title' : 'Graduation (Basic)',
		'price' : '$250 / 2 hrs',
		'payment_link' : ''
	},
	'graduations2' : {
		'cover_img' : 'imgs/orema6.jpg',
		'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ligula nec justo scelerisque feugiat. Proin quis augue at justo vulputate scelerisque. Aenean sit amet felis nec lorem hendrerit dictum. Integer non diam ac quam gravida cursus. Ut non risus vel felis dapibus fermentum eget ac lorem.',
		'title' : 'Graduation (Gold',
		'price' : '$250 / 2 hrs',
		'payment_link' : ''
	}
}


// return true  services DB has a key by the name of service_id
function is_valid_service(){
	return service_id != null && services.hasOwnProperty(service_id);
}

// Retrieve Data for specific service
function get_service_data(service_id) {
	return (is_valid_service() && services[service_id]) || services['basic'];
}

function update_service(service_id) {
	let service = get_service_data(service_id);
	document.querySelector('#coverImg').setAttribute('src', service['cover_img']);
	document.querySelector('#service_description').innerText = service['description'];
	document.querySelector('#service').value = service['title'];
	document.querySelectorAll('span[name=service_title]').forEach((ele, index) => { ele.innerText = service['title']});
	document.querySelectorAll('p[name=service_price]').forEach((ele, index) => { ele.innerText = service['price']});
	
	let active_service_id = (is_valid_service(service_id)) ? service_id: "studio";
	populate_other_services(active_service_id); 
	return true;


}

function populate_other_services(active_service_id, limit=Object.keys(services).length) {
	for (var i = 0; i < limit ; i++){
		if(Object.keys(services)[i] != active_service_id){
			let service = services[Object.keys(services)[i]];
			let $div = $("<div>", {class: "col-12 col-sm-6 p-2 row m-0 row-cols-3 thmb"});
			let $div2 = $("<div>", {class: "col-4 thmb-cover p-0"});
			let $div3 = $("<div>", {class: "col-5 p-0 flex-col justify-content-center thmb-text pl-2 text-white"});
			let $div4 = $("<div>", {class: "col-3 thmb-btn d-flex"});
			let $span = $("<span>", {class: "fs-5 thmb-name font-3"});
			$span.html(service['title']);
			let $span2 = $("<span>", {class: "thmb-description fs-6 my-2 font-2"});
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

	
	

