import * as bands from "./data/bands.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import * as bandsMongo from "./config/mongoCollections.js";

let bandCollection;
let bandId;
const dumbExample = {
  name: "   Dumb a$$ title with spaces at the end and start :)   ",
  genre: [" DuMb Genre With SPaces "],
  website: " http:// dumb website with space in the middle .com ",
  recordCompany: " dumb stupid lab 3 test case with stupid space ",
  groupMembers: [" PatriCk AI "],
  yearBandWasFormed: 2023,
};
beforeAll(async () => {
  const db = await dbConnection();
  await db.dropDatabase();
  bandCollection = await bandsMongo.bands();

  const insertedBand = await bandCollection.insertOne(dumbExample);
  bandId = insertedBand.insertedId.toString();
});
afterEach(async () => {
  await bandCollection.deleteMany({});
  jest.restoreAllMocks();
  const insertedBand = await bandCollection.insertOne(dumbExample);
  bandId = insertedBand.insertedId.toString();
});

afterAll(async () => {
  await closeConnection();
});

describe("band.js create Invalid Tests", () => {
  test("throws an error if required fields are not provided", async () => {
    await expect(bands.create()).rejects.toEqual(
      "Error: name is null or empty!"
    );
  });
  test("throws an error if name is not a non-empty string", async () => {
    await expect(
      bands.create(
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
      )
    ).rejects.toEqual("Error: name is null or empty!");
  });

  test("throws an error if website is not a non-empty string", async () => {
    await expect(
      bands.create(
        "Pink Floyd Alternative",
        ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
        "",
        "EMI",
        [
          "Roger Waters",
          "David Gilmour",
          "Nick Mason",
          "Richard Wright",
          "Sid Barrett",
        ],
        1965
      )
    ).rejects.toEqual("Error: website is null or empty!");
  });

  test("throws an error if website is not a non-empty string", async () => {
    await expect(
      bands.create(
        "Pink Floyd Alternative",
        ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
        "       ",
        "EMI",
        [
          "Roger Waters",
          "David Gilmour",
          "Nick Mason",
          "Richard Wright",
          "Sid Barrett",
        ],
        1965
      )
    ).rejects.toEqual("Error: website is not a valid string");
  });

  test("throws an error if recordCompany is not a non-empty string", async () => {
    await expect(
      bands.create(
        "Pink Floyd Alternative",
        ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
        "http://www.pinkfloyd.com",
        "",
        [
          "Roger Waters",
          "David Gilmour",
          "Nick Mason",
          "Richard Wright",
          "Sid Barrett",
        ],
        1965
      )
    ).rejects.toEqual("Error: recordCompany is null or empty!");
  });

  test("throws an error if name, website, recordCompany are not strings or are empty strings", async () => {
    await expect(
      bands.create(
        1,
        ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
        "http://www.pinkfloyd.com",
        {},
        [
          "Roger Waters",
          "David Gilmour",
          "Nick Mason",
          "Richard Wright",
          "Sid Barrett",
        ],
        1965
      )
    ).rejects.toEqual("Error: recordCompany is null or empty!");

    await expect(
      bands.create(
        "Pink Floyd Alternative",
        ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
        1234,
        "EMI",
        [
          "Roger Waters",
          "David Gilmour",
          "Nick Mason",
          "Richard Wright",
          "Sid Barrett",
        ],
        1965
      )
    ).rejects.toEqual("Error: website is not a valid string");

    await expect(
      bands.create(
        "Pink Floyd Alternative",
        ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
        "http://www.pinkfloyd.com",
        [],
        [
          "Roger Waters",
          "David Gilmour",
          "Nick Mason",
          "Richard Wright",
          "Sid Barrett",
        ],
        1965
      )
    ).rejects.toEqual("Error: recordCompany is null or empty!");
  });
  test("throws an error if genre is not an array of non-empty strings", async () => {
    await expect(
      bands.create(
        "The Beatles",
        ["Rock", "", "Pop"],
        "http://www.thebeatles.com",
        "EMI",
        ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
        1960
      )
    ).rejects.toEqual("Error: genre must be an array of non-empty strings");
  });

  test("throws an error if any input is an empty string with spaces", async () => {
    await expect(
      bands.create(
        "  ",
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
      )
    ).rejects.toEqual("Error: name is not a valid string");
  });

  test("throws an error if website does not meet the format requirements", async () => {
    await expect(
      bands.create(
        "Pink Floyd",
        ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
        "pinkfloyd.com",
        "EMI",
        [
          "Roger Waters",
          "David Gilmour",
          "Nick Mason",
          "Richard Wright",
          "Sid Barrett",
        ],
        1965
      )
    ).rejects.toEqual(
      "Error: Website must be a valid URL starting with http://www. and ending in .com and have at least 5 characters in-between"
    );
  });

  test("throws an error if website does not start with http://www.", async () => {
    await expect(
      bands.create(
        "Led Zeppelin",
        ["Hard rock", "Blues rock", "Heavy metal"],
        "www.ledzeppelin.com",
        "Atlantic Records",
        ["Jimmy Page", "Robert Plant", "John Paul Jones", "John Bonham"],
        1968
      )
    ).rejects.toEqual(
      "Error: Website must be a valid URL starting with http://www. and ending in .com and have at least 5 characters in-between"
    );
  });

  test("throws an error if website does not end with .com", async () => {
    await expect(
      bands.create(
        "AC/DC",
        ["Hard rock", "Blues rock", "Heavy metal"],
        "http://www.acdc.net",
        "Columbia Records",
        [
          "Angus Young",
          "Malcolm Young",
          "Bon Scott",
          "Brian Johnson",
          "Phil Rudd",
          "Cliff Williams",
        ],
        1973
      )
    ).rejects.toEqual(
      "Error: Website must be a valid URL starting with http://www. and ending in .com and have at least 5 characters in-between"
    );
  });

  test("throws an error if website does not have at least 5 characters between http://www. and .com", async () => {
    await expect(
      bands.create(
        "Metallica",
        ["Heavy metal", "Thrash metal"],
        "http://www.metallica.tv",
        "Blackened Recordings",
        ["James Hetfield", "Lars Ulrich", "Kirk Hammett", "Robert Trujillo"],
        1981
      )
    ).rejects.toEqual(
      "Error: Website must be a valid URL starting with http://www. and ending in .com and have at least 5 characters in-between"
    );
  });

  test("throws an error if genre is not an array or empty", async () => {
    await expect(
      bands.create(
        "The Beatles",
        "Rock",
        "http://www.thebeatles.com",
        "Apple Corps",
        ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
        1960
      )
    ).rejects.toEqual("Error: genre is not a valid array");
  });

  test("throws an error if genre array contains empty string", async () => {
    await expect(
      bands.create(
        "Led Zeppelin",
        ["Hard Rock", "", "Heavy Metal"],
        "http://www.ledzeppelin.com",
        "Atlantic Records",
        ["Jimmy Page", "Robert Plant", "John Bonham", "John Paul Jones"],
        1968
      )
    ).rejects.toEqual("Error: genre must be an array of non-empty strings");
  });

  test("throws an error if groupMembers is not an array or empty", async () => {
    await expect(
      bands.create(
        "The Rolling Stones",
        ["Rock", "Blues", "Rock and Roll"],
        "http://www.rollingstones.com",
        "Interscope Records",
        "Mick Jagger, Keith Richards, Charlie Watts, Ronnie Wood",
        1962
      )
    ).rejects.toEqual("Error: groupMembers is not a valid array");
  });

  test("throws an error if groupMembers array contains empty string", async () => {
    await expect(
      bands.create(
        "Queen",
        ["Rock", "Pop", "Glam Rock"],
        "http://www.queenonline.com",
        "EMI",
        ["Freddie Mercury", "Brian May", "John Deacon", ""],
        1970
      )
    ).rejects.toEqual(
      "Error: groupMembers must be an array of non-empty strings"
    );
  });

  test("throws an error if genre and groupMembers are not arrays or contain invalid strings", async () => {
    await expect(
      bands.create(
        "AC/DC",
        "Rock",
        "http://www.acdc.com",
        "Albert Productions",
        ["Brian Johnson", 123, ""],
        1973
      )
    ).rejects.toEqual("Error: genre is not a valid array");
  });

  test("throws an error if yearBandWasFormed is not a number", async () => {
    await expect(
      bands.create(
        "Led Zeppelin",
        ["Hard Rock", "Blues Rock", "Heavy Metal"],
        "http://www.ledzeppelin.com",
        "Atlantic Records",
        ["Robert Plant", "Jimmy Page", "John Paul Jones", "John Bonham"],
        "1968"
      )
    ).rejects.toEqual("Error: yearBandWasFormed is not a valid number");
  });

  test("throws an error if yearBandWasFormed is less than 1900", async () => {
    await expect(
      bands.create(
        "Led Zeppelin",
        ["Hard Rock", "Blues Rock", "Heavy Metal"],
        "http://www.ledzeppelin.com",
        "Atlantic Records",
        ["Robert Plant", "Jimmy Page", "John Paul Jones", "John Bonham"],
        1899
      )
    ).rejects.toEqual("Error: yearBandWasFormed is not between 1900 to 2023");
  });

  test("throws an error if yearBandWasFormed is greater than 2023", async () => {
    await expect(
      bands.create(
        "Led Zeppelin",
        ["Hard Rock", "Blues Rock", "Heavy Metal"],
        "http://www.ledzeppelin.com",
        "Atlantic Records",
        ["Robert Plant", "Jimmy Page", "John Paul Jones", "John Bonham"],
        2024
      )
    ).rejects.toEqual("Error: yearBandWasFormed is not between 1900 to 2023");
  });

  test("throws an error if the band cannot be created", async () => {
    const name = "AC/DC";
    const genre = ["Rock"];
    const website = "http://www.pinkfloyd.com";
    const recordCompany = "Alberts";
    const groupMembers = [
      "Brian Johnson",
      "Angus Young",
      "Phil Rudd",
      "Cliff Williams",
    ];
    const yearBandWasFormed = 1973;

    jest.spyOn(bandCollection, "insertOne").mockImplementation(() => ({
      acknowledged: false,
      insertedId: null,
    }));

    await expect(
      bands.create(
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed
      )
    ).rejects.toEqual("Error: Could not add band");
  });

  test("throws an error if the band cannot be created", async () => {
    const name = "AC/DC";
    const genre = ["Rock"];
    const website = "http://www.12345.com";
    const recordCompany = "Alberts";
    const groupMembers = [
      "Brian Johnson",
      "Angus Young",
      "Phil Rudd",
      "Cliff Williams",
    ];
    const yearBandWasFormed = 1973;

    jest.spyOn(bandCollection, "insertOne").mockImplementation(() => ({
      acknowledged: true,
      insertedId: null,
    }));

    await expect(
      bands.create(
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed
      )
    ).rejects.toEqual("Error: Could not add band");
  });

  test("throws an error if the band cannot be created", async () => {
    const name = "AC/DC";
    const genre = ["Rock"];
    const website = "http://www.floyd.com";
    const recordCompany = "Alberts";
    const groupMembers = [
      "Brian Johnson",
      "Angus Young",
      "Phil Rudd",
      "Cliff Williams",
    ];
    const yearBandWasFormed = 1973;

    jest.spyOn(bandCollection, "insertOne").mockImplementation(() => ({
      acknowledged: false,
      insertedId: "123124",
    }));

    await expect(
      bands.create(
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed
      )
    ).rejects.toEqual("Error: Could not add band");
  });

  test("throws an error if the band is not there in db", async () => {
    const name = "AC/DC";
    const genre = ["Rock"];
    const website = "http://www.floyd.com";
    const recordCompany = "Alberts";
    const groupMembers = [
      "Brian Johnson",
      "Angus Young",
      "Phil Rudd",
      "Cliff Williams",
    ];
    const yearBandWasFormed = 1973;

    jest.spyOn(bandCollection, "insertOne").mockImplementation(() => ({
      acknowledged: true,
      insertedId: "123124",
    }));

    await expect(
      bands.create(
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed
      )
    ).rejects.toEqual("Error: id is not a valid ObjectId string");
  });
});

