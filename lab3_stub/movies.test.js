import { number } from "yargs";
import * as movies from "./movies.js";

const expectedDirectorMovie = [
  {
    id: "040d7398-136c-45f0-89b8-9b73c67c617e",

    title: "Company",

    genre: "Drama|Musical",

    director: "Fernando Dollimore",

    release_date: "10/27/2020",

    runtime: "1h 14mins",

    mpa_rating: "PG-13",

    cast: ["Huberto Snoddon", "Horacio Scoggins"],

    streaming_service: {
      company: "Netflix",

      link: "https://Netflix.com/Company",
    },

    reviews: [
      {
        username: "jsorrelaw",

        rating: 2,

        review: "It was meh, plot was very bad.",
      },

      { username: "sgiacobo1n", rating: 3, review: "A very ok movie." },

      { username: "egrigolieb", rating: 3, review: "A very ok movie." },

      { username: "lmcinnesmk", rating: 4, review: "Solid, good movie." },
    ],
  },

  {
    id: "e8b006a5-8a81-4718-ae52-11b2bd02f741",

    title: "Flashbacks of a Fool",

    genre: "Drama",

    director: "Fernando Dollimore",

    release_date: "07/15/2010",

    runtime: "2h 58mins",

    mpa_rating: "PG",

    cast: [
      "Iver Hubbucks",

      "Tandi Arminger",

      "Willette Furze",

      "Feliks Edowes",

      "Neddie Ashleigh",
    ],

    streaming_service: {
      company: "Paramount+",

      link: "https://Paramount+.com/Flashbacks of a Fool",
    },

    reviews: [
      {
        username: "tjoice3z",

        rating: 2,

        review: "It was meh, plot was very bad.",
      },

      {
        username: "lhumpherstonjo",

        rating: 2,

        review: "It was meh, plot was very bad.",
      },

      { username: "sgiacobo1n", rating: 1, review: "HORRIBLE MOVIE!!!" },

      { username: "kcoumbe9m", rating: 3, review: "A very ok movie." },
    ],
  },

  {
    id: "f77972aa-9fdf-4465-9948-ba4acfea4d16",

    title: "Last Time, The",

    genre: "Comedy|Drama|Romance",

    director: "Fernando Dollimore",

    release_date: "05/24/2013",

    runtime: "3h 32mins",

    mpa_rating: "R",

    cast: ["Isaiah Gabbett", "Merrili Maud", "Raynard Tuxsell"],

    streaming_service: {
      company: "Peacock",

      link: "https://Peacock.com/Last Time, The",
    },

    reviews: [
      {
        username: "lbickelll",

        rating: 2,

        review: "It was meh, plot was very bad.",
      },

      {
        username: "abuttersm2",

        rating: 5,

        review: "OMG I loved it. AMAZING 10/10!!!!",
      },
    ],
  },

  {
    id: "bcafe739-d928-4440-b3a9-4cc554a1cb2a",

    title: "Rambo III",

    genre: "Action|Adventure|Thriller|War",

    director: "Fernando Dollimore",

    release_date: "02/11/2020",

    runtime: "1h 16mins",

    mpa_rating: "R",

    cast: ["Meier Craine", "Lorrie Yanin", "Nertie Kadar", "Pattie Caffin"],

    streaming_service: {
      company: "HBO Max",
      link: "https://HBO Max.com/Rambo III",
    },

    reviews: [
      {
        username: "jjackettcr",
        rating: 5,
        review: "OMG I loved it. AMAZING 10/10!!!!",
      },

      {
        username: "bboziermu",
        rating: 2,
        review: "It was meh, plot was very bad.",
      },

      {
        username: "apergensrj",
        rating: 2,
        review: "It was meh, plot was very bad.",
      },

      { username: "cempsbj", rating: 4, review: "Solid, good movie." },
    ],
  },
];
describe("await movies.findMoviesByDirector", () => {
  test("returns an array of objects when a valid director name is provided", async () => {
    const result = await movies.findMoviesByDirector("Fernando Dollimore");
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("title");
    expect(result[0]).toHaveProperty("director", "Fernando Dollimore");
    expect(result).toEqual(expectedDirectorMovie);
  });
  test("returns an array of objects when a valid director name is provided", async () => {
    const result = await movies.findMoviesByDirector(
      "Fernando Dollimore".toUpperCase()
    );
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("title");
    expect(result[0]).toHaveProperty("director", "Fernando Dollimore");

    expect(result).toEqual(expectedDirectorMovie);
  });

  test("throws an error when directorName parameter is not provided", async () => {
    await expect(movies.findMoviesByDirector()).rejects.toEqual(
      "Error: directorName is null or empty!"
    );
  });

  test("throws an error when directorName parameter is not a string", async () => {
    await expect(movies.findMoviesByDirector(123)).rejects.toEqual(
      "Error: movie id is not a valid string"
    );
  });

  test("throws an error when directorName parameter is an empty string", async () => {
    await expect(movies.findMoviesByDirector("    ")).rejects.toEqual(
      "Error: movie id is not a valid string"
    );
  });

  test("throws an error when no movies are found for the director", async () => {
    await expect(movies.findMoviesByDirector("John Doe")).rejects.toEqual(
      "Error: director not found"
    );
  });
});

