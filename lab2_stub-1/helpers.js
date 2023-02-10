/* TODO: Implment any helper functions below 
    and then export them for use in your other files.
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
  if (Array.isArray(input) && input === []) {
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
 */
function validateArrElements(input, length, type, arrayName = "") {
  input.forEach((element) => {
    if (isNull(element) || isEmpty(element)) {
      throw "Error: an item within the " + arrayName + " is empty or null";
    }
    if (type === "array") {
      if (Array.isArray(element)) {
        errorIfNotArray(element, arrayName);
        errorIfNullOrEmpty(element);
        //recursive call to check deeper
        validateArrElements(element, 0, "array", arrayName);
      } else if (typeof element === "string") {
        isNonEmptyString(element, true);
      } else if (typeof element === "number") {
        errorIfNullOrEmpty(element);
      } else {
        throw (
          "Error: an element within " + arrayName + " is not a number or string"
        );
      }
    } else if (typeof element !== type) {
      throw "Error:" + arrayName + " items arent " + type;
    }
    if (length > 0) {
      let elementKeys = Object.keys(element);
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
 * @param {Array | Object} element an input array value to check if its valid.
 * @param {string?} element an input array value to check if its valid.
 */
function checkIfItemsAreString(element, elementName = "") {
  let temp;
  if (typeof element === "object") {
    temp = Object.values(element);
  } else if (Array.isArray(element)) {
    temp = element;
  } else {
    throw "Error";
  }
  if (
    !temp.every((value) => {
      return isNonEmptyString(value, false);
    })
  ) {
    throw "Error: Incorrect string values for " + elementName;
  }
}

/**
 * function check if input is valid for sort and filter.
 * @param {Array} input an input array value to check if its valid.
 */
export function validateObjectArray(input) {
  errorIfNotArray(input, "object array");
  errorIfNullOrEmpty(input);
  if (input.length < 2) {
    throw "Error: objects array length must be greater than 1";
  }
  validateArrElements(input, 4, "object", "object array");
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
}

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
export function validateSortByFieldArray(sortBy1, sortBy2, arrayKeys) {
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
}

/**
 * function check if filterBy, filterByTerm, is valid for sort and filter.
 * it takes 2 terms as input, checks the first term if its present in the object keys
 * 2nd term is checked against the object values in the array
 * @param {String} filterBy
 * @param {String} filterByTerm
 * @param {Array} array
 */
export function validateFilters(filterBy, filterByTerm, array) {
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
}

/**
 * function to flatten the input array and validate it
 * @param {Array} input
 * @returns {Array} returns flattened and validated array
 */
export function validateInputForMerge(input) {
  errorIfNotArray(input);
  errorIfNullOrEmpty(input, "merge args");
  validateArrElements(input, 0, "array", "merge args");
  //spaces are intentional so no need to cleanup
  let temp = input.flat(Infinity);
  return temp;
}

// export function validateInputForMatrixMultiply(input){
//     let isValid = False;
//     if(input)

//     return isValid
// }
