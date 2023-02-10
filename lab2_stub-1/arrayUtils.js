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
  helper.validateFilters(filterBy, filterByTerm, array);
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
  array.filter((x) => {
    return x[filterBy] === filterByTerm;
  });
  return array; //temp output
};

export let merge = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
};

export let matrixMultiply = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
};
