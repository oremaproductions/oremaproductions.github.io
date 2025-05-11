const params = new URLSearchParams(document.location.search);
let service = params.get('service') || 'basic';
let tab = params.get('category') || 'lifestyle';
let active_service_id = '';
let other_services = {};
const description_delimeter = '•';
const services = {
    'lifestyle': {
        'basic': {
            'cover_img': 'imgs/orema11.jpg',
            'description': 'All raw images in 1–24 hrs • 5 edits • 24–72 hr turnaround • 1 person max',
            'title': 'Basic Package',
            'price': '$100 / 30 minutes',
            'payment_link': 'https://book.stripe.com/test_14k01E0DCc5MaOI6oo'
        },
        'premium': {
            'cover_img': 'imgs/orema13.jpg',
            'description': 'All raw images in 1–24 hrs • 7 edits + Stop Motion • 24–72 hr turnaround • 2 people max',
            'title': 'Premium Package',
            'price': '$150 / 45 minutes',
            'payment_link': ''
        }
    },
    'studio': {
        'silver': {
            'cover_img': 'imgs/orema9.jpg',
            'description': 'All raw images in 48 hrs • 10 edits • 3–7 day turnaround • 2 people max',
            'title': 'Silver Package',
            'price': '$250 / hr',
            'payment_link': ''
        },
        'gold': {
            'cover_img': 'imgs/orema3.jpg',
            'description': 'All raw images in 48 hrs • 15 edits • 7–10 day turnaround • 3 people max',
            'title': 'Gold Package',
            'price': '$350 / 2 hrs',
            'payment_link': ''
        },
    },
    'events': {
        'events': {
            'cover_img': 'imgs/orema19.jpg',
            'description': 'All raw images in 5–7 business days • Light retouching, no edits • 2 hr min',
            'title': 'Events',
            'price': '$75 / hr',
            'payment_link': ''
        },
    },
    'graduations': {
        'basic': {
            'cover_img': 'imgs/orema3.jpg',
            'description': 'All raw images in 48 hrs • 10 edits • 3–7 day turnaround • 1 person max',
            'title': 'Graduation (Basic)',
            'price': '$150 / 1 hr',
            'payment_link': ''
        },
        'gold': {
            'cover_img': 'imgs/orema6.jpg',
            'description': 'All raw images in 48 hrs • 15 edits • 7–10 day turnaround • 2 people max',
            'title': 'Graduation (Gold)',
            'price': '$250 / 2 hrs',
            'payment_link': ''
        }
    }

}

const tabs = Object.keys(services);
/*const services = categories.map(categories => Object.keys(services2[categories]));*/

// return true  services DB has a key by the name of service_id
function assert_valid_service() {

    for (i = 0; i < tabs.length; i++) {
        category_name = tabs[i];
        if (services.hasOwnProperty(category_name) == true && services[category_name].hasOwnProperty(service) == true) {
            tab = category_name;
            service = service;
            console.log(category_name, service);
            break
        } else {
        	tab = 'lifestyle';
        	basic = 'basic';

        }
    }

    return true
}

// Retrieve Data for specific service
function get_service_data(category_name=tab, service_name=service) {
	assert_valid_service() ;
	console.log('get_service_data category', category_name, 'tab', service_name);
    return services[category_name][service_name];
}

function update_service(category_name=tab, service_name=service) {
    let service_data = get_service_data(category_name, service_name);
    console.log('update_service service_data', service_data);
    let $description_ele = $('#service_description');
    let $ul_ele = $("<ul>", { class: "m-0 px-0 description_list" });
    active_service_id = service_name;

    document.querySelector('#coverImg').setAttribute('src', service_data['cover_img']);
    document.querySelector('#booking_service').value = service_data['title'];
    document.querySelectorAll('span[name=service_title]').forEach((ele, index) => { ele.innerText = service_data['title'] });
    document.querySelectorAll('p[name=service_price]').forEach((ele, index) => { ele.innerText = service_data['price'] });
    active_stripe_link = service_data['payment_link'];

    for (var x = 0; x < service_data['description'].split(description_delimeter).length; x++) {
        let $li = $("<li>", { class: "m-0 font-3 fs-6 my-1 " });
        $li.html(service_data['description'].split(description_delimeter)[x]);
        $ul_ele.append($li);

    }
    $description_ele.append($ul_ele);
    populate_other_services(category_name, service_name);
    return true;
}

function __get_services_length() {
    let count = 0;
    for (x = 0; x < Object.keys(services).length; x++) {
        let cat = Object.keys(services)[x];
        for (y = 0; y < Object.values(services[cat]).length; y++) {
            count++;
        }
    }
    return count - 1
}
let counter = 0;

function populate_other_services(active_category_name = tab, active_service_name = service, limit = __get_services_length()) {
    console.log(active_category_name);
    let {
        [active_category_name]: active_category, ...other_category_services } = services;
    let {
        [active_service_name]: active_service, ...similar_services } = services[active_category_name];
    other_services = { ...other_category_services };
    other_services[active_category_name] = similar_services;
    let other_services_list = Object.values(other_services).flatMap(service => Object.values(service));
    for (var p = 0; p < Object.keys(other_services).length; p++) {
        let tab_name = Object.keys(other_services)[p];
        for (var w = 0; w < Object.keys(other_services[tab_name]).length; w++) {
            if (counter >= limit) break;
            let service_name = Object.keys(other_services[tab_name])[w];
            let service = other_services[tab_name][service_name];

            let $div = $("<div>", { class: "show-on-scroll col-12 col-lg-6 p-2 row m-0 my-1 row-cols-3 thmb" });
            let $div2 = $("<div>", { class: "col-4 thmb-cover p-0" });
            let $div3 = $("<div>", { class: " col-5 p-0 flex-col justify-content-center thmb-text pl-2 text-white" });
            let $div5 = $("<div>", { class: "  thmb-description text-white" });
            let $div4 = $("<div>", { class: "col-3 thmb-btn d-flex" });
            let $span = $("<span>", { class: "fs-5 thmb-name font-3" });
            let $span2 = $("<span>", { class: " " });
            let $span3 = $("<span>", { class: "thmb-action font-2 fs-7" });
            let $img = $("<img>", { class: "img-fluid", src: service['cover_img'] });
            let $button = $("<button>", { class: "btn btn-danger text-white font-2", onclick: 'redirectTo("./booking.html?category=' + tab_name + '&service=' + service_name + '","replace")' });
            $span.html(service['title']);
            $span3.html(service['price']);
            $button.html('Book');
            $div3.append($span);
            let $p = $("<p>", { class: "m-0 font-2 fs-6 my-1 " });
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
            counter++;
        }
    }
}