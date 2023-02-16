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
  /* #region  getUserById test cases */
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
  /* #endregion */
  /* #region  sameGenre test cases */
  // [
  //   "action",
  //   "Action",
  //   "ACTION",
  //   "IMAX",
  //   "(no genres listed)",
  //   "(No GENRES LisTed)",
  //   ["Action"],
  //   123,
  //   true,
  //   null,
  //   undefined,
  //   NaN,
  //   "",
  //   " ",
  // ].forEach(async (testData) => {
  //   try {
  //     const userdata = await users.sameGenre(testData);
  //     console.log(userdata);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
  /* #endregion */
  /* #region  moviesReviewed test cases */
  // [
  //   "64035fad-a5b7-48c9-9317-3e31e22fe26c",
  //   "7989fa5e-5617-43f7-a931-46036f9dbcff",
  //   -1,
  //   1001,
  //   ,
  //   "",
  //   " ",
  //   null,
  // ].forEach(async (testData) => {
  //   try {
  //     const userdata = await users.moviesReviewed(testData);
  //     console.log(userdata);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
  /* #endregion */
  /* #region  referMovies test cases */
  // [
  //   "7989fa5e-5617-43f7-a931-46036f9dbcff",
  //   "5060fc9e-10c7-4f38-9f3d-47b7f477568b",
  //   -1,
  //   1001,
  //   ,
  //   "",
  //   " ",
  //   null,
  // ].forEach(async (testData) => {
  //   try {
  //     const userdata = await users.referMovies(testData);
  //     console.log(userdata);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
  /* #endregion */
  /* #region  getMovieById test cases */
  // [
  //   "38fd6885-0271-4650-8afd-6d09f3a890a2",
  //   "7989fa5e-5617-43f7-a931-46036f9dbcff",
  //   -1,
  //   1001,
  //   ,
  //   "",
  //   " ",
  //   null,
  // ].forEach(async (testData) => {
  //   try {
  //     const userdata = await movies.getMovieById(testData);
  //     console.log(userdata);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
  /* #endregion */
  /* #region  findMoviesByDirector test cases */
  // [
  //   "Fernando Dollimore",
  //   "7989fa5e-5617-43f7-a931-46036f9dbcff",
  //   -1,
  //   1001,
  //   ,
  //   "",
  //   " ",
  //   null,
  // ].forEach(async (testData) => {
  //   try {
  //     const userdata = await movies.findMoviesByDirector(testData);
  //     console.log(userdata);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
  /* #endregion */
  /* #region  findMoviesByCastMember test cases */
  [
    "Fernando Dollimore",
    "Huberto Snoddon",
    "Huberto Snoddon".toUpperCase(),
    ,
    -1,
    1001,
    ,
    "",
    " ",
    null,
  ].forEach(async (testData) => {
    try {
      const userdata = await movies.findMoviesByCastMember(testData);
      console.log(userdata);
    } catch (e) {
      console.log(e);
    }
  });
  /* #endregion */
}

main();
