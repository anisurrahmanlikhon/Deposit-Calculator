const sumInput = document.querySelector("#sum");
const yearsInput = document.querySelector("#years");
const countButton = document.querySelector("#count");
const eraseButton = document.querySelector("#erase");
const resultInput = document.querySelector("#result");
const percentInput = document.querySelector("#percent")




disabledButton()
sumInput.addEventListener('keyup', () => { handleError(sumInput, 'errorSum') });
yearsInput.addEventListener('keyup',() => { handleError(yearsInput, 'errorYears') });
percentInput.addEventListener('keyup',() => { handleError(percentInput, 'errorPercent') });

function disabledButton() {
  countButton.disabled = true; 
  countButton.setAttribute('class', 'counter__button-disabled');
  countButton.setAttribute('title', 'Введите все поля корректно');
}

function enabledButton() {
  countButton.disabled = false;
  countButton.setAttribute('class', 'counter__button-count');
  countButton.removeAttribute('title');
}


function handleError(inputType, errorInput) {
  if (sumInput.value !== '' && yearsInput.value !== '' && percentInput.value !== '') enabledButton()

  if(inputType.value === '') { 
    showError(inputType, errorInput);
    disabledButton();
    inputType.classList.remove('is-text');
  } else {
    inputType.classList.add('is-text');
    const errorText = document.querySelector(`#${errorInput}`);
    if (errorText !== null) deleteError(inputType, errorInput);
  }
}

  function showError(inputType, errorInput) {
    if (!inputType.classList.contains('is-error')) {
      const errorText = document.createElement('p');
      errorText.setAttribute('id', `${errorInput}`);
      errorText.classList.add('error__input');
      errorText.innerText = 'Введите данное поле';
      inputType.after(errorText);  
      inputType.classList.add('is-error');
    }
   
  }

function deleteError(inputType, errorInput) {
    const errorText = document.querySelector(`#${errorInput}`);
    errorText.remove(); 
    inputType.classList.remove('is-error');
}


countButton.onclick = handleValue;
eraseButton.onclick = erase;
function handleValue() {
  if (!sumInput.value) showError(sumInput, errorInput);
  if (!yearsInput.value) showError(yearsInput, errorInput);
  if (!percentInput.value) showError(percentInput, errorInput);
  if (yearsInput.value && sumInput.value && percentInput) caclSum();
  disabledButton()
  sumInput.classList.remove('is-text');
  yearsInput.classList.remove('is-text');
  percentInput.classList.remove('is-text');
}

function caclSum() {
    const sum = +sumInput.value;
    const years = +yearsInput.value;
    const percent = +percentInput.value;
    bank(sum, years, percent);
    sumInput.value = '';
    yearsInput.value = '';
    percentInput.value = '';
}

function bank(sum, years, percent) {
    percent = percent / 100;
  
  for (let i = 0; i < years; i++) {
    sum += (sum * percent)
  }
  resultInput.classList.add('is-show');
  return resultInput.innerText = (Math.round(sum).toLocaleString('ru-RU')) + " " + "руб";
}

function erase() {
  resultInput.classList.remove('is-show');
  sumInput.value = '';
  yearsInput.value = '';
  percentInput.value = '';
  resultInput.innerHTML = '';
}

