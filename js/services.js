let params = new URLSearchParams(document.location.search);
let service_id = params.get('service');
const description_delimeter = '•';
const services = {
	'basic' : {
		'cover_img' : 'imgs/orema11.jpg',
		'description' : 'All raw images in 1–24 hrs • 5 edits • 24–72 hr turnaround • 1 person max',
		'title' : 'Basic Package',
		'price' : '$100 / 30 minutes',
		'payment_link' : ''
	}, 
	'premium' : {
		'cover_img' : 'imgs/orema13.jpg',
		'description' : 'All raw images in 1–24 hrs • 7 edits + Stop Motion • 24–72 hr turnaround • 2 people max',
		'title' : 'Premium Package',
		'price' : '$150 / 45 minutes',
		'payment_link' : ''
	}, 
	'silver' : {
		'cover_img' : 'imgs/orema9.jpg',
		'description' : 'All raw images in 48 hrs • 10 edits • 3–7 day turnaround • 2 people max',
		'title' : 'Silver Package',
		'price' : '$250 / hr',
		'payment_link' : ''
	}, 
	'gold' : {
		'cover_img' : 'imgs/orema3.jpg',
		'description' : 'All raw images in 48 hrs • 15 edits • 7–10 day turnaround • 3 people max',
		'title' : 'Gold Package',
		'price' : '$350 / 2 hrs',
		'payment_link' : ''
	}, 
	'events' : {
		'cover_img' : 'imgs/orema19.jpg',
		'description' : 'All raw images in 5–7 business days • Light retouching, no edits • 2 hr min',
		'title' : 'Events',
		'price' : '$75 / hr',
		'payment_link' : ''
	},
	'graduations' : {
		'cover_img' : 'imgs/orema3.jpg',
		'description' : 'All raw images in 48 hrs • 10 edits • 3–7 day turnaround • 1 person max',
		'title' : 'Graduation (Basic)',
		'price' : '$150 / 1 hr',
		'payment_link' : ''
	},
	'graduations2' : {
		'cover_img' : 'imgs/orema6.jpg',
		'description' : 'All raw images in 48 hrs • 15 edits • 7–10 day turnaround • 2 people max',
		'title' : 'Graduation (Gold)',
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
	let $description_ele = $('#service_description');
	let $ul_ele = $("<ul>", {class: "m-0 description_list"});
	document.querySelector('#coverImg').setAttribute('src', service['cover_img']);
	document.querySelector('#service').value = service['title'];
	document.querySelectorAll('span[name=service_title]').forEach((ele, index) => { ele.innerText = service['title']});
	document.querySelectorAll('p[name=service_price]').forEach((ele, index) => { ele.innerText = service['price']});
	
	for(var x = 0; x< service['description'].split(description_delimeter).length; x++) {
		let $li = $("<li>", {class: "m-0 font-3 fs-6 my-1 "});
		$li.html(service['description'].split(description_delimeter)[x]);
		$ul_ele.append($li);
		
	}
	$description_ele.append($ul_ele);
	let active_service_id = (is_valid_service(service_id)) ? service_id: "studio";
	populate_other_services(active_service_id); 
	return true;


}

function populate_other_services(active_service_id, limit=Object.keys(services).length) {
	for (var i = 0; i < limit ; i++){
		if(Object.keys(services)[i] != active_service_id){
			let service = services[Object.keys(services)[i]];
			let $div = $("<div>", {class: "show-on-scroll col-12 col-lg-6 p-2 row m-0 my-1 row-cols-3 thmb"});
			let $div2 = $("<div>", {class: "col-4 thmb-cover p-0"});
			let $div3 = $("<div>", {class: " col-5 p-0 flex-col justify-content-center thmb-text pl-2 text-white"});
			let $div5 = $("<div>", {class: "  thmb-description text-white"});
			let $div4 = $("<div>", {class: "col-3 thmb-btn d-flex"});
			let $span = $("<span>", {class: "fs-5 thmb-name font-3"});
			let $span2 = $("<span>", {class: " "});
			let $span3 = $("<span>", {class: "thmb-action font-2 fs-7"});
			let $img = $("<img>", {class: "img-fluid", src: service['cover_img']});
			let $button = $("<button>", {class: "btn btn-danger text-white font-2", onclick: 'redirectTo("./booking.html?service=' + Object.keys(services)[i] + '","replace")'});
			$span.html(service['title']);
			$span3.html(service['price']);
			$button.html('Book');
			$div3.append($span);
			let $p = $("<p>", {class: "m-0 font-2 fs-6 my-1 "});
			$p.html(service['description']);
			$div5.append($p);
			$div3.append($span3);
			$div3.append($div5);
			$div2.append($img);
			$div4.append($button);
			$div.append($div2);
			$div.append($div3);
			$div.append($div4);

			$('#services').append($div);
		}
	}
}

	
	

