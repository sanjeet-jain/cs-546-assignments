/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

// /* #region ArrayUtils  */

// import { sortAndFilter, merge, matrixMultiply } from "./arrayUtils.js";

// /* #region  Sort and Filter */

// let people = [
//   { name: "Matt", age: "21", location: "New York", role: "Student" },
//   { name: "Matt", age: "21", location: "New Jersey", role: "Student" },
// ];
// console.log("\n\n Array Correctness");

// /* #region Array Correctness*/
// const arrayCorrectnessTest = [
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
//     { Name: "Ryan", Age: "22", Location: "Hoboken1", Role: "Student" },
//     { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
//   ],
//   //VALID
//   [
//     { name: "Ryan", age: "22", location: "Hoboken1", role: "Student" },
//     { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
//   ],
// ];

// arrayCorrectnessTest.forEach((people) => {
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
// });

// /* #endregion */

// console.log("\n\n Array Object Correctness");

// /* #region Array Object Correctness*/
// const data = [
//   //length check -ERROR
//   [{ name: "Matt", age: "21", location: "New York", role: "Student" }],
//   //type check -ERROR
//   [1, { name: "Matt", age: "21", location: "New York", role: "Student" }, true],
//   //empty object check -ERROR
//   [{}, { name: "Matt", age: "21", location: "New York", role: "Student" }],
//   //check for key names to be same for all objects -ERROR
//   [
//     { Name: "Matt", age: "21", loc: "New York", role: "Student" },
//     { name: "Matt", age: "21", location: "New York", role: "Student" },
//   ],

//   //all string inputs -ERROR
//   [
//     { Name: "Matt", age: 21, loc: "New York", role: "Student" },
//     { name: "Matt", age: "21", location: "New York", role: "Student" },
//   ],
//   //empty space -ERROR
//   [
//     { name: "Matt", age: "21", location: "New York", role: "Student" },
//     { name: "Matt", age: "21", location: "New York", role: " " },
//   ],
//   //valid
//   [
//     { name: "Matt", age: "21", location: "New York", role: "Student" },
//     { name: "Matt", age: "21", location: "New Jersey", role: "Student" },
//   ],
// ];

// data.forEach((people) => {
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
//   } catch (error) {
//     console.log(error);
//     /* output
//     Error: objects array length must be greater than 1
//     Error: all array items arent object
//     Error: an item within the array is empty or null
//     Error: array with objects doesnt have same keys
//     Error: not all objects have correct string values
//     Error: not all objects have correct string values
//     // last input should give valid result
//     */
//   }
// });

// /* #endregion */

// console.log("\n\n sortByField1 and sortByField2 Correctness");

// /* #region sortByField1 and sortByField2 Correctness*/

// for (let sortByField1 of [
//   [],
//   null,
//   NaN,
//   undefined,
//   1,
//   { key: "value" },
//   // not of correct length
//   ["name"],
//   // it is an array but not of correct format!
//   ["name", { abc: "Ryan", age: "22" }],
//   //correct format but empty space
//   ["name", " "],
//   // array of 2 elements but 1st param isnt a key
//   ["hello", "asc"],
//   // array of 2 elements but 2nd param isnt asc or desc
//   ["name", "up"],
//   //VALID
//   ["name", "asc"],
// ]) {
//   try {
//     console.log(
//       sortAndFilter(
//         people,
//         sortByField1,
//         ["location", "asc"],
//         "role",
//         "Student"
//       )
//     );
//     /* output:

//      */
//   } catch (error) {
//     console.log(error);
//   }
// }

// for (let sortByField2 of [
//   [],
//   null,
//   NaN,
//   undefined,
//   1,
//   { key: "value" },
//   // not of correct length
//   ["name"],
//   // it is an array but not of correct format!
//   ["name", { abc: "Ryan", age: "22" }],
//   //correct format but empty space
//   ["name", " "],
//   // array of 2 elements but 1st param isnt a key
//   ["hello", "asc"],
//   // array of 2 elements but 2nd param isnt asc or desc
//   ["name", "up"],
//   //VALID
//   ["name", "asc"],
// ]) {
//   try {
//     console.log(
//       sortAndFilter(people, ["name", "asc"], sortByField2, "role", "Student")
//     );
//     /* output:

//      */
//   } catch (error) {
//     console.log(error);
//   }
// }
// /* #endregion */
// console.log("\n\n filterBy and filterByTerm Correctness");

// /* #region filterBy and filterByTerm Correctness*/

