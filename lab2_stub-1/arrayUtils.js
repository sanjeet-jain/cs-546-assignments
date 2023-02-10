/* TODO: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import * as helper from "./helpers.js";

//commenting reference from https://javascript.info/comments
/**
 * function to check if input is valid for sort and filter.
 *@param {Array}array input array,
 *@param {Array}sortBy1 [sortByField1, order] sort using object key and order to sort it in asc or desc,
 *@param {Array}sortBy2 [sortByField2, order],
 *@param {string}filterBy filter by object key,
 *@param {string}filterByTerm filter object value
 *@return {Array}
 */
export let sortAndFilter = (
  array,
  sortBy1,
  sortBy2,
  filterBy,
  filterByTerm
) => {
  let arrayKeys = helper.validateObjectArray(array);
  helper.validateSortByFieldArray(sortBy1, sortBy2, arrayKeys);
  let filterArray = helper.validateFilters(filterBy, filterByTerm, array);
  filterBy = filterArray[0];
  filterByTerm = filterArray[1];
  // sorting logic
  array.sort((a, b) => {
    let fa = a[sortBy1[0]].toLowerCase();
    let fb = b[sortBy1[0]].toLowerCase();
    let fc = a[sortBy2[0]].toLowerCase();
    let fd = b[sortBy2[0]].toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    if (fc < fd) {
      return -1;
    }
    if (fc > fd) {
      return 1;
    }
    return 0;
  });
  //filtering logic
  array = array.filter((x) => {
    return x[filterBy] === filterByTerm;
  });
  return array; //temp output
};

/**
 * function to check if input is valid for sort and filter.
 *@param {Array}array input array of items which needs to be validated if they are arrays and are valid arrays ( that is they only contain strings or numbers)
 *@return {Array} of sorted items ( numbers sorted in order concatenated with sorted strings as per ASCII value)
 */
export let merge = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  let temp = helper.validateInputForMerge(args);
  //separate the arrays
  let numberList = temp.filter((x) => {
    return typeof x === "number";
  });

  let strList = temp.filter((x) => {
    return typeof x === "string";
  });

  numberList.sort((fa, fb) => {
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  strList.sort();
  temp = numberList.concat(strList);
  return temp;
};

export let matrixMultiply = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  let m1 = [];
  if (helper.validateInputForMatrixMultiply(args)) {
    //matrix multiplication
    args.forEach((matrix) => {
      if (m1.length == []) {
        m1 = matrix;
      } else {
        let result = [];
        for (let i = 0; i < m1.length; i++) {
          result[i] = [];
          for (let j = 0; j < matrix[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < m1[0].length; k++) {
              sum += m1[i][k] * matrix[k][j];
            }
            result[i][j] = sum;
          }
        }
        m1 = result;
      }
    });
  } else {
    throw "Error: Matrix multiplication not possible";
  }
  return m1;
};
