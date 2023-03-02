import express, { response } from "express";
import configRoutes from "./routes/index.js";
import supertest from "supertest";
const app = express();
configRoutes(app);
const request = supertest(app);

describe("GET /aboutme", () => {
  test("responds with JSON containing first name, last name, biography, favorite movies, hobbies, and fondest memory", async () => {
    const response = await request.get("/aboutme");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    expect(response.body).toHaveProperty("firstName");
    expect(response.body).toHaveProperty("lastName");
    expect(response.body).toHaveProperty("biography");
    expect(response.body).toHaveProperty("favoriteMovies");
    expect(response.body).toHaveProperty("hobbies");
    expect(response.body).toHaveProperty("fondestMemory");
  });

  test("returns correct data in JSON format", async () => {
    const response = await request.get("/aboutme");
    expect(response.body.biography).toMatch(/.+\n.+/); // Matches two paragraphs separated by a newline character
    expect(Array.isArray(response.body.favoriteMovies)).toBe(true);
    expect(Array.isArray(response.body.hobbies)).toBe(true);
    expect(typeof response.body.fondestMemory).toBe("string");
    expect(typeof response.body.firstName).toBe("string");
    expect(typeof response.body.lastName).toBe("string");
  });
});

describe("GET /mystory", () => {
  test("responds with JSON containing storyTitle, storyGenre, and story properties", async () => {
    const response = await request.get("/mystory");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveProperty("storyTitle");
    expect(response.body).toHaveProperty("storyGenre");
    expect(response.body).toHaveProperty("story");
  });

  test("returns correct data in JSON format", async () => {
    const response = await request.get("/mystory");
    expect(response.body.story).toMatch(/\n/);
    expect(typeof response.body.storyTitle).toBe("string");
    expect(typeof response.body.storyGenre).toBe("string");
    expect(typeof response.body.story).toBe("string");
  });
});

describe("GET /educationhistory", () => {
  test("responds with JSON containing an array of objects with expected properties", async () => {
    const response = await request.get("/educationhistory");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("schoolName");
    expect(response.body[0]).toHaveProperty("degreeEarned");
    expect(response.body[0]).toHaveProperty("numberOfYearsAttended");
    expect(response.body[0]).toHaveProperty("favoriteClasses");
    expect(response.body[0]).toHaveProperty("favoriteSchoolMemory");
  });
  test("should return a valid JSON response with valid object properties", async () => {
    const res = await request.get("/educationhistory");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toMatchObject({
      schoolName: expect.any(String),
      degreeEarned: expect.any(String),
      numberOfYearsAttended: expect.any(Number),
      favoriteClasses: expect.arrayContaining([expect.any(String)]),
      favoriteSchoolMemory: expect.any(String),
    });
  });
});
