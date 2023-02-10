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
  array;
  //filtering logic

  return array; //temp output
};

export let merge = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
};

export let matrixMultiply = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
};
