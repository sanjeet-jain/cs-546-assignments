/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

/* #region ArrayUtils  */

/* #region  SortAndFilter */
import { sortAndFilter } from "./arrayUtils.js";

// /* #region Array Correctness*/

// for (let people of [
//   [],
//   null,
//   NaN,
//   undefined,
//   1,
//   { key: "value" },
//   // it is an array but not of correct format!
//   [{ abc: "Ryan", age: "22" }],
//   //all objects dont have same keys
//   [
//     { Name: "Ryan", Age: "22", Location: "Hoboken", Role: "Student" },
//     { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
//   ],
// ]) {
//   try {
//     console.log(
//       sortAndFilter(
//         people,
//         ["name", "asc"],
//         ["location", "asc"],
//         "role",
//         "Student"
//       )
//     );
//     //  output Error thrown for all except last
//   } catch (error) {
//     console.log(error);
//   }
// }
// /* #endregion */

console.log("\n\n\n");
/* #region Array Object Correctness*/

for (let people of [
  //length check
  // [{ name: "Matt", age: "21", location: "New York", role: "Student" }],
  // //type check
  // [1, { name: "Matt", age: "21", location: "New York", role: "Student" }, true],
  // //empty object check
  // [{}, { name: "Matt", age: "21", location: "New York", role: "Student" }],

  //check for key names to be same for all objects
  [
    { Name: "Matt", age: "21", loc: "New York", role: "Student" },
    { name: "Matt", age: "21", location: "New York", role: "Student" },
  ],

  //all string inputs
  [
    { Name: "Matt", age: 21, loc: "New York", role: "Student" },
    { name: "Matt", age: "21", location: "New York", role: "Student" },
  ],
  [
    { name: "Matt", age: "21", location: "New York", role: "Student" },
    { name: "Matt", age: "21", location: "New York", role: " " },
  ],
]) {
  try {
    console.log(
      sortAndFilter(
        people,
        ["name", "asc"],
        ["location", "asc"],
        "role",
        "Student"
      )
    );
    /* output:

     */
  } catch (error) {
    console.log(error);
  }
}
/* #endregion */

/* #endregion */
/* #endregion */
