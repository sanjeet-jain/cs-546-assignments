//Todo You can use this file for any helper s you may need. This file is optional and you don't have to use it if you do not want to.

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

  errorIfNullOrEmpty(input, arrayName = "") {
    if (isNull(input) || isEmpty(input)) {
      throw "Error: the " + arrayName + " is null or empty!";
    }
  },

  /**
   *  check if input is a non empty string (not whitespace).
   * @param {any|string}value an input string value to check if its not empty
   * @param {boolean}allowSpaces? boolean value whether to allow spcaes or no for the non empty check , if passed false treats spaces as empty string
   * @return {boolean}
   */
  isNonEmptyString(value, allowSpaces = true) {
    if (typeof value === "string") {
      return allowSpaces ? !isEmpty(value) : !isEmpty(value.trim());
    } else {
      return false;
    }
  },
};
export default helpers;
