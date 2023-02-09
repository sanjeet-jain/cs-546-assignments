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

/**
 * funtion check if input is valid for sort and filter.
 * @param input[] an input array value to check if its valid.
 */
export function validateInputForSortAndFilter(input) {
  let isValid = false;
  if (isNull(input) || isEmpty(input)) {
    throw "Error: the input array is null or empty!";
  }
  if (!Array.isArray(input)) {
    throw "Error: not an array";
  }
  if (input.length < 2) {
    throw "Error: objects array length must be greater than 1";
  }
  input.forEach((element) => {
    if (isEmpty(element) || isNull(element)) {
      throw "Error: object within the array is empty or null";
    }
    if (typeof element !== "object") {
      throw "Error: all array items arent objects";
    }
    let elementKeys = Object.keys(element);
    if (elementKeys.length !== 4) {
      throw "Error: array with objects doesnt exist";
    }
  });
  const peopleArrayKeys = Object.keys(input[0]);
  input.forEach((element) => {
    let elementKeys = Object.keys(element);
    if (
      !elementKeys.every((key) => {
        return peopleArrayKeys.includes(key);
      })
    ) {
      throw "Error: array with objects doesnt have same keys ";
    }
    if (
      !Object.values(element).every((value) => {
        return typeof value === "string" && !isEmpty(value.trim());
      })
    ) {
      throw "Error: not all objects have correct string values";
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
