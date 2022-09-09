import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.target.elements;
  let stepDinamic = delay.valueAsNumber;
  for (let i = 1; i <= amount.valueAsNumber; i += 1) {
    createPromise(i, stepDinamic)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    stepDinamic += step.valueAsNumber;
  }
  evt.target.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
