'use strict';
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
// const errorMessagesList = {
//   firstName: 'Veuillez entrer 2 caractères ou plus pour le prénom.',
//   lastName: 'Veuillez entrer 2 caractères ou plus pour le nom.',
//   email: 'Veuillez entrer une adresse email valide.',
//   birthdate: 'Veuillez saisir une date valide.',
//   quantity: 'Veuillez entrer une valeur comprise entre 0 et 99.',
//   location: 'Veuillez sélectionner une ville.',
//   cgu: "Veuillez accepter les conditions d'utilisation."
// };

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const form = document.querySelector('#reserve-form');
// const firstName = document.getElementById('first');
// const lastName = document.getElementById('last');
// const email = document.getElementById('email');
// const birthdate = document.getElementById('birthdate');
// const quantity = document.getElementById('quantity');
// const cgu = document.getElementById('checkbox1');
const successModal = document.getElementById('success__validation');

/**
 * You can delete all this, and the error span inputs you'd added in the html
 */
// const errorFirstname = document.getElementById('error-firstname');
// const errorLastname = document.getElementById('error-lastname');
// const errorEmail = document.getElementById('error-email');
// const errorBirthdate = document.getElementById('error-birthdate');
// const errorQuantity = document.getElementById('error-quantity');
// const errorLocation = document.getElementById('error-location');
// const errorCGU = document.getElementById('error-cgu');

/**
 * You can delete this
 */
// let validationStatus = {
//   firstnameValid: false,
//   lastnameValid: false,
//   emailValid: false,
//   birthdateValid: false,
//   quantityValid: false,
//   locationValid: false,
//   cguValid: false
// };

/**
 * * @typedef {'first' | 'last' | 'email' | 'birthdate' | 'quantity' | 'location' | 'cgu' | 'next-events'} IField
 *
 * @typedef {(input: HTMLInputElement) => } getInputValue
 * @typedef {(value: string | number | boolean | null) => O } formatValue<O>
 * @typedef {(value: string) => boolean } isValidateInput
 
 * @type {{ [K in IField]: IFieldHelper<K> }}
 * @param  {} '#first'
 * @param  {input=>input.value} getInputValue
 * @param  {value=>(Boolean(value.length} formatValue
 * @returns undefined
 *
The above code is creating an object called FORMS. This object has a property called first. The first property is an object that has 5 properties. The first property is inputElement. The
inputElement property is a query selector that is selecting the input element with the id of first.
The second property is getInputValue. The getInputValue property is a function that takes in an
input and returns the value of the input. The third property is formatValue. The formatValue
property is a function that takes in a value and returns the value if the value is true. The fourth
property is is */
// You have to add the others fields
const FORMS = {
  first: {
    inputElement: form.querySelector('#first'),
    getInputValue: input => input.value,
    formatValue: value => (Boolean(value.length) ? value : null),
    isValidateInput: value => {
      if (!Boolean(value)) return 'Ce champ est obligatoire';
      if (Boolean(value.length < 2))
        return 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
      return true;
    },
    error: undefined
  },
  last: {
    inputElement: form.querySelector('#last'),
    getInputValue: input => input.value,
    formatValue: value => (Boolean(value.length) ? value : null),
    isValidateInput: value => {
      if (!Boolean(value)) return 'Ce champ est obligatoire';
      if (Boolean(value.length < 2))
        return 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
      return true;
    },
    error: undefined
  },
  email: {
    inputElement: form.querySelector('#last'),
    getInputValue: input => input.value,
    formatValue: value => (Boolean(value.length) ? value : null),
    isValidateInput: value => {
      if (!Boolean(value)) return 'Ce champ est obligatoire';
      if (!Boolean(emailRegex.test(email.value)))
        return 'Veuillez entrer une adresse mail valide.';
      return true;
    },
    error: undefined
  },
  birthdate: {
    inputElement: form.querySelector('#birthdate'),
    getInputValue: input => input.value,
    formatValue: value => (Boolean(value.length) ? value : null),
    isValidateInput: value => {
      if (!Boolean(value)) return 'Ce champ est obligatoire';
      /* if (!Boolean(birthdateRegex.test(value)))
        return 'Veuillez entrer une date valide.'; */
      return true;
    },
    error: undefined
  },
  quantity: {
    inputElement: form.querySelector('#quantity'),
    getInputValue: input => input.value,
    formatValue: value => (Boolean(value.length) ? value : null),
    isValidateInput: value => {
      if (!Boolean(value)) return 'Ce champ est obligatoire';
      if (!Boolean(digitalRegex.test(quantity.value)))
        return 'Veuillez entrer un nombre valide.';
      return true;
    },
    error: undefined
  },
  location: {
    inputElement: form.querySelectorAll('input[name="location"]'),
    getInputValue: input => {
      for(let element of input) {
        if(element.checked) {
          return element.value;
          break;
        }
      }
    },
    formatValue: value => (Boolean(value.length) ? value : null),
    isValidateInput: value => {
      if (!Boolean(value)) return 'Ce champ est obligatoire';
      return true;
    },
    error: undefined
  },
  /* cgu: {
    inputElement: form.querySelector('#checkbox1'),
    getInputValue: input => input.value,
    formatValue: value => (Boolean(value.checked) ? value : null),
    isValidateInput: value => {
      if (!Boolean(value)) return 'Ce champ est obligatoire';
      return true;
    },
    error: undefined
  } */
};

