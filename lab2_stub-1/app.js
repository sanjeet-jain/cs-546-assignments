/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import { sortAndFilter } from "./arrayUtils.js";

let people = [
  //   { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
  //   { name: "Matt", age: "21", location: "New York", role: "Student" },
  //   { name: "Matt", age: "25", location: "New Jersey", role: "Student" },
  //   { name: "Greg", age: "22", location: "New York", role: "Student" },
  //   { name: "Mike", age: "21", location: "Chicago", role: "Teacher" },
];
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
    [{name: 'Greg', age: '22', location: 'New York', role: 'Student'},
    {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'},
    {name: 'Matt', age: '21', location: 'New York', role: 'Student'},
    {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}] 
     */
} catch (error) {
  console.log(error);
}
