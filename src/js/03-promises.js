function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
};

const delay = document.querySelector('[name="delay"]').value;
const step = document.querySelector('[name="step"]').value;
const amount = document.querySelector('[name="amount"]').value;
const submit = document.querySelector('button');

submit.addEventListener('click', createPromise(position, delay))
