/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

/* #region ArrayUtils  */

import { sortAndFilter } from "./arrayUtils.js";
let people = [
  { name: "Matt", age: "21", location: "New York", role: "Student" },
  { name: "Matt", age: "21", location: "New Jersey", role: "Student" },
];
console.log("\n\n Array Correctness");

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

console.log("\n\n Array Object Correctness");

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

console.log("\n\n sortByField1 and sortByField2 Correctness");

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
console.log("\n\n filterBy and filterByTerm Correctness");

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
console.log("\n\n  Array Cleanup");

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
console.log("\n\n Sample test cases");

/* #region  sample test cases */
people = [
  { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },

  { name: "Matt", age: "21", location: "New York", role: "Student" },

  { name: "Matt", age: "25", location: "New Jersey", role: "Student" },

  { name: "Greg", age: "22", location: "New York", role: "Student" },

  { name: "Mike", age: "21", location: "Chicago", role: "Teacher" },
];

console.log(
  sortAndFilter(people, ["name", "asc"], ["location", "asc"], "role", "Student")
);

/* output:
  
  [{name: 'Greg', age: '22', location: 'New York', role: 'Student'},
  
  {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'},
  
  {name: 'Matt', age: '21', location: 'New York', role: 'Student'},
  
  {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}]
  
 */

console.log(
  sortAndFilter(
    people,
    ["name", "asc"],
    ["location", "desc"],
    "role",
    "Student"
  )
);

/* output:
  
  [{name: 'Greg', age: '22', location: 'New York', role: 'Student'},
  
  {name: 'Matt', age: '21', location: 'New York', role: 'Student'},
  
  {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'},
  
  {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}]
  
 */

console.log(
  sortAndFilter(people, ["location", "asc"], ["name", "asc"], "age", "22")
);

/* output:
  
  [{name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'},
  
  {name: 'Greg', age: '22', location: 'New York', role: 'Student'}]
  
 */
try {
  console.log(
    sortAndFilter(people, ["ssn", "asc"], ["name", "asc"], "age", "22")
  );
} catch (error) {
  console.log(error);
}
/* output:
  
  Error: the sortByField1 is not a key in each object of the array
  
 */
try {
  console.log(
    sortAndFilter(people, ["location", "none"], ["name", "asc"], "age", "22")
  );
} catch (error) {
  console.log(error);
}
/* output:
  
  Error: the order of sortByField1 must be either 'asc' or 'desc'
  
 */
try {
  console.log(
    sortAndFilter(people, ["location", "asc"], ["name", "asc"], "phone", "22")
  );
} catch (error) {
  console.log(error);
}
/* output:
  
  Error: the filterBy key is not a key in each object of the array
  
 */
try {
  console.log(sortAndFilter(["location", "asc"], ["name", "asc"], "age", "22"));
} catch (error) {
  console.log(error);
}
/* output:
  
  Error: the array does not exist
  
 */
try {
  console.log(
    sortAndFilter(
      ["string", {}],
      ["location", "asc"],
      ["name", "asc"],
      "age",
      "22"
    )
  );
} catch (error) {
  console.log(error);
}
/* output:
  
  Error: each element in the array must be an object
  
 */
try {
  console.log(
    sortAndFilter(people, ["location", "asc"], ["name", "asc"], "age", 22)
  );
} catch (error) {
  console.log(error);
}
/* output:
  
  Error: the filterByTerm must be a string
  
 */
try {
  console.log(
    sortAndFilter(
      [
        { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
        { name: "Greg", age: 22, location: "New York", role: "Student" },
      ],
      "location",
      "age",
      "22"
    )
  );
} catch (error) {
  console.log(error);
}
/* output:
  
  Error: each value for each key in each object in the array must be a string
  
 */
/* #endregion */
/* #endregion */
