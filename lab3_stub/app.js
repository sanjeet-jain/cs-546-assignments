/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as movies from "./movies.js";

async function main(){
    try{
        const moviedata = await movies.getMovies();
        console.log (movieata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/

import * as movies from "./movies.js";
import * as users from "./users.js";

async function main() {
  //   try {
  //     const moviedata = await movies.getMovies();
  //     console.log(moviedata);
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   /* #region  getUserById test cases */
  //   [
  //     "48fded55-37cd-4e6b-8f19-e78b481a14a4",
  //     -1,
  //     1001,
  //     ,
  //     "",
  //     " ",
  //     null,
  //     "7989fa5e-5617-43f7-a931-46036f9dbcff",
  //   ].forEach(async (testData) => {
  //     try {
  //       const userdata = await users.getUserById(testData);
  //       console.log(userdata);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   });
  //   /* #endregion */

  /* #region  sameGenre test cases */
  [
    "action",
    "Action",
    "ACTION",
    "IMAX",
    ["Action"],
    123,
    true,
    null,
    undefined,
    NaN,
    "",
    " ",
  ].forEach(async (testData) => {
    try {
      const userdata = await users.sameGenre(testData);
      console.log(userdata);
    } catch (e) {
      console.log(e);
    }
  });
  /* #endregion */
}

main();
