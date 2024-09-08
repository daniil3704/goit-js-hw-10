import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = 0;

function addLeadingZero(value) {
  const strValue = value.toString();
  let leadingZero = strValue.padStart(2, '0');
  return leadingZero;
}

const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates, dateStr, instance) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate.getTime() <= currentDate.getTime()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const counterDays = document.querySelector('[data-days]');
const counterHours = document.querySelector('[data-hours]');
const counterMinutes = document.querySelector('[data-minutes]');
const counterSeconds = document.querySelector('[data-seconds]');

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', function () {
  const userCurrentSelectedDate = userSelectedDate;
  const updateCounter = setInterval(function () {
    const date = new Date();
    let timeBalance = userCurrentSelectedDate.getTime() - date.getTime();
    console.log(timeBalance);
    if (timeBalance > 0) {
      let convertedTime = convertMs(timeBalance);
      console.log(convertedTime);
      let days = addLeadingZero(convertedTime.days);
      let hours = addLeadingZero(convertedTime.hours);
      let minutes = addLeadingZero(convertedTime.minutes);
      let seconds = addLeadingZero(convertedTime.seconds);
      counterDays.textContent = days;
      counterHours.textContent = hours;
      counterMinutes.textContent = minutes;
      counterSeconds.textContent = seconds;
      startButton.disabled = true;
    } else {
      clearInterval(updateCounter);
      startButton.disabled = false;
    }
  }, 1000);
});
