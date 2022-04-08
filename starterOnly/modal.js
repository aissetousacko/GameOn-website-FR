function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//regex
const digitalRegex = /^([0-9]|[1-9][0-9])$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//error messages
const errorMessagesList = {
  firstName: "Veuillez entrer 2 caractères ou plus pour le prénom.", 
  lastName: "Veuillez entrer 2 caractères ou plus pour le nom.",
  email: "Veuillez entrer une adresse email valide.",
  birthdate: "Veuillez saisir une date valide.",
  quantity: "Veuillez entrer une valeur comprise entre 0 et 99.",
  location: "Veuillez sélectionner une ville.",
  cgu: "Veuillez accepter les conditions d'utilisation.",
};

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.getElementById("reserve-form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const cgu = document.getElementById("checkbox1");
const successModal = document.getElementById("success__validation");

const errorFirstname = document.getElementById("error-firstname");
const errorLastname = document.getElementById("error-lastname");
const errorEmail = document.getElementById("error-email");
const errorBirthdate = document.getElementById("error-birthdate");
const errorQuantity = document.getElementById("error-quantity");
const errorLocation = document.getElementById("error-location");
const errorCGU = document.getElementById("error-cgu");


let validationStatus = {
  firstnameValid: false,
  lastnameValid: false,
  emailValid: false,
  birthdateValid: false,
  quantityValid: false,
  locationValid: false,
  cguValid: false,
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//when the click is on the (x), close the modal
const modalClose = document.getElementsByClassName("close")[0];
modalClose.onclick = function() {
  modalbg.style.display = "none";
}

//ajout des messages d'erreurs en fonction de chaque input individuellement
//First Name validation
firstName.addEventListener("input", function(e) {
  if(firstName.value == "" || firstName.value.length < 2) {
    errorFirstname.innerText = errorMessagesList.firstName;
    validationStatus.firstnameValid = false;
  }else {
    errorFirstname.innerText = "";
    validationStatus.firstnameValid = true;
  }
  console.log(firstName.value);
})

//Last Name validation
lastName.addEventListener("input", function(e) {
  if(lastName.value == "" || lastName.value.length < 2) {
    errorLastname.innerText = errorMessagesList.lastName;
    validationStatus.lastnameValid = false;
  }else {
    errorLastname.innerText = "";
    validationStatus.lastnameValid = true;
  }
  console.log(lastName.value);
})

//Email validation
email.addEventListener("input", function(e) {
  if(email.value == "" || emailRegex.test(email.value) == false) {
    errorEmail.innerText = errorMessagesList.email;
    validationStatus.emailValid = false;
  }else {
    errorEmail.innerText = "";
    validationStatus.emailValid = true;
  }
  console.log(email.value);
})

//Birth Date validation
birthdate.addEventListener("input", function(e) {
  console.log("erreur date")
  if(birthdate.value == "" ) {
    console.log("erreur date de naissance")
    errorBirthdate.innerText = errorMessagesList.birthdate;
    validationStatus.birthdateValid = false;
  }else {
    errorBirthdate.innerText = "";
    validationStatus.birthdateValid = true;
  }
  console.log(birthdate.value);
})

//Quantity validation
quantity.addEventListener("input", function(e) {
  if(quantity.value == "" || digitalRegex.test(quantity.value) == false) {
    errorQuantity.innerText = errorMessagesList.quantity;
    validationStatus.quantityValid = false;
  }else {
    errorQuantity.innerText = "";
    validationStatus.quantityValid = true;
  }
  console.log(quantity.value);
})


//validation of the form
form.addEventListener("submit", function(e) {
  e.preventDefault();
  /* validate(); */

  if(firstName.value == "" || firstName.value.length < 2) {
    errorFirstname.innerText = errorMessagesList.firstName;
    validationStatus.firstnameValid = false;
  }else {
    errorFirstname.innerText = "";
    validationStatus.firstnameValid = true;
  }

  //Location validation
  const city = document.querySelector("input[name='location']:checked");
  if(city == null) {
    errorLocation.innerText = errorMessagesList.location;
    console.log("verif city");
    validationStatus.locationValid = false;
  } else {
    errorLocation.innerText = "";
    validationStatus.locationValid = true;
  }
  console.log(city.value);

  /* const cities = document.querySelectorAll("input[name='location']");
  cities.forEach(city => city.addEventListener("change", function(e) {
    if(city == null){
      errorLocation.innerText = errorMessagesList.location;
      console.log("verif city");
      validationStatus.locationValid = false;
    } else {
      errorLocation.innerText = "";
      validationStatus.locationValid = true;
    }
    console.log(city.value);
  })) */

  //CGU validation
  //console.log(cgu.checked);
  if(cgu.checked == true) {
    errorCGU.innerText = "";
    validationStatus.cguValid = true;
  } else {
    errorCGU.innerText = errorMessagesList.cgu;
    console.log("verif cgu");
    validationStatus.cguValid = false;
  }
  console.log("checked");

  /* cgu.addEventListener("change", function(e) {
    console.log(cgu.checked);
    if(cgu.checked == true) {
      errorCGU.innerText = "";
      console.log("verif cgu");
      validationStatus.cguValid = true;
    }else {
      errorCGU.innerText = errorMessagesList.cgu;
      validationStatus.cguValid = false;
    }
    console.log("checked");
  }) */

  let result = false;
  for(let valid in validationStatus) {
    if(validationStatus[valid] == true) {
      result = true;
    } else {
      result = false;
      break;
    }
  }
  console.log(validationStatus);
  console.log(result)
  
  if(result == true) {
    //alert("merci");
    form.style.display = "none";
    successModal.style.display = "block";
  } else{
    alert("ce n'est pas bon");
    /* for(msg-error in errorMessagesList) {
      if(validationStatus[valid] == true) {
        result = true;
      } else {
        result = false;
        break;
      }
    } */
  }
  
})

/* function errorMessages(validationStatus) {
  switch (validationStatus) {
    case :
      
      break;
  
    default:
      break;
  }
} */


//When the user click on the button "Fermer", close the modal
const successModalClose = document.getElementById("success__close");
successModalClose.onclick = function() {
  modalbg.style.display = "none";
}