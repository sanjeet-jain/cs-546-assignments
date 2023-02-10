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
  return typeof value === "string" && spaces
    ? !isEmpty(value)
    : !isEmpty(value.trim());
}
function checkIfItemsAreString(element, elementName = "") {
  let temp;
  if (typeof element === "object") {
    temp = Object.values(element);
  } else if (Array.isArray(element)) {
    temp = element;
  } else {
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
 * @param input[] an input array value to check if its valid.
 */
export function validateObjectArray(input) {
  errorIfNotArray(input, "object array");
  errorIfNullOrEmpty(input);
  if (input.length < 2) {
    throw "Error: objects array length must be greater than 1";
  }
  validateArrElements(input, 4, "object", "object array");

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
    checkIfItemsAreString(element, "object array");
  });
  return arrayKeys;
}

export function validateSortByFieldArray(input, arrayKeys) {
  errorIfNotArray(input, "sort by array");
  errorIfNullOrEmpty(input, "sort by array");
  if (input.length !== 2) {
    throw "Error: sort by Array length must be 2";
  }
  checkIfItemsAreString(input, "sort by array");
  if (!arrayKeys.includes(input[0])) {
    throw "Error: sort by field passed doesnt exist in object array keys";
  }
  if (!["asc", "desc"].includes(input[1])) {
    throw "Error: sort by order field should be asc or desc";
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
  const arrayKeys = Object.keys(array[0]);
  if (!arrayKeys.includes(filterBy)) {
    throw "Error: filterBy key doesnt exist in object array";
  }

  let filterByTermFound = false;
  array.forEach((element) => {
    filterByTermFound = Object.values(element).includes(filterByTerm);
  });
  if (!filterByTermFound) {
    throw "Error: filterByTerm key doesnt exist in object array";
  }
}

export function cleanupForSortAndFilter(
  array,
  sortBy1,
  sortBy2,
  filterBy,
  filterByTerm
) {
  array.forEach((element) => {
    for (let values in element) {
      values = values.trim();
    }
  });
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