const expectedCastMemberMovies = [
  {
    id: "040d7398-136c-45f0-89b8-9b73c67c617e",

    title: "Company",

    genre: "Drama|Musical",

    director: "Fernando Dollimore",

    release_date: "10/27/2020",

    runtime: "1h 14mins",

    mpa_rating: "PG-13",

    cast: ["Huberto Snoddon", "Horacio Scoggins"],

    streaming_service: {
      company: "Netflix",

      link: "https://Netflix.com/Company",
    },

    reviews: [
      {
        username: "jsorrelaw",

        rating: 2,

        review: "It was meh, plot was very bad.",
      },

      { username: "sgiacobo1n", rating: 3, review: "A very ok movie." },

      { username: "egrigolieb", rating: 3, review: "A very ok movie." },

      { username: "lmcinnesmk", rating: 4, review: "Solid, good movie." },
    ],
  },

  {
    id: "ab000bf0-f2e5-4cda-9294-e588a734f0ef",

    title: "Herod's Law (Ley de Herodes, La)",

    genre: "Comedy|Crime|Mystery",

    director: "Lise Glanister",

    release_date: "06/13/2003",

    runtime: "1h 57mins",

    mpa_rating: "NC-17",

    cast: ["Huberto Snoddon", "Mickie Rankine"],

    streaming_service: {
      company: "Amazon Prime Video",

      link: "https://Amazon Prime Video.com/Herod's Law (Ley de Herodes, La)",
    },

    reviews: [
      { username: "iaistonli", rating: 1, review: "HORRIBLE MOVIE!!!" },
    ],
  },
];
describe("await movies.findMoviesByCastMember", () => {
  test("returns an array of objects when a valid cast member name is provided", async () => {
    const result = await movies.findMoviesByCastMember("Huberto Snoddon");
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toEqual(expectedCastMemberMovies);
  });

  test("returns an array of objects when a valid cast member name is provided", async () => {
    const result = await movies.findMoviesByCastMember(
      "Huberto Snoddon".toUpperCase()
    );
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("cast");
    expect(result[0]["cast"].includes("Huberto Snoddon"));
    expect(result).toEqual(expectedCastMemberMovies);
  });

  test("throws an error when cast member name  parameter is not provided", async () => {
    await expect(movies.findMoviesByCastMember()).rejects.toEqual(
      "Error: castMemberName is null or empty!"
    );
  });

  test("throws an error when cast member name  parameter is not a string", async () => {
    await expect(movies.findMoviesByCastMember(123)).rejects.toEqual(
      "Error: castMemberName is not a valid string"
    );
  });

  test("throws an error when cast member name  parameter is an empty string", async () => {
    await expect(movies.findMoviesByCastMember("    ")).rejects.toEqual(
      "Error: castMemberName is not a valid string"
    );
  });

  test("throws an error when no movies are found for the cast member name ", async () => {
    await expect(movies.findMoviesByCastMember("John Doe")).rejects.toEqual(
      "Error: castMember not found"
    );
  });
});

describe("movies.getOverallRating function", () => {
  test("throws an error if title parameter is not provided", async () => {
    await expect(movies.getOverallRating()).rejects.toEqual(
      "Error: movie title is null or empty!"
    );
  });
  test("throws an error if title parameter is not a string", async () => {
    await expect(movies.getOverallRating(123)).rejects.toEqual(
      "Error: movie title is not a valid string"
    );
  });

  test("throws an error if title parameter is an empty string", async () => {
    await expect(movies.getOverallRating(" ")).rejects.toEqual(
      "Error: movie title is not a valid string"
    );
  });

  test("throws an error if movie cannot be found for the supplied title parameter", async () => {
    await expect(movies.getOverallRating("Mamma Mia")).rejects.toEqual(
      "Error: movie title not found"
    );
  });

  test("calculates the overall rating for a valid movie title", async () => {
    const rating = await movies.getOverallRating(
      "Asterix and the Vikings (Astérix et les Vikings)"
    );
    expect(typeof rating).toEqual("number");
    expect(rating).toEqual(2.2);
  });
  test("should return the overall rating of a movie with reviews", async () => {
    const title =
      "Bad Girl Island (Sirens of Eleuthera) (Sirens of the Caribbean)";
    const rating = await movies.getOverallRating(title);
    expect(typeof rating).toEqual("number");
    expect(rating).toEqual(4);
  });
});

describe("movies.getMovieById", () => {
  test("returns a movies object when a valid movies id is provided", async () => {
    const result = await movies.getMovieById(
      "38fd6885-0271-4650-8afd-6d09f3a890a2"
    );
    expect(result).toEqual({
      id: "38fd6885-0271-4650-8afd-6d09f3a890a2",

      title: "Asterix and the Vikings (Astérix et les Vikings)",

      genre: "Adventure|Animation|Children|Comedy|Fantasy",

      director: "Charissa Edinboro",

      release_date: "06/29/2007",

      runtime: "2h 35mins",

      mpa_rating: "R",

      cast: ["Sharl Covert", "Ailyn Howcroft", "Nissie Henrys"],

      streaming_service: {
        company: "Disney+",
        link: "https://Disney+.com/Asterix and the Vikings (Astérix et les Vikings)",
      },

      reviews: [
        { username: "afrill27", rating: 3, review: "A very ok movie." },

        { username: "tchedzoy2v", rating: 1, review: "HORRIBLE MOVIE!!!" },

        {
          username: "ltruckettim",
          rating: 2,
          review: "It was meh, plot was very bad.",
        },

        { username: "fgoodale6l", rating: 3, review: "A very ok movie." },
      ],
    });
  });

  test("throws an error when a non-existent movies id is provided", async () => {
    await expect(
      movies.getMovieById("7989fa5e-5617-43f7-a931-46036f9dbcff")
    ).rejects.toEqual("Error: movie not found");
  });

  test("throws an error when a non-string value is provided as movies id", async () => {
    [-1, 1001, " "].forEach(async (testData) => {
      await expect(movies.getMovieById(testData)).rejects.toEqual(
        "Error: movie id is not a valid string"
      );
    });

    [, , "", null].forEach(async (testData) => {
      await expect(movies.getMovieById(testData)).rejects.toEqual(
        "Error: movie id is null or empty!"
      );
    });
  });
});
