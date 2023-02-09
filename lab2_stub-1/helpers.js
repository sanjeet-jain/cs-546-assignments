/* TODO: Implment any helper functions below 
    and then export them for use in your other files.
*/

function isNull(input) {
  if (isNaN(input) || input === undefined || input === null) {
    return true;
  }
  return false;
}
function isEmpty(input) {
  if (input === [] || input === "" || Object.keys(input).length === 0) {
    return true;
  }

  return false;
}

export function validateInputForSortAndFilter(inputValue) {
  let isValid = false;
  let errorMessage = "Error: ";
  if (isNull(inputValue) || isEmpty(inputValue)) {
    isValid = false;
    errorMessage += "the input array is null or empty!";
  }

  if (!isValid) {
    throw errorMessage;
  }
}

// export function validateInputForMerge(inputValue){
//     let isValid = False;
//     if(inputValue)

//     return isValid
// }

// export function validateInputForMatrixMultiply(inputValue){
//     let isValid = False;
//     if(inputValue)

//     return isValid
// }
