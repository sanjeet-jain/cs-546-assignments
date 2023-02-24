/*

1. Create a band of your choice.
2. Log the newly created band. (Just that band, not all bands)
3. Create another band of your choice.
4. Query all bands, and log them all
5. Create the 3rd band of your choice.
6. Log the newly created 3rd band. (Just that band, not all bands)
7. Rename the first band
8. Log the first band with the updated name. 
9. Remove the second band you created.
10. Query all bands, and log them all
11. Try to create a band with bad input parameters to make sure it throws errors.
12. Try to remove a band that does not exist to make sure it throws errors.
13. Try to rename a band that does not exist to make sure it throws errors.
14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a band by ID that does not exist to make sure it throws errors.

*/
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import * as bands from "./data/bands.js";

async function main() {
  // 1. Create a band of your choice.
  const db = await dbConnection();
  await db.dropDatabase();
  const pinkFloyd = await bands.create(
    "Pink Floyd Alternative ",
    ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
    "http://www.pinkfloyd.com",
    "EMI",
    [
      "Roger Waters",
      "David Gilmour",
      "Nick Mason",
      "Richard Wright",
      "Sid Barrett",
    ],
    1965
  );

  // 2. Log the newly created band. (Just that band, not all bands)
  console.log(await bands.get(pinkFloyd._id));

  // 3. Create another band of your choice.
  const deathRow = await bands.create(
    "Death Row",
    ["gang$ta"],
    "http://www.deathrow!@#!$!@#@$%%.com",
    "Death Row",
    ["snoop dogg", "2pac", "dr.dre", "Biggie"],
    1980
  );

  // 4. Query all bands, and log them all
  console.log(await bands.getAll());

  // 5. Create the 3rd band of your choice.
  const dumbExample = await bands.create(
    "   Dumb a$$ title with spaces at the end and start :)   ",
    [" DuMb Genre With SPaces "],
    " http://www. dumb website with space in the middle .com ",
    " dumb stupid lab 3 test case with stupid space ",
    [" PatriCk AI "],
    2023
  );

  // 6. Log the newly created 3rd band. (Just that band, not all bands)
  console.log(await bands.get(dumbExample._id));

  // 7. Rename the first band
  await bands.rename(pinkFloyd._id, " i dont care anymore :) ");

  // 8. Log the first band with the updated name.
  console.log(await bands.get(pinkFloyd._id));

  // 9. Remove the second band you created.
  await bands.remove(deathRow._id);
  // 10. Query all bands, and log them all
  console.log(await bands.getAll());

  // 11. Try to create a band with bad input parameters to make sure it throws errors.
  try {
    await bands.create(
      "",
      ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
      "http://www.pinkfloyd.com",
      "EMI",
      [
        "Roger Waters",
        "David Gilmour",
        "Nick Mason",
        "Richard Wright",
        "Sid Barrett",
      ],
      1965
    );
  } catch (error) {
    console.log(error);
  }
  // 12. Try to remove a band that does not exist to make sure it throws errors.
  try {
    await bands.remove(pinkFloyd._id);
  } catch (error) {
    console.log(error);
  }
  // 13. Try to rename a band that does not exist to make sure it throws errors.
  try {
    await bands.rename(pinkFloyd._id, "no body cares :)");
  } catch (error) {
    console.log(error);
  }
  // 14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
  try {
    await bands.rename(dumbExample._id);
  } catch (error) {
    console.log(error);
  }
  // 15. Try getting a band by ID that does not exist to make sure it throws errors.
  try {
    await bands.get(deathRow._id);
  } catch (error) {
    console.log(error);
  }

  await closeConnection();
  console.log("Done!");
}

main();
