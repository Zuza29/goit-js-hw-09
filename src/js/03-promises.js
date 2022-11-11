import Notiflix, { Notify } from 'notiflix';

let initDelay = document.querySelector('input[name="delay"]');
let initStep = document.querySelector('input[name="step"]');
let initAmount = document.querySelector('input[name="amount"]');
const submit = document.querySelector('form');


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
  let targetDelay = Number(initDelay.value);
  let targetStep = Number(initStep.value);
  let targetAmount = Number(initAmount.value);
  
  for (let i = 1; i <= targetAmount; i++) {
    createPromise(i, targetDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    targetDelay += targetStep;
  }
};

submit.addEventListener('submit', submitHandler);