/**
 * It takes the data from the form and puts it into a JSON object
 * @returns An object with the data from the form.
 */
function getFormsData() {
  const jsonData = {};
  Object.keys(FORMS).forEach(id => {
    //tableau contenant les clés de FORMS
    const inputHelpers = FORMS[id];

    if (inputHelpers.inputElement !== undefined) {
      let inputHelpersValue = inputHelpers.getInputValue(inputHelpers.inputElement);
      jsonData[id] = inputHelpers.formatValue(
        inputHelpersValue
      );
    }
  });

  return jsonData;
}

/** Validate a single form field
 * @template {keyof IFormData} K
 * @param {K} name Field name to validate the value
 * @param {IFormData[K]} value Value to validate for given field name
 * @returns {boolean} */

/**
 * It takes an input name and input value, and returns true if the input value is valid, and false if
 * it's not
 * @param inputName - The name of the input field.
 * @param inputValue - The value of the input.
 * @returns The function isValid is being returned.
 */
function isValid(inputName, inputValue) {
  const inputHelpers = FORMS[inputName];

  //permet de vérifier s'il y a une erreur et la renvoie
  const isValidOrIsError = inputHelpers
    ? inputHelpers.isValidateInput(inputValue)
    : true;
  inputHelpers.error = isValidOrIsError === true ? '' : isValidOrIsError;

  return isValidOrIsError === true;
}

/**
 * It takes an object, and returns true if all of the values in the object are valid, and false if any
 * of the values are invalid
 * @param data - The data object to validate
 * @returns An array of strings that are the keys of the object that are not valid.
 */
function validateInput(data) {
  const keys = Object.keys(data);
  const valids = keys.map(key => isValid(key, data[key]));

  const errors = valids
    .map((val, i) => (val ? 'true' : i))
    .filter(val => val !== 'true')
    .map(index => keys[index]);

  return Boolean(errors.length === 0);
}

/** Show error for given formData & input-like
 * @param {HTMLElement} formData
 * @param {HTMLInputElement | { id: string }} input
 */
/**
 * If the input has an error, set the form's error to the input's error
 * @param formData - The form element that contains the input element.
 * @param input - The input element that the user is currently interacting with.
 */
function showError(formData, input) {
  const inputHelpers = FORMS[input.id];

  if (Boolean(inputHelpers.error)) {
    //dans l'attribut de données dataset, on définit une valeur errorVisible qui renvoie true s'il y a une erreur
    formData.dataset.errorVisible = 'true';
  }
  //dans l'attribut de données dataset, on définit une valeur error qui affiche le message d'erreur
  formData.dataset.error = inputHelpers.error || formData.dataset.error;
}
/** Hide error (after doing a re-validate, or when forced) for given formData & input-like
 * @param {HTMLElement} formData
 * @param {HTMLInputElement | { id: string }} input
 * @param {boolean} force
 */
/**
 * If the input is valid, remove the error message and hide the error message
 * @param formData - The form element
 * @param input - The input element that the error is being shown for.
 * @param [force=false] - if true, the error will be hidden regardless of the input's validity
 */
function hideError(formData, input, force = false) {
  const inputHelpers = FORMS[input.id];

  delete formData.dataset.errorVisible;
  delete formData.dataset.error;

  if (force !== true && !isValid(input.id, inputHelpers.formatValue(inputHelpers.getInputValue(input)))) {
    console.log('really on error');
    showError(formData, input);
  }
}

/** Modal form submit process
 * @param {SubmitEvent | undefined} event */
/**
 * If the form is valid, show the thank you modal, otherwise show the errors
 * @param [event] - The event object that is passed to the function.
 */
function submit(event = undefined) {
  event.preventDefault();

  const data = getFormsData();
  const formValidation = validateInput(data);

  console.log("click submit");
  if (Boolean(formValidation)) {
    // Here you can call success message
    console.log("submit");
    form.style.display = "none";
    successModal.style.display = "block";
  } else {
    form.checkValidity();
    console.log("error");
  }
}

/***[ EVENTS BINDING ]***
 ************************/
form.addEventListener('submit', submit, false);

// launch modal event
modalBtn.forEach(btn => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
  const firstInput = form.querySelector('input');
  firstInput.focus();
}

//when the click is on the (x), close the modal
const modalClose = document.getElementsByClassName('close')[0];
modalClose.onclick = function () {
  modalbg.style.display = 'none';
};

