//Display the icon from the menu
function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// Regex
const digitalRegex = /^([0-9]|[1-9][0-9])$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const birthdateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

// Error messages list
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
const successModal = document.getElementById('success__validation');
const successModalClose = document.getElementById('success__close');

// Show error messages
function showError(inputName, inputElement) {
  inputElement.closest('.formData').dataset.errorVisible = 'true';
  inputElement.closest('.formData').dataset.error = errorMessagesList[inputName];
}

// Hide error messages
function hideError(inputElement) {
  delete inputElement.closest('.formData').dataset.errorVisible;
  delete inputElement.closest('.formData').dataset.error;
}

// Validation of the input for the firstname and lastname fields
const inputTextValidation = (inputName) => {
  const inputElement = document.getElementById(inputName);
  if(inputElement.value == "" || inputElement.value.length < 2) {
    showError(inputName, inputElement);
  } else {
    hideError(inputElement);
  }
}

// Validation of the input for the email field
const inputEmailValidation = (inputName) => {
  const inputElement = document.getElementById(inputName);
  if(inputElement.value == "" || !emailRegex.test(inputElement.value)) {
    showError(inputName, inputElement);
  } else {
    hideError(inputElement);
  }
}

// Validation of the input for the birthdate field
const inputBirthdateValidation = (inputName) => {
  const inputElement = document.getElementById(inputName);
  if(inputElement.value == "" || birthdateRegex.test(inputElement.value)) {
    showError(inputName, inputElement);
  } else {
    hideError(inputElement);
  }
}

// Validation of the input for the quantity field
const inputQuantityValidation = (inputName) => {
  const inputElement = document.getElementById(inputName);
  if(inputElement.value == "" || !digitalRegex.test(inputElement.value)) {
    showError(inputName, inputElement);
  } else {
    hideError(inputElement);
  }
}

// Validation of the input for the location fields
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

// Validation of the input for the checkbox
const inputCheckboxValidation = (inputName) => {
  const inputElement = document.getElementById(inputName);
  if(!inputElement.checked) {
    showError(inputName, inputElement);
  } else {
    hideError(inputElement);
  }
  console.log(inputElement.checked);
}

// Check if the form is valid
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

// Validation of all the inputs and ckeck the form validation
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

// Form validation when the user click on the button submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  validation();
});

// launch modal event
modalBtn.forEach(btn => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  successModal.style.display = "none";
  form.style.display = "block";
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
  form.reset();
};
