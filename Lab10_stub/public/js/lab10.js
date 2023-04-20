// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
const emailRegex =
  /^[a-zA-Z]+[\._%+\-]*[a-zA-Z0-9]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/;
const passRegex =
  /^(?=.{8,})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+\.\/?<>\-])[^\s]*$/;

const nameRegex = /^(?=.{2,25}$)(?![\d ])[\w\s]+$/i;
const roleRegex = /(admin|user)/;

function checkLoginInputValidations(event) {
  const { emailAddressInput, passwordInput } = event.target;
  const emailAddressInputError = document.getElementById(
    "emailAddressInput_error"
  );
  const passwordInputError = document.getElementById("passwordInput_error");

  emailAddressInputError.innerText = "";
  passwordInputError.innerText = "";
  emailAddressInput.setCustomValidity("");
  passwordInput.setCustomValidity("");

  if (!emailAddressInput.value.match(emailRegex)) {
    emailAddressInputError.innerText = "Not a valid Email";
    emailAddressInput.setCustomValidity("patternMismatch");
  }

  if (!passwordInput.value.match(passRegex)) {
    passwordInput.setCustomValidity("patternMismatch");
    passwordInputError.innerText =
      "Password can not contain whitespaces \n needs to be minimum 8 characters \n needs to have 1 capital letter \n needs to have 1 number \n needs to have 1 special character";
  }

  if (event.target.checkValidity()) {
    event.target.submit();
  }
}
function checkRegistrationInputValidations(event) {
  const {
    emailAddressInput,
    passwordInput,
    confirmPasswordInput,
    firstNameInput,
    lastNameInput,
    roleInput,
  } = event.target;
  const emailAddressInputError = document.getElementById(
    "emailAddressInput_error"
  );
  const passwordInputError = document.getElementById("passwordInput_error");
  const confirmPasswordInputError = document.getElementById(
    "confirmPasswordInput_error"
  );
  const firstNameInputError = document.getElementById("firstNameInput_error");
  const lastNameInputError = document.getElementById("lastNameInput_error");
  const roleInputError = document.getElementById("roleInput_error");

  emailAddressInputError.innerText = "";
  passwordInputError.innerText = "";
  confirmPasswordInputError.innerText = "";
  firstNameInputError.innerText = "";
  lastNameInputError.innerText = "";
  roleInputError.innerText = "";

  emailAddressInput.setCustomValidity("");
  passwordInput.setCustomValidity("");
  confirmPasswordInput.setCustomValidity("");
  firstNameInput.setCustomValidity("");
  lastNameInput.setCustomValidity("");
  roleInput.setCustomValidity("");

  // check email regex
  if (!emailAddressInput.value.match(emailRegex)) {
    emailAddressInputError.innerText = "Not a valid Email";
    emailAddressInput.setCustomValidity("patternMismatch");
  }

  // check pass regex
  if (!passwordInput.value.match(passRegex)) {
    passwordInput.setCustomValidity("patternMismatch");
    passwordInputError.innerText =
      "Password can not contain whitespaces \n needs to be minimum 8 characters \n needs to have 1 capital letter \n needs to have 1 number \n needs to have 1 special character";
  }

  // check re enter pass regex
  if (!confirmPasswordInput.value.match(passRegex)) {
    confirmPasswordInput.setCustomValidity("patternMismatch");
    confirmPasswordInputError.innerText =
      "Password can not contain whitespaces \n needs to be minimum 8 characters \n needs to have 1 capital letter \n needs to have 1 number \n needs to have 1 special character";
  }

  // check if both pass are same
  if (passwordInput.value !== confirmPasswordInput) {
    passwordInput.setCustomValidity("patternMismatch");
    confirmPasswordInput.setCustomValidity("patternMismatch");
    passwordInputError.innerText = "Passwords dont match";
    confirmPasswordInputError.innerText = "Passwords dont match";
  }

  // check if role correct
  if (!roleInput.value.match(roleRegex)) {
    roleInput.setCustomValidity("patternMismatch");
    roleInputError.innerText = "Invalid Role";
  }

  // first name regex
  if (!firstNameInput.value.match(nameRegex)) {
    firstNameInput.setCustomValidity("patternMismatch");
    firstNameInputError.innerText =
      "First Name allows only alphabets with or without spaces and  must be between 2 to 25 characters including spaces";
  }

  // last name regex
  if (!lastNameInput.value.match(nameRegex)) {
    lastNameInput.setCustomValidity("patternMismatch");
    lastNameInputError.innerText =
      "Last Name allows only alphabets with or without spaces and  must be between 2 to 25 characters including spaces";
  }

  if (event.target.checkValidity()) {
    event.target.submit();
  }
}

function validateForms() {
  const forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.id === "login-form") {
          checkLoginInputValidations(event);
        } else if (event.target.id === "registration-form") {
          checkRegistrationInputValidations(event);
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
}

validateForms();
