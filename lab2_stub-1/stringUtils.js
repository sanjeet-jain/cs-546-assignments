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