describe("band.js create Valid Tests", () => {
  test("creates a band properly", async () => {
    const newBand = await bands.create(
      "Pink Floyd Alternative",
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

    expect(newBand._id).toBeTruthy();
    expect(newBand.name).toBe("Pink Floyd Alternative");
    expect(newBand.genre).toEqual([
      "Progressive Rock",
      "Psychedelic rock",
      "Classic Rock",
    ]);
    expect(newBand.groupMembers).toEqual([
      "Roger Waters",
      "David Gilmour",
      "Nick Mason",
      "Richard Wright",
      "Sid Barrett",
    ]);
    expect(newBand.recordCompany).toBe("EMI");
    expect(newBand.website).toBe("http://www.pinkfloyd.com");
    expect(newBand.yearBandWasFormed).toBe(1965);
  });
});

describe("band.js get Valid Tests", () => {
  test("should return a band when given a valid id", async () => {
    const band = await bands.create(
      "Pink Floyd Alternative",
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

    const newBand = await bands.get(band._id);
    expect(newBand._id).toBeTruthy();
    expect(newBand.name).toBe("Pink Floyd Alternative");
    expect(newBand.genre).toEqual([
      "Progressive Rock",
      "Psychedelic rock",
      "Classic Rock",
    ]);
    expect(newBand.groupMembers).toEqual([
      "Roger Waters",
      "David Gilmour",
      "Nick Mason",
      "Richard Wright",
      "Sid Barrett",
    ]);
    expect(newBand.recordCompany).toBe("EMI");
    expect(newBand.website).toBe("http://www.pinkfloyd.com");
    expect(newBand.yearBandWasFormed).toBe(1965);
  });
  test("should return a band when given a valid id", async () => {
    const newBand = await bands.get(bandId);
    expect(newBand._id).toBe(bandId);
    expect(newBand.name).toEqual(dumbExample.name);
    expect(newBand.genre).toEqual(dumbExample.genre);
    expect(newBand.groupMembers).toEqual(dumbExample.groupMembers);
    expect(newBand.recordCompany).toEqual(dumbExample.recordCompany);
    expect(newBand.website).toEqual(dumbExample.website);
    expect(newBand.yearBandWasFormed).toEqual(dumbExample.yearBandWasFormed);
  });
});

describe("band.js get Invalid Tests", () => {
  test("should throw an error if no id is provided", async () => {
    await expect(bands.get()).rejects.toEqual("Error: id is null or empty!");
  });

  test("should throw an error if the id provided is not a string or is an empty string", async () => {
    await expect(bands.get(123)).rejects.toEqual(
      "Error: id is not a valid ObjectId string"
    );
    await expect(bands.get("")).rejects.toEqual("Error: id is null or empty!");
  });

  test("should throw an error if the id provided is not a valid ObjectId", async () => {
    await expect(bands.get("invalid_id")).rejects.toEqual(
      "Error: id is not a valid ObjectId string"
    );
  });

  test("should throw an error if no band exists with the provided id", async () => {
    await expect(bands.get("000000000000000000000000")).rejects.toEqual(
      "Error: Band not found with id : 000000000000000000000000"
    );
  });
});

describe("band.js remove Tests", () => {
  test("successfully bands.removes a band from the database", async () => {
    const result = await bands.remove(bandId);
    expect(result).toEqual(
      `${dumbExample.name} has been successfully deleted!`
    );
    await expect(bands.get(bandId)).rejects.toEqual(
      `Error: Band not found with id : ${bandId}`
    );
  });

  test("throws an error if no id is provided", async () => {
    await expect(bands.remove()).rejects.toEqual("Error: id is null or empty!");
  });

  test("throws an error if id is not a string", async () => {
    await expect(bands.remove(123)).rejects.toEqual(
      "Error: id is not a valid ObjectId string"
    );
  });

  test("throws an error if id is an empty string", async () => {
    await expect(bands.remove("")).rejects.toEqual(
      "Error: id is null or empty!"
    );
  });

  test("throws an error if id is not a valid ObjectId", async () => {
    const invalidId = "invalid-id";
    await expect(bands.remove(invalidId)).rejects.toEqual(
      `Error: id is not a valid ObjectId string`
    );
  });

  test("throws an error if band does not exist with the provided id", async () => {
    const nonExistentId = "000000000000000000000000";
    await expect(bands.remove(nonExistentId)).rejects.toEqual(
      `Error: ${nonExistentId} not found for deletion`
    );
  });
});
