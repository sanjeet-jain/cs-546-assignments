import * as bands from "./data/bands.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import * as bandsMongo from "./config/mongoCollections.js";

let bandCollection;
let bandId;
const dumbExample = {
  name: "   Dumb a$$ title with spaces at the end and start :)   ",
  genre: [" DuMb Genre With SPaces "],
  website: " http://www. dumb website with space in the middle .com ",
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
    await expect(bands.create()).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");

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
    ).rejects.toMatch("Error");

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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
  });

  test("throws an error if website does not start with http://www.", async () => {
    await expect(
      bands.create(
        "Led Zeppelin",
        ["Hard rock", "Blues rock", "Heavy metal"],
        "http:// www.ledzeppelin.com",
        "Atlantic Records",
        ["Jimmy Page", "Robert Plant", "John Paul Jones", "John Bonham"],
        1968
      )
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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
    ).rejects.toMatch("Error");
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

    expect(typeof newBand).toEqual("object");
    expect(newBand).toHaveProperty("_id");
    expect(typeof newBand._id).toEqual("string");
    expect(newBand).toHaveProperty("name");
    expect(typeof newBand.name).toEqual("string");
    expect(newBand).toHaveProperty("genre");
    expect(Array.isArray(newBand.genre)).toBe(true);
    expect(newBand.genre.every((g) => typeof g === "string")).toBe(true);
    expect(newBand).toHaveProperty("website");
    expect(typeof newBand.website).toEqual("string");

    expect(newBand).toHaveProperty("recordCompany");
    expect(typeof newBand.recordCompany).toEqual("string");
    expect(newBand).toHaveProperty("groupMembers");
    expect(Array.isArray(newBand.groupMembers)).toBe(true);
    expect(newBand.groupMembers.every((gm) => typeof gm === "string")).toBe(
      true
    );
    expect(newBand).toHaveProperty("yearBandWasFormed");
    expect(typeof newBand.yearBandWasFormed).toEqual("number");
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
    expect(typeof newBand).toEqual("object");
    expect(newBand).toHaveProperty("_id");
    expect(typeof newBand._id).toEqual("string");
    expect(newBand).toHaveProperty("name");
    expect(typeof newBand.name).toEqual("string");
    expect(newBand).toHaveProperty("genre");
    expect(Array.isArray(newBand.genre)).toBe(true);
    expect(newBand.genre.every((g) => typeof g === "string")).toBe(true);
    expect(newBand).toHaveProperty("website");
    expect(typeof newBand.website).toEqual("string");

    expect(newBand).toHaveProperty("recordCompany");
    expect(typeof newBand.recordCompany).toEqual("string");
    expect(newBand).toHaveProperty("groupMembers");
    expect(Array.isArray(newBand.groupMembers)).toBe(true);
    expect(newBand.groupMembers.every((gm) => typeof gm === "string")).toBe(
      true
    );
    expect(newBand).toHaveProperty("yearBandWasFormed");
    expect(typeof newBand.yearBandWasFormed).toEqual("number");
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

    expect(typeof newBand).toEqual("object");
    expect(newBand).toHaveProperty("_id");
    expect(typeof newBand._id).toEqual("string");
    expect(newBand).toHaveProperty("name");
    expect(typeof newBand.name).toEqual("string");
    expect(newBand).toHaveProperty("genre");
    expect(Array.isArray(newBand.genre)).toBe(true);
    expect(newBand.genre.every((g) => typeof g === "string")).toBe(true);
    expect(newBand).toHaveProperty("website");
    expect(typeof newBand.website).toEqual("string");

    expect(newBand).toHaveProperty("recordCompany");
    expect(typeof newBand.recordCompany).toEqual("string");
    expect(newBand).toHaveProperty("groupMembers");
    expect(Array.isArray(newBand.groupMembers)).toBe(true);
    expect(newBand.groupMembers.every((gm) => typeof gm === "string")).toBe(
      true
    );
    expect(newBand).toHaveProperty("yearBandWasFormed");
    expect(typeof newBand.yearBandWasFormed).toEqual("number");
  });
});