// for (let filterBy of [
//   [],
//   null,
//   NaN,
//   undefined,
//   1,
//   { key: "value" },
//   "",
//   " ",
//   "role",
// ]) {
//   try {
//     console.log(
//       sortAndFilter(
//         people,
//         ["name", "asc"],
//         ["location", "asc"],
//         filterBy,
//         "Student"
//       )
//     );
//     /* output:

//      */
//   } catch (error) {
//     console.log(error);
//   }
// }
// console.log();

// for (let filterByTerm of [
//   [],
//   null,
//   NaN,
//   undefined,
//   1,
//   { key: "value" },
//   "",
//   " ",
//   "Matt",
// ]) {
//   try {
//     console.log(
//       sortAndFilter(
//         people,
//         ["name", "asc"],
//         ["location", "asc"],
//         "name",
//         filterByTerm
//       )
//     );
//     /* output:

//        */
//   } catch (error) {
//     console.log(error);
//   }
// }

// /* #endregion */
// console.log("\n\n  Array Cleanup");

// /* #region Array cleanup*/

// try {
//   console.log(
//     sortAndFilter(
//       [
//         {
//           " name ": "    Matt ",
//           age: " 21         ",
//           location: "New York",
//           role: "Student",
//         },
//         {
//           name: "    Matt ",
//           " age    ": " 21         ",
//           location: "New Jersey",
//           role: "Teacher",
//         },
//       ],
//       [" name ", " asc "],
//       [" location ", " asc "],
//       "   role ",
//       "    Student "
//     )
//   );
//   //  output Error thrown for all except last
// } catch (error) {
//   console.log(error);
// }
// /* #endregion */
// console.log("\n\n Sample test cases");

// /* #region  sample test cases */
// people = [
//   { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },

//   { name: "Matt", age: "21", location: "New York", role: "Student" },

//   { name: "Matt", age: "25", location: "New Jersey", role: "Student" },

//   { name: "Greg", age: "22", location: "New York", role: "Student" },

//   { name: "Mike", age: "21", location: "Chicago", role: "Teacher" },
// ];

// console.log(
//   sortAndFilter(people, ["name", "asc"], ["location", "asc"], "role", "Student")
// );

// /* output:

//   [{name: 'Greg', age: '22', location: 'New York', role: 'Student'},

//   {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'},

//   {name: 'Matt', age: '21', location: 'New York', role: 'Student'},

//   {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}]

//  */

// console.log(
//   sortAndFilter(
//     people,
//     ["name", "asc"],
//     ["location", "desc"],
//     "role",
//     "Student"
//   )
// );

// /* output:

//   [{name: 'Greg', age: '22', location: 'New York', role: 'Student'},

//   {name: 'Matt', age: '21', location: 'New York', role: 'Student'},

//   {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'},

//   {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}]

//  */

// console.log(
//   sortAndFilter(people, ["location", "asc"], ["name", "asc"], "age", "22")
// );

// /* output:

//   [{name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'},

//   {name: 'Greg', age: '22', location: 'New York', role: 'Student'}]

//  */
// try {
//   console.log(
//     sortAndFilter(people, ["ssn", "asc"], ["name", "asc"], "age", "22")
//   );
// } catch (error) {
//   console.log(error);
// }
// /* output:

//   Error: the sortByField1 is not a key in each object of the array

//  */
// try {
//   console.log(
//     sortAndFilter(people, ["location", "none"], ["name", "asc"], "age", "22")
//   );
// } catch (error) {
//   console.log(error);
// }
// /* output:

//   Error: the order of sortByField1 must be either 'asc' or 'desc'

//  */
// try {
//   console.log(
//     sortAndFilter(people, ["location", "asc"], ["name", "asc"], "phone", "22")
//   );
// } catch (error) {
//   console.log(error);
// }
// /* output:

//   Error: the filterBy key is not a key in each object of the array

//  */
// try {
//   console.log(sortAndFilter(["location", "asc"], ["name", "asc"], "age", "22"));
// } catch (error) {
//   console.log(error);
// }
// /* output:

//   Error: the array does not exist

//  */
// try {
//   console.log(
//     sortAndFilter(
//       ["string", {}],
//       ["location", "asc"],
//       ["name", "asc"],
//       "age",
//       "22"
//     )
//   );
// } catch (error) {
//   console.log(error);
// }
// /* output:

//   Error: each element in the array must be an object

//  */
// try {
//   console.log(
//     sortAndFilter(people, ["location", "asc"], ["name", "asc"], "age", 22)
//   );
// } catch (error) {
//   console.log(error);
// }
// /* output:

