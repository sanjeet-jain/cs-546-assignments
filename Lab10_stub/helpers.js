// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const helpers = {
  checkFirstNameLastName(_input, inputName) {
    const input = this.validateStringInput(_input, inputName);
    if (!input.match(/^(?=.{2,25}$)(?![\d ])[\w\s]+$/gi)) {
      throw new Error(
        `${inputName} allows only alphabets with or without spaces`
      );
    }
    if (input.length > 25 || input.length < 2) {
      throw new Error(
        `${inputName} must be between 2 to 25 characters including spaces`
      );
    }
    return input;
  },

  checkEmailAddress(_email, inputName) {
    const email = this.validateStringInput(_email, inputName);
    const regex = "^[a-zA-Z]+[._%+-]*[a-zA-Z0-9]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";
    if (!email.toLowerCase().match(regex)) {
      throw new Error(`${inputName} is not an email`);
    }
    return email.toLowerCase();
  },
  checkPassword(_password, inputName) {
    const password = this.validateStringInput(_password, inputName);
    if (
      !password.match(
        /^(?=.{8,})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;'",.\/?><`~\\\-])[^\s]*$/
      )
    ) {
      throw new Error(
        `${inputName} can not contain whitespaces and needs to be minimum 8 characters`
      );
    }
    return password;
  },
  checkRole(_role, inputName) {
    const role = this.validateStringInput(_role, inputName);
    if (!role.match(/(admin|user)/)) {
      throw new Error(`${inputName} Invalid Role`);
    }
    return role;
  },
  validateStringInput(_input, inputname) {
    if (typeof _input !== "string" || _input.trim() === "") {
      throw new Error(`${inputname} is not valid`);
    }
    return _input.trim();
  },
};

export default helpers;
