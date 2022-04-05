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
const errorMessages = {
  'firstName': "Veuillez entrer 2 caractères ou plus pour le prénom.", 
  'lastName': "Veuillez entrer 2 caractères ou plus pour le nom.",
  'emailAddress': "Veuillez entrer une adresse email valide.",
  'birthDate': "Vous devez avoir 1 an minimum pour participer.",
  'participationOccurence': "Veuillez entrer une valeur comprise entre 0 et 99.",
  'cityParticipation': "Veuillez sélectionner une ville.",
  'terms': "Veuillez accepter les conditions d'utilisation.",
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

const errorFirstname = document.getElementById("error-firstname");
const errorLastname = document.getElementById("error-lastname");
const errorEmail = document.getElementById("error-email");
const errorBirthdate = document.getElementById("error-birthdate");
const errorQuantity = document.getElementById("error-quantity");
const errorLocation = document.getElementById("error-location");
const errorCGU = document.getElementById("error-cgu");

let firstnameValid = false;
let lastnameValid = false;
let emailValid = false;
let birthdateValid = false;
let quantityValid = false;
let locationValid = false;
let cguValid = false;


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
    errorFirstname.innerText = "Veuillez saisir un prénom valide";
    //alert("le prenom doit etre saisit correctement!");
    console.log("verif prenom");
    e.preventDefault();
  }else {
    errorFirstname.innerText = "";
  }
  firstnameValid = true;
  console.log(firstName.value);
})

//Last Name validation
lastName.addEventListener("input", function(e) {
  if(lastName.value == "" || lastName.value.length < 2) {
    errorLastname.innerText = "Veuillez saisir un nom valide";
    //alert("le prenom doit etre saisit correctement!");
    console.log("verif nom");
    e.preventDefault();
  }else {
    errorLastname.innerText = "";
  }
  lastnameValid = true;
  console.log(lastName.value);
})

//Email validation
email.addEventListener("input", function(e) {
  if(email.value == "" || emailRegex.test(email.value) == false) {
    errorEmail.innerText = "Veuillez saisir un email valide";
    //alert("le prenom doit etre saisit correctement!");
    console.log("verif email");
    e.preventDefault();
  }else {
    errorEmail.innerText = "";
  }
  emailValid = true;
  console.log(email.value);
})

//Birth Date validation
birthdate.addEventListener("input", function(e) {
  if(birthdate.value == "") {
    errorBirthdate.innerText = "Veuillez saisir une date de naissance valide";
    //alert("le prenom doit etre saisit correctement!");
    console.log("verif email");
    e.preventDefault();
  }else {
    errorBirthdate.innerText = "";
  }
  birthdateValid = true;
  console.log(birthdate.value);
})

//Quantity validation
quantity.addEventListener("input", function(e) {
  if(quantity.value == "" || digitalRegex.test(quantity.value) == false) {
    errorQuantity.innerText = "Veuillez saisir un nombre valide";
    //alert("le prenom doit etre saisit correctement!");
    console.log("verif quantity");
    e.preventDefault();
  }else {
    errorQuantity.innerText = "";
  }
  quantityValid = true;
  console.log(quantity.value);
})

//City validation
const city = document.querySelector("input[name='location']:checked");
if(city == null) {
  errorLocation.innerText = "Veuillez sélectionner une option";
} else {
  errorLocation.innerText = "";
}
locationValid = true;
console.log(city.value);

//CGU validation
if(cgu.checked == false) {
  errorCGU.innerText = "Veuillez accepter les conditions générales d'utilisation";
}else {
  errorCGU.innerText = "";
}

//validation of the form
form.addEventListener("submit", function(e) {
  e.preventDefault();
  //on valide le form avec les valeurs true/false attribué aux input
  /* if(firstName.value == "" || firstName.length < 2) {
    
    alert("le prenom doit etre saisit correctement!");
    console.log("verif");
    e.preventDefault();
  }
  console.log(firstName.value); */

  /* if(lastName.value == "" || lastName.length < 2) {
    alert("le nom doit etre saisit correctement!");
    console.log("verif");
    e.preventDefault();
  }
  console.log(lastName.value); */

  /* if(email.value == "" || emailRegex.test(email.value) == false) {
    console.log('email.value');
    alert (" Veuillez saisir une adresse mail valide");
    e.preventDefault();
  }
  console.log(email.value); */

  /* if(quantity.value == "" || digitalRegex.test(quantity.value) == false) {
    alert(' veuillez entrer un nombre valide');
    e.preventDefault();
  }
  console.log(quantity.value); */

  /* const city = document.querySelector("input[name='location']:checked");
  if(city == null) {
    alert("veuillez saisir une location");
    e.preventDefault();
  }
  console.log(city.value); */

  if(cgu.checked == false) {
    alert("la case n'a pas été cochée")
  }
  
  console.log("submit");
})
