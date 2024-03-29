import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import * as albums from "./data/albums.js";
import * as bands from "./data/bands.js";
import { bandsData } from "./data/index.js";

export async function runSetup() {
  const band = {
    name: "Pink Floyd",
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
    band.name,
    band.genre,
    band.website,
    band.recordCompany,
    band.groupMembers,
    band.yearBandWasFormed
  );

  const album = {
    bandId: insertedBand._id,
    title: "Wish You Were Here 2",
    releaseDate: "12/12/1975",
    tracks: [
      "Shine On You Crazy Diamond, Pts. 1-5",
      "Welcome to the Machine",
      "Have a Cigar (Ft. Roy Harper)",
      "Wish You Were Here",
      "Shine On You Crazy Diamond, Pts. 6-9",
    ],
    rating: 5,
  };
  const updatedBand1 = await albums.create(
    album.bandId,
    "asfasfasf",
    album.releaseDate,
    album.tracks,
    album.rating
  );
  const updatedBand2 = await albums.create(
    album.bandId,
    "sadfsadf",
    album.releaseDate,
    album.tracks,
    4.5
  );

  console.log("Done seeding database");
  return await bandsData.get(insertedBand._id);
}
export async function seed() {
  const db = await dbConnection();
  await db.dropDatabase();
  await runSetup();
  await closeConnection();
}