//   Error: the filterByTerm must be a string

//  */
// try {
//   console.log(
//     sortAndFilter(
//       [
//         { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
//         { name: "Greg", age: 22, location: "New York", role: "Student" },
//       ],
//       "location",
//       "age",
//       "22"
//     )
//   );
// } catch (error) {
//   console.log(error);
// }
// /* output:

//   Error: each value for each key in each object in the array must be a string

//  */
// /* #endregion */

// /* #endregion */

/* #region  merge */
// console.log("\n \n merge Function");
// const testCasesMerge = [
//   [
//     [3, 0, "Lab2", 2, "Aiden"],
//     ["CS-546", "Computer Science", 8, 15],
//     [6, 3, "! Patrick ", "! Patrick", 25, 29],
//     [" ! 1", ["!1", ["2"]], " !"],
//   ],
//   [(1, 2)],
//   [1],
//   ["1"],
//   [[[1, { key: 1 }], [[1]]]],
//   [],
//   undefined,
//   null,
//   NaN,
//   [" ", " ", ""],
// ];

// testCasesMerge.forEach((testCase) => {
//   try {
//     console.log(merge(testCase));
//   } catch (error) {
//     console.log(error);
//   }
// });
/* #endregion */

/* #region  matrix multiply */
// console.log("\n matrix multiply");
// const tests = [
//   [
//     [
//       [2, 3],
//       [3, 4],
//       [4, 5],
//     ],
//     [
//       [1, 1, 1],
//       [2, 2, 2],
//     ],
//     [[3], [2], [1]],
//   ],
//   [
//     [
//       [1, 2],
//       [3, 4],
//       [5, 6],
//       [7, 8],
//       [9, 10],
//     ],
//     [
//       [1, 2, 3],
//       [4, 5, 6],
//     ],
//   ],
//   [[[3, 5]], [[4], [4]]],
//   [[[2], [2]], [[2]]],
//   [],
//   [[[1, 2]], [["1"], [6]]],
//   [[[2]], [[2], [2]]],
//   [
//     [[2, 3], [3, 4], [4]],
//     [
//       [1, 1, 1],
//       [2, 2, 2],
//     ],
//     [[3], [2], [1]],
//   ],
//   [
//     [
//       [2, 3],
//       [3, 4],
//       [4, "5"],
//     ],
//     [
//       [1, 1, 1],
//       [2, 2, 2],
//     ],
//     [[3], [2], [1]],
//   ],
//   [[[2, 3]]],
// ];

// tests.forEach((test) => {
//   try {
//     console.log(matrixMultiply(...test));
//   } catch (error) {
//     console.log(error);
//   }
// });
/* #endregion */

/* #endregion */

/* #region  StringUtil.js */
import { palindromes, censorWords, distance } from "./stringUtils.js";
/* #region  palindrome */
// console.log("\n palindrom test");
// const testCasesPalindrome = [
//   [
//     "Madam",
//     "Loot",
//     "Was it a cat I saw?",
//     "Poor Dan is in a droop",
//     "Anna",
//     "Nope",
//   ],
//   ["@!$%%!@%"],
//   [],
//   "hi",
//   " ",
//   1,
//   [""],
//   [" a a"],
//   [""],
//   ["Anna"],
// ];

// testCasesPalindrome.forEach((element) => {
//   try {
//     console.log(palindromes(element));
//   } catch (error) {
//     console.log(error);
//   }
// });

/* #endregion */

/* #region  censorWords */
// let testCasesCensor = [
//   {
//     input:
//       "I like bread that has chocolate chips in it but I do not like lollipops",
//     badWords: ["bread", "chocolate", "pop"],
//   },
//   {
//     input:
//       "I like bread that has bread chocolate chips in it but I do not like lollipops",
//     badWords: ["bread", "chocolate", "pop"],
//   },
//   {
//     input:
//       "I like bread that has bread chocolate chips in it but I do not like lollipops",
//     badWords: ["bread", "chocolate chip", "pop"],
//   },
//   {
//     input:
//       "I like bread that has bread chocolate,chips in it but I do not like lollipops",
//     badWords: ["bread", "chocolate", "pop"],
//   },
//   {
//     input:
//       "I like bread that has bread chocolate,chips in it but I do not like lollipops",
//     badWords: ["bread", "chocolate chips", "pop"],
//   },
//   {
//     input: "I like bread that has bread bread in it but I do not like bread",
//     badWords: ["bread", "chocolate", "pop"],
//   },
//   {
//     input: " ",
//     badWords: [" ", "chocolate", "pop"],
//   },
//   {
//     input: " 1",
//     badWords: [" ", "chocolate", "pop"],
//   },
//   {
//     input: " 1",
//     badWords: [1, "chocolate", "pop"],
//   },
//   {
//     input: "",
//     badWords: [1, "chocolate", "pop"],
//   },
//   {
//     input: "",
//     badWords: ["", "chocolate", "pop"],
//   },
//   {
//     input: "123",
//     badWords: { key: 1 },
//   },
//   {
//     input: ["1234", "chocolate", "pop"],
//   },
// ];