describe("band.js get Invalid Tests", () => {
  test("should throw an error if no id is provided", async () => {
    await expect(bands.get()).rejects.toMatch("Error");
  });

  test("should throw an error if the id provided is not a string or is an empty string", async () => {
    await expect(bands.get(123)).rejects.toMatch("Error");
    await expect(bands.get("")).rejects.toMatch("Error");
  });

  test("should throw an error if the id provided is not a valid ObjectId", async () => {
    await expect(bands.get("invalid_id")).rejects.toMatch("Error");
  });

  test("should throw an error if no band exists with the provided id", async () => {
    await expect(bands.get("000000000000000000000000")).rejects.toMatch(
      "Error"
    );
  });
});

describe("band.js remove Tests", () => {
  test("successfully bands.removes a band from the database", async () => {
    const result = await bands.remove(bandId);
    expect(result).toEqual(
      `${dumbExample.name} has been successfully deleted!`
    );
    await expect(bands.get(bandId)).rejects.toMatch(
      `Error: Band not found with id : ${bandId}`
    );
  });

  test("throws an error if no id is provided", async () => {
    await expect(bands.remove()).rejects.toMatch("Error");
  });

  test("throws an error if id is not a string", async () => {
    await expect(bands.remove(123)).rejects.toMatch("Error");
  });

  test("throws an error if id is an empty string", async () => {
    await expect(bands.remove("")).rejects.toMatch("Error");
  });

  test("throws an error if id is not a valid ObjectId", async () => {
    const invalidId = "invalid-id";
    await expect(bands.remove(invalidId)).rejects.toMatch(
      `Error: id is not a valid ObjectId string`
    );
  });

  test("throws an error if band does not exist with the provided id", async () => {
    const nonExistentId = "000000000000000000000000";
    await expect(bands.remove(nonExistentId)).rejects.toMatch(
      `Error: ${nonExistentId} not found for deletion`
    );
  });
});

