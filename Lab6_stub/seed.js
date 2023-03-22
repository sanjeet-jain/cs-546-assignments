import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import * as albums from "./data/albums.js";
import * as bands from "./data/bands.js";
async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const band = {
    title: "Pink Floyd",
    genre: ["Progressive Rock", "Psychedelic Rock", "Classic Rock"],
    website: "http://www.pinkfloyd.com",
    recordCompany: "EMI",
    groupMembers: [
      "Roger Waters",
      "David Gilmour",
      "Nick Mason",
      "Richard Wright",
      "Sid Barrett",
    ],
    yearBandWasFormed: 1965,
  };

  let insertedBand = await bands.create(
    band.title,
    band.genre,
    band.website,
    band.recordCompany,
    band.groupMembers,
    band.yearBandWasFormed
  );
  console.log(await bands.get(insertedBand._id));
  insertedBand = await bands.update(
    insertedBand._id,
    "Pink Floyd 2",
    band.genre,
    band.website,
    band.recordCompany,
    band.groupMembers,
    band.yearBandWasFormed
  );
  console.log(await bands.get(insertedBand._id));

  console.log("Done seeding database");

  await closeConnection();
}

await main();
