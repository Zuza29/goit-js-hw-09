import Notiflix, { Notify } from 'notiflix';

let delay = Number(document.querySelector('input[name="delay"]').value);
let step = Number(document.querySelector('input[name="step"]').value);
let amount = Number(document.querySelector('input[name="amount"]').value);
const submit = document.querySelector('button');


const createPromise = (position, delay) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

const submitHandler = (event) => {
  event.preventDefault();
  for (let i = 0; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
};

submit.addEventListener('submit', submitHandler);