// testCasesCensor.forEach((testCase) => {
//   try {
//     console.log(censorWords(testCase.input, testCase.badWords));
//   } catch (error) {
//     console.log(error);
//   }
// });

/* #endregion */

/* #region  distance */
// const testCasesDistance = [
//   { sentence: "Patrick", firstWord: "Patrick", secondWord: "Patrick" },

//   { sentence: [], firstWord: true, secondWord: undefined },
//   { sentence: undefined, firstWord: undefined, secondWord: undefined },
//   {
//     valid: 5,
//     sentence: "The brown dog fox jumped over the lazy dog",
//     firstWord: "fox",
//     secondWord: "dog",
//   },
//   {
//     sentence: "The brown fox jumped over the lazy dog",
//     firstWord: ",",
//     secondWord: "dog",
//   },
//   { sentence: "!@#", firstWord: "!@$", secondWord: "!@$" },
//   { sentence: "123", firstWord: "123", secondWord: "!@$" },
//   { sentence: "", firstWord: "", secondWord: "" },
//   { sentence: "Hello World!", firstWord: " !?!", secondWord: " ... " },
//   { sentence: "1", firstWord: "1", secondWord: "" },
//   { sentence: " ", firstWord: "1", secondWord: "1" },
//   { sentence: 123, firstWord: "CS", secondWord: "Patrick" },
//   { sentence: "Hello there", firstWord: "hello", secondWord: "" },
//   {
//     sentence: "Give me music suggestions",
//     firstWord: "rock",
//     secondWord: "pop",
//   },
//   {
//     sentence: "Bob met Adam on wednesday",
//     firstWord: "Adam",
//     secondWord: "Bob",
//   },
//   {
//     sentence: "I was going to buy preworkout powder yesterday",
//     firstWord: "going to",
//     secondWord: "workout powder",
//   },
//   {
//     valid: 5,
//     sentence: "The brown fox jumped, over the lazy dog",
//     firstWord: "fox",
//     secondWord: "dog",
//   },

//   {
//     valid: 5,
//     sentence: "The brown fox jumped over the lazy dog",
//     firstWord: "fox",
//     secondWord: "dog",
//   }, //5
//   {
//     valid: 2,
//     sentence: "I was going to buy workout powder yesterday",
//     firstWord: "going to",
//     secondWord: "workout powder",
//   }, //2
//   {
//     valid: 2,
//     sentence: "I was going to buy workout-powder yesterday",
//     firstWord: "going to",
//     secondWord: "workout-powder",
//   }, //2
//   {
//     valid: 5,
//     sentence: "  The brown fox jumped over the lazy dog as a fox",
//     firstWord: "fox",
//     secondWord: "dog",
//   }, //5
//   {
//     valid: 2,
//     sentence: "I really hope it will snow soon because I like snow",
//     firstWord: "I",
//     secondWord: "snow",
//   }, //2
//   {
//     valid: 4,
//     sentence: "I like sweet and salty but I like sweet more",
//     firstWord: "salty",
//     secondWord: "sweet",
//   }, //4
//   {
//     valid: 3,
//     sentence: "sphinx of black quartz, judge my vow",
//     firstWord: "QUARTZ",
//     secondWord: "vOW",
//   }, //3
// ];

// testCasesDistance.forEach((testCase) => {
//   try {
//     if (testCase.valid) {
//       console.log("\nvalid test case:");
//     }
//     let result = distance(
//       testCase.sentence,
//       testCase.firstWord,
//       testCase.secondWord
//     );
//     console.log(testCase.sentence);
//     console.log(result);
//     console.log(testCase.valid);
//     if (!testCase.valid) {
//       console.log("this was an error case passing as valid");
//     }
//   } catch (error) {
//     if (testCase.valid) {
//       console.log("this was a valid test case with error");
//     }
//     console.log(error);
//   }
// });
/* #endregion */

/* #endregion */

/* #region  ObjectUtils.js */

/* #endregion */
