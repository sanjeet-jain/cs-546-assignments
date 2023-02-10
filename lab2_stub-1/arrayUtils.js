/* TODO: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import * as helper from "./helpers.js";

/**
 * funtion check if input is valid for sort and filter.
 *@param array input array,
 *@param sortBy1 [sortByField1, order] sort using object key and order to sort it in asc or desc,
 *@param sortBy2 [sortByField2, order],
 *@param filterBy filter by object key,
 *@param filterByTerm filter object value
 */
export let sortAndFilter = (
  array,
  sortBy1,
  sortBy2,
  filterBy,
  filterByTerm
) => {
  helpers.cleanupForSortAndFilter(
    array,
    sortBy1,
    sortBy2,
    filterBy,
    filterByTerm
  );
  let arrayKeys = helper.validateObjectArray(array);
  helper.validateSortByFieldArray(sortBy1, arrayKeys);
  helper.validateSortByFieldArray(sortBy2, arrayKeys);
  helper.validateFilters(filterBy, filterByTerm, array);
  // sorting logic
  return "correct array"; //temp output
};

export let merge = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
};

export let matrixMultiply = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
};
