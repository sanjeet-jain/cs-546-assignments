/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

/* #region ArrayUtils  */

import { sortAndFilter } from "./arrayUtils.js";

/* #region Array Correctness*/

for (let people of [
  [],
  null,
  NaN,
  undefined,
  1,
  { key: "value" },
  // it is an array but not of correct format!
  [{ abc: "Ryan", age: "22" }],
  //all objects dont have same keys
  [
    { Name: "Ryan", Age: "22", Location: "Hoboken1", Role: "Student" },
    { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
  ],
  //VALID
  [
    { name: "Ryan", age: "22", location: "Hoboken1", role: "Student" },
    { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
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
    //  output Error thrown for all except last
  } catch (error) {
    console.log(error);
  }
}
/* #endregion */

console.log();

/* #region Array Object Correctness*/

for (let people of [
  //length check -ERROR
  [{ name: "Matt", age: "21", location: "New York", role: "Student" }],
  //type check -ERROR
  [1, { name: "Matt", age: "21", location: "New York", role: "Student" }, true],
  //empty object check -ERROR
  [{}, { name: "Matt", age: "21", location: "New York", role: "Student" }],
  //check for key names to be same for all objects -ERROR
  [
    { Name: "Matt", age: "21", loc: "New York", role: "Student" },
    { name: "Matt", age: "21", location: "New York", role: "Student" },
  ],

  //all string inputs -ERROR
  [
    { Name: "Matt", age: 21, loc: "New York", role: "Student" },
    { name: "Matt", age: "21", location: "New York", role: "Student" },
  ],
  //empty space -ERROR
  [
    { name: "Matt", age: "21", location: "New York", role: "Student" },
    { name: "Matt", age: "21", location: "New York", role: " " },
  ],
  //valid
  [
    { name: "Matt", age: "21", location: "New York", role: "Student" },
    { name: "Matt", age: "21", location: "New Jersey", role: "Student" },
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
  } catch (error) {
    console.log(error);
    /* output
    Error: objects array length must be greater than 1
    Error: all array items arent object
    Error: an item within the array is empty or null
    Error: array with objects doesnt have same keys
    Error: not all objects have correct string values
    Error: not all objects have correct string values
    // last input should give valid result
    */
  }
}
/* #endregion */
console.log();

let people = [
  { name: "Matt", age: "21", location: "New York", role: "Student" },
  { name: "Matt", age: "21", location: "New Jersey", role: "Student" },
];
/* #region sortByField1 and sortByField2 Correctness*/

for (let sortByField1 of [
  [],
  null,
  NaN,
  undefined,
  1,
  { key: "value" },
  // not of correct length
  ["name"],
  // it is an array but not of correct format!
  ["name", { abc: "Ryan", age: "22" }],
  //correct format but empty space
  ["name", " "],
  // array of 2 elements but 1st param isnt a key
  ["hello", "asc"],
  // array of 2 elements but 2nd param isnt asc or desc
  ["name", "up"],
  //VALID
  ["name", "asc"],
]) {
  try {
    console.log(
      sortAndFilter(
        people,
        sortByField1,
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

for (let sortByField2 of [
  [],
  null,
  NaN,
  undefined,
  1,
  { key: "value" },
  // not of correct length
  ["name"],
  // it is an array but not of correct format!
  ["name", { abc: "Ryan", age: "22" }],
  //correct format but empty space
  ["name", " "],
  // array of 2 elements but 1st param isnt a key
  ["hello", "asc"],
  // array of 2 elements but 2nd param isnt asc or desc
  ["name", "up"],
  //VALID
  ["name", "asc"],
]) {
  try {
    console.log(
      sortAndFilter(people, ["name", "asc"], sortByField2, "role", "Student")
    );
    /* output:

     */
  } catch (error) {
    console.log(error);
  }
}
/* #endregion */
console.log();

/* #region filterBy and filterByTerm Correctness*/

for (let filterBy of [
  [],
  null,
  NaN,
  undefined,
  1,
  { key: "value" },
  "",
  " ",
  "name",
]) {
  try {
    console.log(
      sortAndFilter(
        people,
        ["name", "asc"],
        ["location", "asc"],
        filterBy,
        "Student"
      )
    );
    /* output:

     */
  } catch (error) {
    console.log(error);
  }
}
console.log();

for (let filterByTerm of [
  [],
  null,
  NaN,
  undefined,
  1,
  { key: "value" },
  "",
  " ",
  "Matt",
]) {
  try {
    console.log(
      sortAndFilter(
        people,
        ["name", "asc"],
        ["location", "asc"],
        "name",
        filterByTerm
      )
    );
    /* output:

       */
  } catch (error) {
    console.log(error);
  }
}

/* #endregion */
console.log("filterBy and filterByTerm Correctness");

/* #region Array cleanup*/

try {
  console.log(
    sortAndFilter(
      [
        {
          " name ": "    Matt ",
          age: " 21         ",
          location: "New York",
          role: "Student",
        },
        {
          name: "    Matt ",
          " age    ": " 21         ",
          location: "New Jersey",
          role: "Teacher",
        },
      ],
      [" name ", " asc "],
      [" location ", " asc "],
      "   role ",
      "    Student "
    )
  );
  //  output Error thrown for all except last
} catch (error) {
  console.log(error);
}
/* #endregion */
console.log();

/* #endregion */
