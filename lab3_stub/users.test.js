import * as users from "./users.js";

describe("users.getUserById", () => {
  test("returns a user object when a valid user id is provided", async () => {
    const result = await users.getUserById(
      "48fded55-37cd-4e6b-8f19-e78b481a14a4"
    );
    expect(result).toEqual({
      id: "48fded55-37cd-4e6b-8f19-e78b481a14a4",
      username: "abrett0",
      password: "YQ8Jpot33Mf",
      first_name: "Abigail",
      last_name: "Brett",
      email: "abrett0@gizmodo.com",
      favorite_genre: "Fantasy",
    });
  });

  test("throws an error when a non-existent user id is provided", async () => {
    await expect(
      users.getUserById("7989fa5e-5617-43f7-a931-46036f9dbcff")
    ).rejects.toEqual("Error: User not found");
  });

  test("throws an error when a non-string value is provided as user id", async () => {
    [-1, 1001, " "].forEach(async (testData) => {
      await expect(users.getUserById(testData)).rejects.toEqual(
        "Error: user id is not a valid string"
      );
    });

    [, , "", null].forEach(async (testData) => {
      await expect(users.getUserById(testData)).rejects.toEqual(
        "Error: user id is null or empty!"
      );
    });
  });
});

describe("users.sameGenre", () => {
  test("returns an array of users sorted by last name and first name", async () => {
    const result = await users.sameGenre("Comedy");
    expect(result).toEqual([
      "Shellie A'field",
      "Roderigo Adrien",
      "Sheilah Ager",
      "Milty Albion",
      "Katharyn Anetts",
      "Gail Antley",
      "Dixie Ardern",
      "Margette Barley",
      "Ahmed Beacon",
      "Maureen Beckmann",
      "Benedetto Behneke",
      "Serge Benkhe",
      "Lamont Bickell",
      "Vin Birdfield",
      "Myron Birdwhistle",
      "Benny Blakely",
      "Ringo Bortoloni",
      "Manny Bosman",
      "Daron Bowditch",
      "Marlene Brekonridge",
      "Michaeline Brennan",
      "Margy Brilon",
      "Prince Bromige",
      "Evangelia Camis",
      "Conchita Carey",
      "Gerick Casillis",
      "Aurlie Child",
      "Frederigo Codron",
      "Hurleigh Coffey",
      "Gusella Coots",
      "Anallise Costen",
      "Grover Covotti",
      "Marice Dachey",
      "Sumner Deveraux",
      "Marchelle Donaher",
      "Demetrius Downes",
      "Becca Duckels",
      "Erinna Dugan",
      "Jasper Emmins",
      "Marj Evers",
      "Jeffy Finder",
      "Dorian Flello",
      "Eadith Getcliff",
      "Onfroi Glashby",
      "Stanwood Gosswell",
      "Chantal Grimster",
      "Linnet Gurnay",
      "Sullivan Hafner",
      "Rafferty Harnwell",
      "Essy Horley",
    ]);
  });

  test("throws an error if genre is not provided", async () => {
    await expect(users.sameGenre()).rejects.toEqual(
      "Error: genre is null or empty!"
    );
  });

  test("throws an error if genre is not a string", async () => {
    await expect(users.sameGenre(123)).rejects.toEqual(
      "Error: genre is not a valid string"
    );
  });

  test("throws an error if genre is an empty string", async () => {
    await expect(users.sameGenre("")).rejects.toEqual(
      "Error: genre is null or empty!"
    );
  });

  test("throws an error if there are less than 2 users with the same genre", async () => {
    await expect(users.sameGenre("IMAX")).rejects.toEqual(
      "Error: numbers of users with the same genre are less than 2"
    );
  });
});

describe("users.users.moviesReviewed", () => {
  test("should return an array of reviewed movies for a valid user id", async () => {
    const id = "64035fad-a5b7-48c9-9317-3e31e22fe26c";
    const result = await users.moviesReviewed(id);
    expect(result).toEqual([
      {
        "Charlie's Angels": {
          username: "cfinkle5",
          rating: 4,
          review: "Solid, good movie.",
        },
      },
      {
        "Class of 1999 II: The Substitute": {
          username: "cfinkle5",
          rating: 4,
          review: "Solid, good movie.",
        },
      },
      {
        "Terminator 3: Rise of the Machines": {
          username: "cfinkle5",
          rating: 2,
          review: "It was meh, plot was very bad.",
        },
      },
    ]);
  });

  test("throws an error for an invalid user id", async () => {
    const id = -1;
    await expect(users.moviesReviewed(id)).rejects.toEqual(
      "Error: user id is not a valid string"
    );
  });

  test("throws an error for a non-existent user id", async () => {
    const id = "7989fa5e-5617-43f7-a931-46036f9dbcff";
    await expect(users.moviesReviewed(id)).rejects.toEqual(
      "Error: User not found"
    );
  });

  test("throws an error for an empty user id", async () => {
    const id = "";
    ("Error: user id is not a valid string");
    await expect(users.moviesReviewed(id)).rejects.toEqual(
      "Error: user id is null or empty!"
    );
  });

  test("throws an error for an undefined user id", async () => {
    "Error: user id is not a valid string";
    await expect(users.moviesReviewed()).rejects.toEqual(
      "Error: user id is null or empty!"
    );
  });
});

describe("users.referMovies function", () => {
  test("should return an array of movie titles based on user favorite genre", async () => {
    const movieList = await users.referMovies(
      "5060fc9e-10c7-4f38-9f3d-47b7f477568b"
    );
    expect(movieList).toEqual([
      "Fly Me to the Moon",
      "Gravity",
      "Spiderwick Chronicles, The",
      "How to Train Your Dragon",
      "Wings of Courage",
      "Happy Feet Two",
    ]);
  });

  test("throws an error for an invalid user id", async () => {
    const id = -1;
    await expect(users.moviesReviewed(id)).rejects.toEqual(
      "Error: user id is not a valid string"
    );
  });

  test("throws an error for a non-existent user id", async () => {
    const id = "7989fa5e-5617-43f7-a931-46036f9dbcff";
    await expect(users.moviesReviewed(id)).rejects.toEqual(
      "Error: User not found"
    );
  });

  test("throws an error for an empty user id", async () => {
    const id = "";
    ("Error: user id is not a valid string");
    await expect(users.moviesReviewed(id)).rejects.toEqual(
      "Error: user id is null or empty!"
    );
  });

  test("throws an error for an undefined user id", async () => {
    "Error: user id is not a valid string";
    await expect(users.moviesReviewed()).rejects.toEqual(
      "Error: user id is null or empty!"
    );
  });
});
