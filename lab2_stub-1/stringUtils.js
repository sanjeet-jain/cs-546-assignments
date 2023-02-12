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
  let strArray = stringUtils.validatePalindromeString(string);
  // regex reference https://linuxhint.com/remove-all-non-alphanumeric-characters-in-javascript/
  // basicall y \W is a metacharacter that matches for all non alphanumeric characters including spaces and we replace them with ""
  let result = strArray.reduce((old, key) => ({ ...old, [key]: false }), {});
  strArray.forEach((element) => {
    let strLen = element.length;
    let leftHalf = "";
    let rightHalf = "";
    if (strLen % 2 === 0) {
      leftHalf = element.slice(0, strLen / 2);
      rightHalf = element
        .slice(strLen / 2)
        .split("")
        .reverse()
        .join("");
    } else {
      leftHalf = element.slice(0, strLen / 2);
      rightHalf = element
        .slice(strLen / 2 + 1)
        .split("")
        .reverse()
        .join("");
    }
    if (leftHalf === rightHalf) {
      result[element] = true;
    } else result[element] = false;
  });
  return result;
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

export let distance = (string, word1, word2) => {
  let preProcessedData = stringUtils.validateDistanceInputs(
    string,
    word1,
    word2
  ); // [validationResult, tmpstring, tmpword1, tmpword2]
  //validation success
  if (preProcessedData[0]) {
    let result = -1;
    let tmpstring = preProcessedData[1];
    let tmpword1 = preProcessedData[2];
    let tmpword2 = preProcessedData[3];
    let tmpstringArray = tmpstring.split(" ");
    console.log(tmpword2);
    let startIndex = tmpstringArray.findIndex((x) => x === tmpword1);
    if (startIndex === -1) {
      for (let key = 0; key < tmpstringArray.length; key++) {
        if (key < tmpstringArray.length - 1)
          if (
            tmpword1.split(" ").includes(tmpstringArray[key]) &&
            tmpword1.split(" ").includes(tmpstringArray[key + 1])
          ) {
            startIndex = key;
            break;
          }
      }
    }
    let endIndex = tmpstringArray.findIndex((x) => x === tmpword2);

    result = endIndex - startIndex;
    return result;
  } else {
    throw "ERROR";
  }
};
