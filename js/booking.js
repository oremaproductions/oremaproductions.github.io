
  let bookedData = {};
  let fullyBookedDates = [];
 let allTimes = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]; 
  fetch("v56df7ttr/bookings.json")
    .then(response => response.json())
    .then(data => {
      bookedData = data.booked;
      setFullBookedDates(bookedData);
      flatpickr("#calendar-container", {
        inline: true, // Shows the calendar without an input box
        dateFormat: "Y-m-d",
         minDate: "today",
         disable: fullyBookedDates,
        onChange: function(selectedDates, dateStr) {
          updateTimeSlots(dateStr);
        },
        onReady: function(dateStr) {
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

        // if bookedTimes array matches the allTimes array length 
        if(bookedTimes.length === allTimes.length) {
          
          fullyBookedDates.push(bookedDate); // add to array of fullybooked dates
        }
      }

    }
  function updateTimeSlots(selectedDate) {
    let timeBtns = document.getElementById("time-slot-btns");
    let count = document.getElementById("slotCount");
    let availableTimes = (bookedData[selectedDate]) ? allTimes.filter(time => !bookedData[selectedDate].includes(time)) : allTimes; //filter out unavailable timeslots
    $(timeBtns).empty(); // Reset times
    count.innerText = availableTimes.length;

    if (availableTimes.length === 0) {
      timeBtns.innerHTML = "<span class='text-white'>No times available</span>";
      return false;
    }

    availableTimes.forEach(time => {
      let btn = document.createElement("button");
      btn.innerText = time;
      $(btn).addClass('btn btn-outline-danger slotBtn text-white btn-md font-3 col');
      timeBtns.appendChild(btn);
    });
    }
