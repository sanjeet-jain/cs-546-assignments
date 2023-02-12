/* TODO: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { objectUtils } from "./helpers.js";

/**
 * validates objects before and then compared for equality
 * @param {[]} args
 * @returns {boolean}
 */
export let areObjectsEqual = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
  let isValid = true;
  if (objectUtils.validateAreObjectsEqualInputs(args)) {
    //comparision logic
    for (let key = 0; key < args.length - 1; key++) {
      isValid = isValid && compareTwoObjects(args[key], args[key + 1]);
      if (!isValid) {
        break;
      }
    }
    return isValid;
  }
};

/**
 * compares two objects recursively for equality
 * @param {object} obj1
 * @param {object} obj2
 * @returns {boolean}
 */
function compareTwoObjects(obj1, obj2) {
  let isSame = true;
  let obj1Keys = Object.keys(obj1);
  let obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  obj1Keys.forEach((key) => {
    if (isSame) {
      //check if normal comparable values
      // null and arrays are objects!
      if (typeof obj1[key] !== typeof obj2[key]) {
        isSame = false;
      } else if (typeof obj1[key] !== "object") {
        if (isNaN(obj1[key]) && isNaN(obj2[key])) {
          isSame = true;
        } else {
          isSame = isSame && obj1[key] === obj2[key];
        }
      } else if (Array.isArray(obj1[key]) && Array.isArray(obj1[key])) {
        //
      } else if (obj1[key] === null || obj2[key] === null) {
        isSame = isSame && obj1[key] === obj2[key];
      } else {
        compareTwoObjects(obj1[key], obj2[key]);
      }
    }
  });

  return isSame;
}

/**
 * does calculations on object values based on functions passed in order
 * @param {object} object object wholes values to be processed
 * @param {[function]} func array of arrow functions that will be used on the object values
 * @returns {object} returns object with same keys but values after the functions are applied
 */
export let calculateObject = (object, funcs) => {
  //
};

export let combineObjects = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
};
