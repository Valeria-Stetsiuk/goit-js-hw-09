const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let newColor = null;

btnStart.addEventListener('click', onChangeBackground);
btnStop.addEventListener('click', onStop);
function onChangeBackground(evt) {
  newColor = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', 'true');
  btnStop.removeAttribute('disabled');
}

function onStop(evt) {
  btnStop.setAttribute('disabled', 'true');
  btnStart.removeAttribute('disabled');
  clearInterval(newColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
