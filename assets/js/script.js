/*scroll*/
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}

// Capturar elementos del formulario
const form = document.querySelector(".contacto_form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const asuntoInput = document.querySelector("#asunto");
const mensajeInput = document.querySelector("#mensaje");
const enviarBtn = document.querySelector("#enviar");

// función para mostrar mensaje de error
function showError(input, message) {
  const errorSpan = input.parentElement.querySelector(`.error_${input.id}`);
  input.style.borderColor = "red";
  errorSpan.textContent = message;
}

// función para mostrar mensaje de éxito
function showSuccess(input) {
  const errorSpan = input.parentElement.querySelector(`.error_${input.id}`);
  input.style.borderColor = "initial";
  errorSpan.textContent = "";
}

// función para validar campo de texto
function validateText(input, minLength, maxLength) {
  const inputValue = input.value.trim();
  if (inputValue === "") {
    showError(input, "Este campo es requerido");
    return false;
  }
  if (inputValue.length < minLength) {
    showError(input, `Este campo debe contener al menos ${minLength} caracteres`);
    return false;
  }
  if (inputValue.length > maxLength) {
    showError(input, `Este campo debe contener máximo ${maxLength} caracteres`);
    return false;
  }
  showSuccess(input);
  return true;
}

// función para validar correo electrónico
function validateEmail(input) {
  const emailValue = input.value.trim();
  if (emailValue === "") {
    showError(input, "Este campo es requerido");
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(emailValue)) {
    showError(input, "Correo electrónico no válido");
    return false;
  }
  showSuccess(input);
  return true;
}

// función para validar todo el formulario
function validateForm() {
  const isNameValid = validateText(nameInput, 2, 50);
  const isEmailValid = validateEmail(emailInput);
  const isAsuntoValid = validateText(asuntoInput, 1, 50);
  const isMensajeValid = validateText(mensajeInput, 1, 300);
  return isNameValid && isEmailValid && isAsuntoValid && isMensajeValid;
}

// evento submit del formulario
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateForm()) {
    // enviar el formulario aquí
    form.submit();
  }
});

// eventos de entrada de texto en los campos
nameInput.addEventListener("input", function () {
  validateText(nameInput, 2, 50);
});
emailInput.addEventListener("input", function () {
  validateEmail(emailInput);
});
asuntoInput.addEventListener("input", function () {
  validateText(asuntoInput, 1, 50);
});
mensajeInput.addEventListener("input", function () {
  validateText(mensajeInput, 1, 300);
});

// desactivar el botón de enviar inicialmente
enviarBtn.disabled = false;

// activar o desactivar el botón de enviar según la validación del formulario
form.addEventListener("input", function () {
  if (validateForm()) {
    enviarBtn.disabled = false;
  } else {
    enviarBtn.disabled = true;
  }
});
