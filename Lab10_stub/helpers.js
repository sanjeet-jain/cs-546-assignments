// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const helpers = {
  checkFirstNameLastName(_input, inputName) {
    let input;
    try {
      input = this.validateStringInput(_input, inputName);
    } catch (e) {
      throw new Error(
        `${inputName} allows only alphabets with or without spaces`
      );
    }
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
    try {
      const email = this.validateStringInput(_email, inputName);
      const regex =
        /^[a-zA-Z]+[._%+-]*[a-zA-Z0-9]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
      if (!email.toLowerCase().match(regex)) {
        throw new Error(`${inputName} is not an email`);
      }
      return email.toLowerCase();
    } catch (e) {
      throw new Error(`${inputName} is not an email`);
    }
  },
  checkPassword(_password, inputName) {
    try {
      const password = this.validateStringInput(_password, inputName);
      if (
        !password.match(
          /^(?=.{8,})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+./?<>])[^\s]*$/
        )
      ) {
        throw new Error();
      }
      return password;
    } catch (e) {
      throw new Error(
        `${inputName} can not contain whitespaces \n needs to be minimum 8 characters \n needs to have 1 capital letter \n needs to have 1 number \n needs to have 1 special character`
      );
    }
  },
  checkRole(_role, inputName) {
    try {
      const role = this.validateStringInput(_role, inputName);
      if (!role.match(/(admin|user)/)) {
        throw new Error();
      }
      return role;
    } catch (e) {
      throw new Error(`Invalid Role`);
    }
  },
  validateStringInput(_input, inputname) {
    if (typeof _input !== "string" || _input.trim() === "") {
      throw new Error(`${inputname} is not a valid text input`);
    }
    return _input.trim();
  },
};

export default helpers;
