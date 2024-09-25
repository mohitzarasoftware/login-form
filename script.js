let body = document.querySelector('body');
let fingerprint = document.querySelector('.fingerprint');
let center = document.querySelector('.center');
let scan = document.querySelector('.scan');
let timer, timerSuccesss;


function onSuccess() {
    body.removeEventListener('mousedown', onTouchstart);
    body.removeEventListener('touchstart', onTouchstart);


    fingerprint.classList.remove('active');
    center.classList.add('success')

    clearTimeout(timerSuccesss);

    timerSuccesss = setTimeout(() => {
        body.addEventListener('mousedown', onTouchstart);
        body.addEventListener('touchstart', onTouchstart);
        center.classList.remove('success')

    }, 3000);
}

function onTouchstart() {
    fingerprint.classList.add('active');
    timer = setTimeout(onSuccess, 2000)
}

function onTouchEnd() {
    fingerprint.classList.remove('active')
    clearTimeout(timer)
}

body.addEventListener('mousedown', onTouchstart)
body.addEventListener('touchstart', onTouchstart)
body.addEventListener('mouseup', onTouchEnd)
body.addEventListener('touchend', onTouchEnd)


// show date 
// Function to display the current date and day
function showDateAndDay() {
    const date = new Date();

    // Array to get the day names
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Get the current day, month, and year
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for the day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so +1
    const year = date.getFullYear();

    // Format the date as "Day, DD-MM-YYYY"
    const formattedDate = `${dayName}, ${day}-${month}-${year}`;

    // Display the date in the HTML element with ID 'currentDate'
    document.getElementById('currentDate').textContent = formattedDate;
}

// Call the function to display the date and day
showDateAndDay();




// press button
// Get the button element
const button = document.getElementById('holdButton');

let pressTimer;

// Function to redirect after 2 seconds of holding the button
function handleRedirect() {
    window.location.href = "otp.html"; // Change to your desired URL
}

// Start the timer when the button is pressed
function startPressTimer() {
    pressTimer = setTimeout(handleRedirect, 2500); // 2000 milliseconds = 2 seconds
}

// Cancel the timer if the button is released early
function cancelPressTimer() {
    clearTimeout(pressTimer);
}

// Event listeners for all pointer types (mouse, touch)
button.addEventListener('pointerdown', startPressTimer);
button.addEventListener('pointerup', cancelPressTimer);
button.addEventListener('pointerleave', cancelPressTimer);



// opt js // Function to move to the next input box
// Function to move to the next input box
function moveToNext(current, nextId) {
    if (current.value.length == 1) {
        if (nextId) {
            document.getElementById(nextId).focus();
        }
    }
}

// Restrict input to numbers only
document.querySelectorAll('.otp-input').forEach(function(input) {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Only allow numbers
    });
});

// Function to clear the last filled OTP input one by one when the "Back" button is clicked or Backspace is pressed
function clearLastOtp() {
    const otpInputs = document.querySelectorAll('.otp-input');
    // Iterate in reverse to find the last filled input and clear it
    for (let i = otpInputs.length - 1; i >= 0; i--) {
        if (otpInputs[i].value !== '') {
            otpInputs[i].value = ''; // Clear the last filled input
            otpInputs[i].focus(); // Focus back on the cleared input
            break; // Stop after clearing one input
        }
    }
}

// Add event listener for keydown event to detect the backspace key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        clearLastOtp();
        event.preventDefault(); // Prevent the default backspace action (like scrolling back)
    }
});