// Import necessary libraries

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';

// Catch HTML elements

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const days = document.querySelector('span[data-days]');
const hrs = document.querySelector('span[data-hours]');
const mins = document.querySelector('span[data-minutes]');
const secs = document.querySelector('span[data-seconds]');

// Declare a variable holding dates

let pastDate = new Date();
let userDate;

// Options parameters - ready object

let options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < pastDate) {
            startBtn.disabled = true;
            Notify.warning('Please choose a date in the future');
        } else if (selectedDates[0] > pastDate) {
            startBtn.disabled = false;
            Notify.success('Waiting for the countdown to start');
            userDate = selectedDates[0].getTime();
        }
    },
};

// Function - countdown starting notification

const countdownOn = () => {
    startBtn.disabled = true;
    Notify.success('The countdown has started');
    const timer = setInterval(() => {
        let endTime = userDate - Date.now();
        let cd = convertMs(endTime);
        if (endTime <= 0) {
            Notify.info("Time's up");
            clearInterval(timer);
        } else {
            clock(cd);
        }
    }, 1000);
}

//

const fp = flatpickr('input#datetime-picker', options);
startBtn.addEventListener('click', countdownOn);

// Function - converting time to ms

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day) < 10 ? addLeadingZero(Math.floor(ms / day)) : Math.floor(ms / day);
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

const clock = (cd) => {
    days.textContent = cd.days;
    hrs.textContent = cd.hours;
    mins.textContent = cd.minutes;
    secs.textContent = cd.seconds;
};

const addLeadingZero = (val) => {
    return String(val).padStart(2, '0');
}