import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
btnStart.setAttribute('disabled', 'true');
const boxTimer = document.querySelector('.timer');
const boxField = document.querySelector('.field');
const boxValue = document.querySelector('.value');
const boxLabel = document.querySelector('.label');
const daysTime = document.querySelector('span[data-days]');
const hoursTime = document.querySelector('span[data-hours]');
const minutesTime = document.querySelector('span[data-minutes]');
const secondsTime = document.querySelector('span[data-seconds]');
let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    if (Date.now() > selectedTime) {
      btnStart.setAttribute('disabled', 'true');
      return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
      Notiflix.Notify.success('Success');
    }
  },
};
const flatp = flatpickr('input#datetime-picker', options);
btnStart.addEventListener('click', onStartTime);

function onStartTime(evt) {
  evt.preventDefault();
  const time = setInterval(() => {
    const currentTime = Date.now();
    const watch = selectedTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(watch);
    daysTime.textContent = `${days}`;
    hoursTime.textContent = `${hours}`;
    minutesTime.textContent = `${minutes}`;
    secondsTime.textContent = `${seconds}`;
    if (watch <= 1000) {
      clearInterval(time);
      btnStart.disabled = true;
      daysTime.textContent = 00;
      hoursTime.textContent = 00;
      minutesTime.textContent = 00;
      secondsTime.textContent = 00;
      return;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
