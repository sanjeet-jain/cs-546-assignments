/* TODO: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { stringUtils } from "./helpers.js";

/**
 * function to check if input string is a palindrome or and returning an object
 * @param {string[]} string
 * @returns {Object}
 */
export let palindromes = (string) => {
  return stringUtils.validatePalindromeString(string);
};

export let censorWords = (string, badWordsList) => {};

export let distance = (string, word1, word2) => {};

const stringUtils = {
  /**
   * function to check if input string is a palindrome or and returning an object
   * @param {string[]} strArray
   * @returns {Object}
   */
  validatePalindromeString(strArray) {
    errorIfNullOrEmpty(strArray, "palindrome Array");
    errorIfNotArray(strArray, "palindrome Array");
    validateArrElements(
      strArray,
      0,
      "string",
      "palindrome Array",
      false,
      false
    );
    // pre processing
    for (let key in strArray) {
      strArray[key] = strArray[key].trim().toLowerCase().replace(/\W/g, "");
    }
    // regex reference https://linuxhint.com/remove-all-non-alphanumeric-characters-in-javascript/
    // basicall y \W is a metacharacter that matches for all non alphanumeric characters including spaces and we replace them with ""
    let result = strArray.reduce((old, key) => ({ ...old, [key]: false }), {});
    strArray.forEach((element) => {
      let strLen = element.length;
      let leftHalf = "";
      let rightHalf = "";
      if (strLen % 2 === 0) {
        leftHalf = element.slice(0, strLen / 2);
        rightHalf = element.slice(strLen / 2);
        if (leftHalf === rightHalf) {
          result[element] = true;
        } else return false;
      } else {
        leftHalf = element.slice(0, strLen / 2);
        rightHalf = element
          .slice(strLen / 2 + 1)
          .split("")
          .reverse()
          .join("");
        if (leftHalf === rightHalf) {
          result[element] = true;
        } else result[element] = false;
      }
    });
    return result;
  },
};
