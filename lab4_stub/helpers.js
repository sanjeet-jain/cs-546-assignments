// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
// /\*
// Created by https://sanjeet-jain.github.io/

// ```
//        _       _          _____
//       | |     (_)        / ____|
//       | | __ _ _ _ __   | (___
//   _   | |/ _` | | '_ \   \___ \
//  | |__| | (_| | | | | |  ____) |
//   \____/ \__,_|_|_| |_| |_____/
//                     ______
//                    |______|
// ```

// \*/

const helpers = {
  /**
   *  check if input is null.
   * @param input an input value to check if its null.
   * @returns {boolean} returns true if input is null type
   */
  isNull(input) {
    if (
      (typeof input === "number" && isNaN(input)) ||
      input === undefined ||
      input === null
    ) {
      return true;
    }
    return false;
  },

  /**
   *  check if input is empty.
   * @param input an input value to check if its empty.
   * @returns {boolean} returns true if input is empty type
   */
  isEmpty(input) {
    if (Array.isArray(input) && input.length === 0) {
      return true;
    } else if (typeof input === "string" && input === "") {
      return true;
    } else if (typeof input === "object" && Object.keys(input).length === 0) {
      return true;
    }
    return false;
  },
  /**
   *
   * @param {any} input input to check if its numm or empty
   * @param {string} inputName name of input for error message
   * @returns {boolean}  returns a boolean true if input is valid
   */

  errorIfNullOrEmpty(input, inputName = "", customErrorMessage = "") {
    if (this.isNull(input) || this.isEmpty(input)) {
      let errorMessage = inputName + " is null or empty!";
      if (customErrorMessage !== "") {
        errorMessage = customErrorMessage;
      }
      throw "Error: " + errorMessage;
    }
    return true;
  },

  /**
   *  check if input is a non empty string (not whitespace).
   * @param {any|string} value an input string value to check if its not empty
   * @param {boolean} allowSpaces default true; boolean value whether to allow spcaes or no for the non empty check , if passed false treats spaces as empty string
   * @returns {boolean} returns a boolean value after checking if its a non empty string
   */
  isNonEmptyString(value, allowSpaces = true) {
    if (typeof value === "string") {
      return allowSpaces ? !this.isEmpty(value) : !this.isEmpty(value.trim());
    } else {
      return false;
    }
  },
  isValidUrl(url) {
    const regex = /^http:\/\/www\..{5,}\.com$/;
    return regex.test(url.trim());
  },
  errorIfNotArray(input, arrayName = "") {
    if (!Array.isArray(input)) {
      throw this.throwError(arrayName, "array");
    }
  },
  throwError(
    variableName,
    invalidType = typeof variableName,
    customErrorMessage = ""
  ) {
    if (customErrorMessage !== "") {
      throw "Error: " + customErrorMessage;
    }
    throw `Error: ${variableName} is not a valid ${invalidType}`;
  },
  /**
   * function check if all items within the element input are strings.
   * throws an error if the input doesn't contain strings within it
   * @param {Array||Object} input an input array or object value to check if its items/properties are valid.
   * @param {string} inputName
   * @param {boolean} allowSpaces an input array value to check if its valid.
   */

  checkIfItemsAreString(input, inputName = "", allowSpaces = false) {
    if (!Array.isArray(input)) {
      this.throwError(inputName, "Array");
    }
    if (
      !input.every((value) => {
        return this.isNonEmptyString(value, allowSpaces);
      })
    ) {
      this.throwError(
        inputName,
        "array of strings",
        `${inputName} must be an array of non-empty strings`
      );
    }
    return true;
  },
};
export { helpers as default };
