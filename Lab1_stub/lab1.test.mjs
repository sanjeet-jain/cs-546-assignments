import * as lab1 from "./lab1.mjs";
//TODO: Write and call each function in lab1.js 5 times each, passing in different input
// Assumption : we are passing only valid inputs to all functions

// testing question 1
console.log(lab1.questionOne([])); // returns { '0': true }
console.log(lab1.questionOne([0, 0])); // returns { '0': true }
console.log(lab1.questionOne([1, 2, 0, 10, 9])); // returns { '1738': false }
console.log(lab1.questionOne([5, 3, 10, 11, 99, 123124, 1245125, 1253])); // returns { '1932228945368172800': false }
console.log(lab1.questionOne([214121, 12425, 2345, 1234, 124321])); // returns { '1.932921821821283e+21': false }
console.log();

// testing question 2
console.log(lab1.questionTwo([])); // Returns and then outputs [true]
console.log(lab1.questionTwo([1])); // Returns and then outputs [true]
console.log(lab1.questionTwo([1, 0])); // Returns and then outputs [true]
console.log(lab1.questionTwo([1, 2, 3, 4, 5, 6, 7])); // Returns and then outputs [true]
console.log(lab1.questionTwo([1, 2, 3, 4, 8, 6, 0, 9, 0, 11])); // Returns and then outputs [ 4, 5, false ]
console.log(lab1.questionTwo([0, 1, 2, 11, 12, 111, 0])); // Returns and then outputs [ 5,6, false ]
console.log();

// testing question 3
console.log(lab1.questionThree({ a: 1, b: 2, c: 3 }, { c: 10, a: 20, b: 30 })); // Returns and then outputs {a:true, b:true, c:true}
console.log(
  lab1.questionThree(
    { a: 1, b: 2, c: 3, d: 4 },
    { g: 10, b: 20, e: 30, d: 40, c: 50, a: 60 }
  )
); // Returns and then outputs {a:true, b:true, c:true, d:true, e:false, f:false}
console.log(lab1.questionThree({ g: 1, 1: 2, c: 3 }, { c: 10, a: 20, 1: 30 })); // Returns and then outputs { '1': true, c: true, g: false, a: false }
console.log(lab1.questionThree({ a: 1, b: 2, c: 3 }, {})); // Returns and then outputs { a: false, b: false, c: false }
console.log(lab1.questionThree({ 1: 1 }, {})); // Returns and then outputs { '1': false }
console.log();

//testing question 4
console.log(
  lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
Shudong,Hao,cs570`)
);
//should return and then log [["Patrick", "Hill", "cs546"],["Jared", "Bass", "cs115"], ["Shudong", "Hao", "cs570"]]

// test case for whitespace cleanup as well
console.log(
  lab1.questionFour(` a,b,c
            j,      b,      c
    S , H ,c    `)
);
//should return and then log [ [ 'a', 'b', 'c' ], [ 'j', 'b', 'c' ], [ 'S', 'H', 'c' ] ]

// test case that should allow an empty array for an empty row
console.log(
  lab1.questionFour(` aasd,b12,c124

              j412,      b421,      c412
      1 , 2 ,3    `)
);
//should return and then log  [ 'aasd', 'b12', 'c124' ], [ '' ], [ 'j412', 'b421', 'c412' ], [ '1', '2', '3'

console.log(lab1.questionFour(``)); // should return [ [ '' ] ]

console.log();
