/* TODO: Implment any helper functions below 
    and then export them for use in your other files.
*/

/*
Created by https://sanjeet-jain.github.io/
      _       _          _____ 
     | |     (_)        / ____|
     | | __ _ _ _ __   | (___  
 _   | |/ _` | | '_ \   \___ \ 
| |__| | (_| | | | | |  ____) |
 \____/ \__,_|_|_| |_| |_____/ 
                   ______    
*/

/**
 * function check if input is null.
 * @param input an input value to check if its null.
 * @returns {boolean} returns true if input is null type
 */
function isNull(input) {
  if (
    (typeof input === "number" && isNaN(input)) ||
    input === undefined ||
    input === null
  ) {
    return true;
  }
  return false;
}

/**
 * function check if input is empty.
 * @param input an input value to check if its empty.
 * @returns {boolean} returns true if input is empty type
 */
function isEmpty(input) {
  if (Array.isArray(input) && input.length === 0) {
    return true;
  } else if (typeof input === "string" && input === "") {
    return true;
  } else if (typeof input === "object" && Object.keys(input).length === 0) {
    return true;
  }
  return false;
}

function errorIfNullOrEmpty(input, arrayName = "") {
  if (isNull(input) || isEmpty(input)) {
    throw "Error: the " + arrayName + " is null or empty!";
  }
}

function errorIfNotArray(input, arrayName = "") {
  if (!Array.isArray(input)) {
    throw "Error: " + arrayName + " not an array";
  }
}

/**
 * function check if input array is of correct length and has correct type of items within it
 * @param {Array}input an input array to be checked
 * @param {number}length length of items inside the array
 * @param {string}type  string input to check for the type of items within the array ( if "array" passed then checks for nested arrays as well and only allows strings or numbers within nested arrays )
 * @param {string?}arrayName string input containing array name for messages
 * @param {boolean?} recursive whether to recursively check the input array elements
 */
let recursionCount = 0;
function validateArrElements(
  input,
  length,
  type,
  arrayName = "",
  recursive = false,
  allowSpaces = true
) {
  input.forEach((element) => {
    errorIfNullOrEmpty(element, arrayName);
    if (type === "array") {
      if (Array.isArray(element) && recursive === true) {
        errorIfNotArray(element, arrayName);
        errorIfNullOrEmpty(element);
        //recursive call to check deeper
        recursionCount += 1;
        validateArrElements(element, 0, "array", arrayName, true);
      } else if (recursionCount < 1 && recursive === true) {
        throw (
          "Error: an element of " +
          arrayName +
          " in the first depth is not an array"
        );
      } else if (typeof element === "string") {
        if (!isNonEmptyString(element, allowSpaces)) {
          throw allowSpaces
            ? "Error: element within array is not a valid string"
            : "Error: element within array is not a valid string(no spaces allowed ) ";
        }
      } else if (typeof element === "number") {
        errorIfNullOrEmpty(element);
      } else {
        throw (
          "Error: an element within " + arrayName + " is not a number or string"
        );
      }
    } else if (typeof element === "string") {
      if (!isNonEmptyString(element, allowSpaces)) {
        throw allowSpaces
          ? "Error: element within array is not a valid string"
          : "Error: element within array is not a valid string(no spaces allowed ) ";
      }
    } else if (typeof element !== type) {
      throw "Error:" + arrayName + " items arent " + type;
    }
    if (length > 0) {
      let elementKeys = Object.keys(element);
      if (recursive === true) {
        arrayName += " : " + element;
      }
      if (elementKeys.length !== length) {
        throw "Error: " + arrayName + " of incorrect length";
      }
    }
  });
}

/**
 * function check if input is a non empty string (not whitespace).
 * @param {any|string}value an input string value to check if its not empty
 * @param {boolean}allowSpaces? boolean value whether to allow spcaes or no for the non empty check , if passed false treats spaces as empty string
 * @return {boolean}
 */
function isNonEmptyString(value, allowSpaces = true) {
  if (typeof value === "string") {
    return allowSpaces ? !isEmpty(value) : !isEmpty(value.trim());
  } else {
    return false;
  }
}

/**
 * function check if all items within the element input are strings.
 * throws an error if the input doesn't contain strings within it
 * @param {Array||Object} element an input array or object value to check if its items/properties are valid.
 * @param {string} elementName
 * @param {boolean} allowSpaces an input array value to check if its valid.
 */
