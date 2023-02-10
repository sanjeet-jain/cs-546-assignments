/* TODO: Implment any helper functions below 
    and then export them for use in your other files.
*/

/**
 * funtion check if input is null.
 * @param input an input value to check if its null.
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
 * funtion check if input is empty.
 * @param input an input value to check if its empty.
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

function validateArrElements(input, length, type, arrayName = "") {
  input.forEach((element) => {
    if (isEmpty(element) || isNull(element)) {
      throw "Error: an item within the " + arrayName + " is empty or null";
    }
    if (typeof element !== type) {
      throw "Error:" + arrayName + " items arent " + type;
    }
    let elementKeys = Object.keys(element);
    if (elementKeys.length !== length) {
      throw "Error: " + arrayName + " of incorrect length";
    }
  });
}

/**
 * funtion check if input is a non empty string (not whitespace).
 * @param input an input string value to check if its not empty and not a whitespace.
 */
function isNonEmptyString(value, spaces = true) {
  if (typeof value === "string") {
    return spaces ? !isEmpty(value) : !isEmpty(value.trim());
  } else {
    return false;
  }
}
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
 * funtion check if input is valid for sort and filter.
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

// export function validateInputForMerge(input){
//     let isValid = False;
//     if(input)

//     return isValid
// }

// export function validateInputForMatrixMultiply(input){
//     let isValid = False;
//     if(input)

//     return isValid
// }
