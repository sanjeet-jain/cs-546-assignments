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
  console.log("create \n", pinkFloyd);
  console.log();
  console.log("get \n", await bands.get(pinkFloyd._id));
  console.log();
  const removeFloyd = await bands.remove(pinkFloyd._id);
  console.log("remove");
  console.log(removeFloyd);

  // 2. Log the newly created band. (Just that band, not all bands)

  // 3. Create another band of your choice.
  // 4. Query all bands, and log them all
  // 5. Create the 3rd band of your choice.
  // 6. Log the newly created 3rd band. (Just that band, not all bands)
  // 7. Rename the first band
  // 8. Log the first band with the updated name.
  // 9. Remove the second band you created.
  // 10. Query all bands, and log them all
  // 11. Try to create a band with bad input parameters to make sure it throws errors.
  // 12. Try to remove a band that does not exist to make sure it throws errors.
  // 13. Try to rename a band that does not exist to make sure it throws errors.
  // 14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
  // 15. Try getting a band by ID that does not exist to make sure it throws errors.

  await closeConnection();
  console.log("Done!");
}

main();
