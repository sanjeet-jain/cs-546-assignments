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

/**
 * function to check if input string is a palindrome or and returning an object
 * @param {string} string
 * @param {string[]} badWordsList
 * @returns {string}
 */
export let censorWords = (string, badWordsList) => {
  if (stringUtils.validateCensorWordsInputs(string, badWordsList)) {
    let pattern = ["!", "@", "$", "#"];
    let index = 0;
    badWordsList.forEach((badword) => {
      let replacement = "";
      for (let i of badword) {
        replacement += pattern[index++];
        if (index === 4) {
          index = 0;
        }
      }
      var regex = new RegExp(badword);
      while (string.match(regex)) {
        string = string.replace(regex, replacement);
      }
    });
    return string;
  }
};

export let distance = (string, word1, word2) => {};
