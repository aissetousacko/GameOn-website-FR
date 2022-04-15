function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

//regex
const digitalRegex = /^([0-9]|[1-9][0-9])$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const birthdateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
//error messages
const errorMessagesList = {
  first: 'Veuillez entrer 2 caractères ou plus pour le prénom.',
  last: 'Veuillez entrer 2 caractères ou plus pour le nom.',
  email: 'Veuillez entrer une adresse email valide.',
  birthdate: 'Veuillez saisir une date valide.',
  quantity: 'Veuillez entrer une valeur comprise entre 0 et 99.',
  location: 'Veuillez sélectionner une ville.',
  checkbox1: "Veuillez accepter les conditions d'utilisation."
};

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const modalClose = document.getElementsByClassName('close')[0];
const formData = document.querySelectorAll('.formData');
const form = document.querySelector('#reserve-form');
/* const firstName = document.getElementById('first'); */
/* const lastName = document.getElementById('last');
const email = document.getElementById('email'); */
/* const birthdate = document.getElementById('birthdate'); */
/* const quantity = document.getElementById('quantity'); */
/* const cgu = document.getElementById('checkbox1'); */
const successModal = document.getElementById('success__validation');
const successModalClose = document.getElementById('success__close');
let formSuccess = true;

const errorFirstname = document.querySelector('error-messages');
/* const errorLastname = document.getElementById('error-lastname');
const errorEmail = document.getElementById('error-email');
const errorBirthdate = document.getElementById('error-birthdate');
const errorQuantity = document.getElementById('error-quantity');
const errorLocation = document.getElementById('error-location');
const errorCGU = document.getElementById('error-cgu'); */


function showError(inputName, inputElement) {
  inputElement.closest('.formData').dataset.errorVisible = 'true';
  inputElement.closest('.formData').dataset.error = errorMessagesList[inputName];
}

function hideError(inputElement) {
  delete inputElement.closest('.formData').dataset.errorVisible;
  delete inputElement.closest('.formData').dataset.error;
}


const inputTextValidation = (inputName) => {
  const inputElement = document.getElementById(inputName);
  if(inputElement.value == "" || inputElement.value.length < 2) {
    showError(inputName, inputElement);
  } else {
    hideError(inputElement);
  }
}

const inputEmailValidation = (inputName) => {
  const inputElement = document.getElementById(inputName);
  if(inputElement.value == "" || !emailRegex.test(inputElement.value)) {
    showError(inputName, inputElement);
  } else {
    hideError(inputElement);
  }
}

const inputBirthdateValidation = (inputName) => {
  const inputElement = document.getElementById(inputName);
  if(inputElement.value == "" || birthdateRegex.test(inputElement.value)) {
    showError(inputName, inputElement);
  } else {
    hideError(inputElement);
  }
}

const inputQuantityValidation = (inputName) => {
  const inputElement = document.getElementById(inputName);
  if(inputElement.value == "" || !digitalRegex.test(inputElement.value)) {
    showError(inputName, inputElement);
  } else {
    hideError(inputElement);
  }
}

const inputRadioValidation = (inputName) => {
  const radioElements = document.querySelectorAll("input[name=" + inputName + "]");
  for(let element of radioElements) {
    if(!element.checked) {
      showError(inputName, element);
    } else {
      hideError(element);
      break;
    }
  }
}

const inputCheckboxValidation = (inputName) => {
  const inputElement = document.getElementById(inputName);
  if(!inputElement.checked) {
    showError(inputName, inputElement);
  } else {
    hideError(inputElement);
  }
  console.log(inputElement.checked);
}

function formIsValid() {
  let isValid = true;
  for(let errorAttribute of formData) {
    if(errorAttribute.getAttribute("data-error")) {
      isValid = false;
    }
  }

  if(isValid) {
    console.log("submit");
    form.style.display = "none";
    successModal.style.display = "block";
  }
}

function validation() {

  inputTextValidation("first");
  inputTextValidation("last");
  inputEmailValidation("email");
  inputBirthdateValidation("birthdate");
  inputQuantityValidation("quantity");
  inputRadioValidation("location");
  inputCheckboxValidation('checkbox1');
  
  formIsValid();
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  validation();
});

// launch modal event
modalBtn.forEach(btn => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
  const firstInput = form.querySelector('input');
  firstInput.focus();
}

//when the click is on the (x), close the modal
modalClose.onclick = function () {
  modalbg.style.display = 'none';
};

//When the user click on the button "Fermer", close the modal
successModalClose.onclick = function () {
  modalbg.style.display = 'none';
};
