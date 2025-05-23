const today = new Date();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();
let bookedData = {};
let fullyBookedDates = [];
let allTimes = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const yyyy = today.getFullYear();
const formattedToday = yyyy + '-' + mm + '-' + dd;

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;


fetch("v56df7ttr/bookings.json")
    .then(response => response.json())
    .then(data => {
        bookedData = data.booked;
        setFullBookedDates(bookedData);
        flatpickr("#calendar-container", {
            inline: true, // Shows the calendar without an input box
            dateFormat: "Y-m-d",
            minDate: "today",
            defaultDate: formattedToday,
            disable: fullyBookedDates,
            onChange: function(selectedDates, dateStr) {
                showTimeSlots();
                updateTimeSlots(dateStr);
            },
            onReady: function(selectedDates, dateStr) {
                updateTimeSlots(dateStr);
            }
        });
    });
//updates fullyBookedDates arrays
function setFullBookedDates(bookedDatetimes) {
    // loop through each key 
    for (var i = 0; i < Object.keys(bookedDatetimes).length; i++) {
        let bookedDate = Object.keys(bookedDatetimes)[i]; // Grab a booked date
        let bookedTimes = bookedDatetimes[bookedDate]; // and it's booked timeslots

        if (formattedToday == bookedDate) {

            $('span.flatpickr-day.today').css({ 'border-color': 'white' });
        }
        // if bookedTimes array matches the allTimes array length 
        if (bookedTimes.length === allTimes.length) {
            fullyBookedDates.push(bookedDate); // add to array of fullybooked dates
        }
    }

}

function showTimeSlots() {
    $('#timeslots').css({ "opacity": "1" });
}

function setDateSlot(date) {
    // set hidden input for time slot  
    setTimeSlot("");
    document.getElementById("booking_date").value = date;
}

function setTimeSlot(time) {
    // set hidden input for time slot 
    document.getElementById("booking_time").value = time;

    //If values of inputs are filled, set opacity of btn to 1
    if ((document.getElementById("booking_time").value.length > 0) && (document.getElementById("booking_date").value.length > 0)) {
        $("#nextSteps").css({ 'opacity': '1' });
    } else { // set opacity to 0
        $("#nextSteps").css({ 'opacity': '0' });
    }

}

function formattedTime(time) {
    let splitData = time.split(":");
    splitData[2] = (parseInt(splitData[0]) > 12) ? "pm" : "am";
    let hour = (parseInt(splitData[0]) > 12) ? parseInt(splitData[0]) - 12 : parseInt(splitData[0]) // hh:mm

    return hour + ":" + splitData[1] + " " + splitData[2];
}


function handleCheck(status) {
    console.log(status)

    //if status == true, udisable btn.  else, disable
    return (status == true) ? $("#nextStep").removeClass("disabled") : $("#nextStep").addClass("disabled");
}

function updateTimeSlots(selectedDate) {
    console.log(selectedDate);
    let timeBtns = document.getElementById("time-slot-btns");
    let count = document.getElementById("slotCount");
    let availableTimes = (bookedData[selectedDate]) ? allTimes.filter(time => !bookedData[selectedDate].includes(time)) : allTimes; //filter out unavailable timeslots
    console.log(`available slots for ${selectedDate}: ${availableTimes}`);
    $(timeBtns).empty(); // Reset times
    count.innerText = availableTimes.length;

    setDateSlot(selectedDate);
    if (availableTimes.length === 0 || selectedDate == undefined) {
        return false;
    }
    showTimeSlots();
    availableTimes.forEach(time => {
        let btn = document.createElement("button");
        btn.innerText = formattedTime(time);
        btn.addEventListener('click', (e) => {

            return !$(e.currentTarget).hasClass('active') && $('#time-slot-btns .active').removeClass('active') && $(e.currentTarget).addClass('active') && setTimeSlot(time);;


        });
        $(btn).addClass('btn btn-outline-danger slotBtn text-white btn-md font-3 col');
        timeBtns.appendChild(btn);
    });
}
//Lets send data to google form, then go to stripe
function handleSubmit(e) {
    e.preventDefault();
    alert("yoo")
}
function generateID(){
  return "booking-" + Math.random().toString(36).substr(2, 9);
}
async function sendToForms() {
    let formData = new FormData(document.getElementById("booking_form"));
    console.log('sendToForms() => ', formData);
    await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfMJeVI-N1UDlz-5oOWLzfPy-W5F-H0vaVGv3cboh03WDfjVA/formResponse', {
        method: "POST",
        body: formData,
        mode: "no-cors"
    });

    return 'done';
}
document.getElementById("booking_form").addEventListener('submit', (e)=>{
    e.preventDefault();

    let email = prompt('Enter your email before continuing to payment.');
    if(!email || !email.includes('@')) {
        alert("Invalid email address");
        return false
    }

    document.querySelector('#booking_email').value = email;
    sendToForms().then(() => {
        window.location.replace(`${active_stripe_link}?prefilled_email=${encodeURIComponent(email)}`);
    });
})