// //ajout des messages d'erreurs en fonction de chaque input individuellement
// //First Name validation
// firstName.addEventListener('input', function (e) {
//   if (firstName.value == '' || firstName.value.length < 2) {
//     errorFirstname.innerText = errorMessagesList.firstName;
//     validationStatus.firstnameValid = false;
//   } else {
//     errorFirstname.innerText = '';
//     validationStatus.firstnameValid = true;
//   }
//   console.log(firstName.value);
// });

// //Last Name validation
// lastName.addEventListener('input', function (e) {
//   if (lastName.value == '' || lastName.value.length < 2) {
//     errorLastname.innerText = errorMessagesList.lastName;
//     validationStatus.lastnameValid = false;
//   } else {
//     errorLastname.innerText = '';
//     validationStatus.lastnameValid = true;
//   }
//   console.log(lastName.value);
// });

// //Email validation
// email.addEventListener('input', function (e) {
//   if (email.value == '' || emailRegex.test(email.value) == false) {
//     errorEmail.innerText = errorMessagesList.email;
//     validationStatus.emailValid = false;
//   } else {
//     errorEmail.innerText = '';
//     validationStatus.emailValid = true;
//   }
//   console.log(email.value);
// });

// //Birth Date validation
// birthdate.addEventListener('input', function (e) {
//   console.log('erreur date');
//   if (birthdate.value == '') {
//     console.log('erreur date de naissance');
//     errorBirthdate.innerText = errorMessagesList.birthdate;
//     validationStatus.birthdateValid = false;
//   } else {
//     errorBirthdate.innerText = '';
//     validationStatus.birthdateValid = true;
//   }
//   console.log(birthdate.value);
// });

// //Quantity validation
// quantity.addEventListener('input', function (e) {
//   if (quantity.value == '' || digitalRegex.test(quantity.value) == false) {
//     errorQuantity.innerText = errorMessagesList.quantity;
//     validationStatus.quantityValid = false;
//   } else {
//     errorQuantity.innerText = '';
//     validationStatus.quantityValid = true;
//   }
//   console.log(quantity.value);
// });

// //validation of the form
// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   /* validate(); */

//   if (firstName.value == '' || firstName.value.length < 2) {
//     errorFirstname.innerText = errorMessagesList.firstName;
//     validationStatus.firstnameValid = false;
//   } else {
//     errorFirstname.innerText = '';
//     validationStatus.firstnameValid = true;
//   }

//   //Location validation
//   const city = document.querySelector("input[name='location']:checked");
//   if (city == null) {
//     errorLocation.innerText = errorMessagesList.location;
//     console.log('verif city');
//     validationStatus.locationValid = false;
//   } else {
//     errorLocation.innerText = '';
//     validationStatus.locationValid = true;
//   }
//   console.log(city.value);

//   /* const cities = document.querySelectorAll("input[name='location']");
//   cities.forEach(city => city.addEventListener("change", function(e) {
//     if(city == null){
//       errorLocation.innerText = errorMessagesList.location;
//       console.log("verif city");
//       validationStatus.locationValid = false;
//     } else {
//       errorLocation.innerText = "";
//       validationStatus.locationValid = true;
//     }
//     console.log(city.value);
//   })) */

//   //CGU validation
//   //console.log(cgu.checked);
//   if (cgu.checked == true) {
//     errorCGU.innerText = '';
//     validationStatus.cguValid = true;
//   } else {
//     errorCGU.innerText = errorMessagesList.cgu;
//     console.log('verif cgu');
//     validationStatus.cguValid = false;
//   }
//   console.log('checked');

//   /* cgu.addEventListener("change", function(e) {
//     console.log(cgu.checked);
//     if(cgu.checked == true) {
//       errorCGU.innerText = "";
//       console.log("verif cgu");
//       validationStatus.cguValid = true;
//     }else {
//       errorCGU.innerText = errorMessagesList.cgu;
//       validationStatus.cguValid = false;
//     }
//     console.log("checked");
//   }) */

//   let result = false;
//   for (let valid in validationStatus) {
//     if (validationStatus[valid] == true) {
//       result = true;
//     } else {
//       result = false;
//       break;
//     }
//   }
//   console.log(validationStatus);
//   console.log(result);

//   if (result == true) {
//     //alert("merci");
//     form.style.display = 'none';
//     successModal.style.display = 'block';
//   } else {
//     alert("ce n'est pas bon");
//     /* for(msg-error in errorMessagesList) {
//       if(validationStatus[valid] == true) {
//         result = true;
//       } else {
//         result = false;
//         break;
//       }
//     } */
//   }
// });

// /* function errorMessages(validationStatus) {
//   switch (validationStatus) {
//     case :

//       break;

//     default:
//       break;
//   }
// } */

//When the user click on the button "Fermer", close the modal
const successModalClose = document.getElementById('success__close');
successModalClose.onclick = function () {
  modalbg.style.display = 'none';
};
