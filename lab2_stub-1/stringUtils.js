/* TODO: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { stringUtils } from "./helpers.js";
import { errorIfNullOrEmpty } from "./helpers.js";
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
  //validate if words are present in string
  let preProcessedData = stringUtils.validateDistanceInputs(
    string,
    word1,
    word2
  );
  let result = [];
  findValidPairs(
    preProcessedData,
    word1.trim().toLowerCase(),
    word2.trim().toLowerCase(),
    result
  );
  for (let key in result) {
    result[key] = result[key][1] - result[key][0];
  }
  return Math.min(...result);
};

function findValidPairs(
  stringArray,
  tmpword1,
  tmpword2,
  result,
  word1Index = 0,
  word2Index = 0
) {
  let temp = stringArray;
  // check if the words are in order or find the suitable pair
  word1Index = temp.findIndex((x) => x === tmpword1);
  word2Index = temp.findIndex((x) => x === tmpword2);
  if (word1Index !== -1 && word2Index !== -1) {
    if (word1Index < word2Index) {
      result.push([word1Index, word2Index]);
      // throw "Error: word1 must come before word2";
      //check if theres any other valid pairs
      findValidPairs(
        temp.slice(word1Index + 1),
        tmpword1,
        tmpword2,
        result,
        word1Index,
        word2Index
      );
      findValidPairs(
        temp.slice(word2Index + 1),
        tmpword1,
        tmpword2,
        result,
        word1Index,
        word2Index
      );
    } else if (word1Index > word2Index) {
      findValidPairs(
        temp.slice(word2Index + 1),
        tmpword1,
        tmpword2,
        result,
        word1Index,
        word2Index
      );
    } else if (word1Index === word2Index) {
      throw "Error: word1 and word 2 same indices";
    }
  }
  try {
    errorIfNullOrEmpty(result);
  } catch (error) {
    throw "word 1 cant be before word 2";
  }
}