function checkIfItemsAreString(element, elementName = "", allowSpaces = false) {
  let temp;
  if (typeof element === "object") {
    temp = Object.values(element);
  } else if (Array.isArray(element)) {
    temp = element;
  } else {
    throw "Error wrong input type";
  }
  if (
    !temp.every((value) => {
      return isNonEmptyString(value, allowSpaces);
    })
  ) {
    throw "Error: Incorrect string values for " + elementName;
  }
}

const arrayUtils = {
  /**
   * function check if input is valid for sort and filter.
   * @param {Array} input an input array value to check if its valid.
   */
  validateObjectArray(input) {
    errorIfNotArray(input, "object array");
    errorIfNullOrEmpty(input);
    if (input.length < 2) {
      throw "Error: objects array length must be greater than 1";
    }
    validateArrElements(input, 4, "object", "object array", false, false);
    input.forEach((element) => {
      checkIfItemsAreString(element, "object array");
    });

    //cleanup values
    input.forEach((element) => {
      Object.keys(element).forEach((k) => (element[k] = element[k].trim()));
    });

    //cleanup keys
    //reference from https://medium.com/@svchaibasa/how-to-remove-extra-whitespace-from-json-object-keys-in-javascript-816204584ae8
    input.forEach((element) => {
      Object.keys(element).forEach((k) => {
        if (k !== k.trim()) {
          element[k.trim()] = element[k];
          delete element[k];
        }
      });
    });

    const arrayKeys = Object.keys(input[0]);
    input.forEach((element) => {
      let elementKeys = Object.keys(element);
      if (
        !elementKeys.every((key) => {
          return arrayKeys.includes(key);
        })
      ) {
        throw "Error: array with objects doesnt have same keys ";
      }
    });

    return arrayKeys;
  },

  /**
   * function check if sortBy1, sortBy2, is valid for sort and filter.
   * it takes 2 arrays as input,
   * the both array has 2 strings of format [sortByField, order]
   * sortbyfield is one of the keys of the objects in the array
   * order can only be asc or desc
   * 2nd term is checked against the object values in the array
   * @param {Array} sortBy1 an input array value to check if its valid.
   * @param {Array} sortBy2
   * @param {Array} array
   */
  validateSortByFieldArray(sortBy1, sortBy2, arrayKeys) {
    //check sort by 1
    errorIfNotArray(sortBy1, "sort by array 1");
    errorIfNullOrEmpty(sortBy1, "sort by array 1");
    if (sortBy1.length !== 2) {
      throw "Error: sort by Array 1 length must be 2";
    }
    //check sort by 2
    errorIfNotArray(sortBy2, "sort by array 2");
    errorIfNullOrEmpty(sortBy2, "sort by array 2");

    if (sortBy2.length !== 2) {
      throw "Error: sort by Array 2 length must be 2";
    }
    checkIfItemsAreString(sortBy1, "sort by array");
    checkIfItemsAreString(sortBy2, "sort by array");
    //cleanup sort by arrays
    for (let i in sortBy1) {
      sortBy1[i] = sortBy1[i].trim();
      sortBy2[i] = sortBy2[i].trim();
    }

    if (!arrayKeys.includes(sortBy1[0])) {
      throw "Error: sort by 1 field passed doesnt exist in object array keys";
    }
    if (!["asc", "desc"].includes(sortBy1[1])) {
      throw "Error: sort by 1 order field should be asc or desc";
    }

    if (!arrayKeys.includes(sortBy2[0])) {
      throw "Error: sort by 2 field passed doesnt exist in object array keys";
    }
    if (!["asc", "desc"].includes(sortBy2[1])) {
      throw "Error: sort by 2 order field should be asc or desc";
    }
  },

  /**
   * function check if filterBy, filterByTerm, is valid for sort and filter.
   * it takes 2 terms as input, checks the first term if its present in the object keys
   * 2nd term is checked against the object values in the array
   * @param {String} filterBy
   * @param {String} filterByTerm
   * @param {Array} array
   */
  validateFilters(filterBy, filterByTerm, array) {
    errorIfNullOrEmpty(filterBy, "filterBy");
    errorIfNullOrEmpty(filterByTerm, "filterByTerm");

    if (!isNonEmptyString(filterBy, false)) {
      throw "Error: filterBy isnt a valid non empty string";
    }
    if (!isNonEmptyString(filterByTerm, false)) {
      throw "Error: filterByTerm isnt a valid non empty string";
    }
    //cleanup filterBy and filterByTerm
    filterBy = filterBy.trim();
    filterByTerm = filterByTerm.trim();
    const arrayKeys = Object.keys(array[0]);
    if (!arrayKeys.includes(filterBy)) {
      throw "Error: filterBy key doesnt exist in object array";
    }

    let filterByTermFound = Object.values(...array).includes(filterByTerm);
    if (!filterByTermFound) {
      throw "Error: filterByTerm key doesnt exist in object array";
    }
    return [filterBy, filterByTerm];
  },
  /**
   * function to flatten the input array and validate it
   * @param {Array} input
   * @returns {Array} returns flattened and validated array
   */
  validateInputForMerge(input) {
    errorIfNotArray(input);
    errorIfNullOrEmpty(input, "merge args");
    recursionCount = 0;
    validateArrElements(input, 0, "array", "merge args", true, true);
    //spaces are intentional so no need to cleanup
    let temp = input.flat(Infinity);
    return temp;
  },

  /**
   * function to check if input has a set of matrices and validate matrix multiplication
   * throws an error if any of the validation fails
   * returns true if matrix multiplication is possible else false
   * @param {Array} input
   * @returns {boolean}
   */
  validateInputForMatrixMultiply(input) {
    errorIfNotArray(input);
    errorIfNullOrEmpty(input, "matrix args");
    if (input.length < 2) {
      return false;
    }
    input.forEach((element) => {
      validateArrElements(
        element,
        element[0].length,
        "array",
        "matrix args",
        true
      );
    });
    let temp = input.flat(Infinity);
    if (
      !temp.every((x) => {
        return typeof x === "number" && !isNull(x);
      })
    ) {
      return false;
    }

    let currRow = 0;
    let currCol = 0;
    let prevRow = 0;
    let prevCol = 0;

    let isValid = true;
    input.forEach((element) => {
      if (prevRow === 0 && prevCol === 0) {
        prevRow = element.length;
        prevCol = element[0].length;
      } else {
        currRow = element.length;
        currCol = element[0].length;
        if (prevCol === currRow) {
          prevCol = currCol;
        } else {
          isValid = false;
        }
      }
    });
    return true && isValid;
  },
};
const stringUtils = {
  /**
   * function to check if input string is a palindrome or and returning an object with each string as key and corresponding boolean value whether its a palindrome
   * @param {string[]} strArray
   * @returns {Object}
   */
  validatePalindromeString(strArray) {
    errorIfNullOrEmpty(strArray, "palindrome Array");
    errorIfNotArray(strArray, "palindrome Array");
    checkIfItemsAreString(strArray, "palindrome Array", false);

    // pre processing
    for (let key in strArray) {
      strArray[key] = strArray[key].trim().toLowerCase().replace(/\W/g, "");
    }
    checkIfItemsAreString(strArray, "palindrome Array", false);

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

  /**
   * function to check if input for censorWord is valid
   * @param {string} strInput
   * @param {string[]} badWordsArr all strings in this array must be in string input
   * @returns {boolean} true if all validations pass
   */
  validateCensorWordsInputs(strInput, badWordsArr) {
    errorIfNullOrEmpty(strInput, "string input");
    if (!isNonEmptyString(strInput, false)) {
      throw "Error: String input is empty or just a space";
    }
    errorIfNotArray(badWordsArr, "badword array");
    errorIfNullOrEmpty(badWordsArr, "badword array");
    checkIfItemsAreString(badWordsArr, "badword array", false);
    strInput = strInput.trim();
    for (let key in badWordsArr) {
      badWordsArr[key] = badWordsArr[key].trim().toLowerCase();
    }
    badWordsArr.forEach((badword) => {
      // check if all words present
      var regex = new RegExp(badword);
      if (!strInput.match(regex)) {
        throw "Error: not all bad words are in the sentence";
      }
    });

    return true;
  },

  /**
   * function to check if input for censorWord is valid
   * @param {string} string
   * @param {string} word1
   * @param {string} word2
   * @returns {boolean}
   */
  validateDistanceInputs(string, word1, word2) {
    errorIfNullOrEmpty(string, "string input");
    errorIfNullOrEmpty(word1, "word1 string");
    errorIfNullOrEmpty(word2, "word2 string");
    checkIfItemsAreString([string, word1, word2], "input strings", false);
    let tmpstring = string.trim().toLowerCase().replace(/\W/g, " ");
    let tmpword1 = word1.trim().toLowerCase().replace(/\W/g, " ");
    let tmpword2 = word2.trim().toLowerCase().replace(/\W/g, " ");
    checkIfItemsAreString(
      [tmpstring, tmpword1, tmpword2],
      "input strings",
      false
    );

    // console.log(tmpstring.split(regex));

    return true;
  },
};

export { arrayUtils, stringUtils };