describe("getAll", () => {
  test("returns an empty array when there are no bands in the collection", async () => {
    await bandCollection.deleteMany({});

    const result = await bands.getAll();
    expect(result).toEqual([]);
  });

  test("returns an array of one band when there is one band in the collection", async () => {
    const result = await bands.getAll();
    expect(result.length).toEqual(1);
    expect(result[0]._id).toEqual(bandId);
    expect(result[0].name).toEqual(dumbExample.name);
    expect(result[0].genre).toEqual(dumbExample.genre);
    expect(result[0].groupMembers).toEqual(dumbExample.groupMembers);
    expect(result[0].recordCompany).toEqual(dumbExample.recordCompany);
    expect(result[0].website).toEqual(dumbExample.website);
    expect(result[0].yearBandWasFormed).toEqual(dumbExample.yearBandWasFormed);
  });

  test("returns an array of multiple bands when there are multiple bands in the collection", async () => {
    await bandCollection.deleteMany({});
    const dumbExample1 = await bands.create(
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
    const dumbExample2 = await bands.create(
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
    const dumbExample3 = await bands.create(
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
    const result = await bands.getAll();
    expect(result.length).toEqual(3);
    result.forEach((element) => {
      expect(typeof element).toEqual("object");
      expect(element).toHaveProperty("_id");
      expect(typeof element._id).toEqual("string");
      expect(element).toHaveProperty("name");
      expect(typeof element.name).toEqual("string");
      expect(element).toHaveProperty("genre");
      expect(Array.isArray(element.genre)).toBe(true);
      expect(element.genre.every((g) => typeof g === "string")).toBe(true);
      expect(element).toHaveProperty("website");
      expect(typeof element.website).toEqual("string");

      expect(element).toHaveProperty("recordCompany");
      expect(typeof element.recordCompany).toEqual("string");
      expect(element).toHaveProperty("groupMembers");
      expect(Array.isArray(element.groupMembers)).toBe(true);
      expect(element.groupMembers.every((gm) => typeof gm === "string")).toBe(
        true
      );
      expect(element).toHaveProperty("yearBandWasFormed");
      expect(typeof element.yearBandWasFormed).toEqual("number");
    });

    expect(result[0]._id).toEqual(dumbExample1._id);
    expect(result[0].name).toEqual(dumbExample1.name);
    expect(result[0].genre).toEqual(dumbExample1.genre);
    expect(result[0].groupMembers).toEqual(dumbExample1.groupMembers);
    expect(result[0].recordCompany).toEqual(dumbExample1.recordCompany);
    expect(result[0].website).toEqual(dumbExample1.website);
    expect(result[0].yearBandWasFormed).toEqual(dumbExample1.yearBandWasFormed);

    expect(result[1]._id).toEqual(dumbExample2._id);
    expect(result[1].name).toEqual(dumbExample2.name);
    expect(result[1].genre).toEqual(dumbExample2.genre);
    expect(result[1].groupMembers).toEqual(dumbExample2.groupMembers);
    expect(result[1].recordCompany).toEqual(dumbExample2.recordCompany);
    expect(result[1].website).toEqual(dumbExample2.website);
    expect(result[1].yearBandWasFormed).toEqual(dumbExample2.yearBandWasFormed);

    expect(result[2]._id).toEqual(dumbExample3._id);
    expect(result[2].name).toEqual(dumbExample3.name);
    expect(result[2].genre).toEqual(dumbExample3.genre);
    expect(result[2].groupMembers).toEqual(dumbExample3.groupMembers);
    expect(result[2].recordCompany).toEqual(dumbExample3.recordCompany);
    expect(result[2].website).toEqual(dumbExample3.website);
    expect(result[2].yearBandWasFormed).toEqual(dumbExample3.yearBandWasFormed);
  });
});

describe("bands.rename", () => {
  test("throws an error when id is null", async () => {
    await expect(bands.rename(null, "New Band Name")).rejects.toMatch("Error");
  });

  test("throws an error when id is an empty string", async () => {
    await expect(bands.rename("", "New Band Name")).rejects.toMatch("Error");
  });

  test("throws an error when id is not a string", async () => {
    await expect(bands.rename(123, "New Band Name")).rejects.toMatch("Error");
  });

  test("throws an error when id is not a valid ObjectId", async () => {
    await expect(bands.rename("12345", "New Band Name")).rejects.toMatch(
      "Error"
    );
  });

  test("throws an error when newName is null", async () => {
    await expect(bands.rename(bandId, null)).rejects.toMatch("Error");
  });

  test("throws an error when newName is an empty string", async () => {
    await expect(bands.rename(bandId, "")).rejects.toMatch("Error");
  });

  test("throws an error when newName is not a string", async () => {
    await expect(bands.rename(bandId, 123)).rejects.toMatch("Error");
  });

  test("throws an error when band does not exist", async () => {
    await expect(
      bands.rename("123456789012345678901234", "New Band Name")
    ).rejects.toMatch("Error");
  });

  test("throws an error when newName is the same as the current value stored in the database", async () => {
    const dumbExample1 = await bands.create(
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
    await expect(
      bands.rename(dumbExample1._id, "  Pink Floyd Alternative ")
    ).rejects.toMatch("Error");
  });

  test("updates and returns the entire band object", async () => {
    const dumbExample1 = await bands.create(
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
    const newBandName = "New Band Name";
    const updatedBand = await bands.rename(dumbExample1._id, newBandName);
    expect(updatedBand.name).toEqual(newBandName);
    expect(updatedBand._id).toBeDefined();

    expect(typeof updatedBand).toEqual("object");
    expect(updatedBand).toHaveProperty("_id");
    expect(typeof updatedBand._id).toEqual("string");
    expect(updatedBand).toHaveProperty("name");
    expect(typeof updatedBand.name).toEqual("string");
    expect(updatedBand).toHaveProperty("genre");
    expect(Array.isArray(updatedBand.genre)).toBe(true);
    expect(updatedBand.genre.every((g) => typeof g === "string")).toBe(true);
    expect(updatedBand).toHaveProperty("website");
    expect(typeof updatedBand.website).toEqual("string");

    expect(updatedBand).toHaveProperty("recordCompany");
    expect(typeof updatedBand.recordCompany).toEqual("string");
    expect(updatedBand).toHaveProperty("groupMembers");
    expect(Array.isArray(updatedBand.groupMembers)).toBe(true);
    expect(updatedBand.groupMembers.every((gm) => typeof gm === "string")).toBe(
      true
    );
    expect(updatedBand).toHaveProperty("yearBandWasFormed");
    expect(typeof updatedBand.yearBandWasFormed).toEqual("number");
  });
});
