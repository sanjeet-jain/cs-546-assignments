import { runSetup } from "./seed.js";

import supertest from "supertest";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import express from "express";
const app = express();
import configRoutes from "./routes/index.js";
app.use(express.json());
configRoutes(app);

const request = supertest(app);
let server;
let data;
beforeAll(async () => {
  server = app.listen(3000, () => {});
  const db = await dbConnection();
  await db.dropDatabase();
  data = await runSetup();
});

afterAll(async () => {
  await closeConnection();
  server.close();
});

describe("GET /bands", () => {
  test("responds with JSON containing all bands", async () => {
    const response = await request.get("/bands");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    // Check the response body
    const bands = response.body;
    expect(bands).toBeInstanceOf(Array);

    // Check that each band has an _id and a name property
    bands.forEach((band) => {
      expect(band).toHaveProperty("_id");
      expect(typeof band._id).toBe("string");
      expect(band).toHaveProperty("name");
      expect(typeof band.name).toBe("string");
    });
  });
});

describe("POST /bands", () => {
  test.concurrent("responds with JSON containing all bands", async () => {
    const requestBody = {
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
    const response = await request
      .post("/bands")
      .set("content-type", "application/json")
      .send({ requestBody });

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    // Check the response body
    const bands = response.body;
    expect(bands).toBeInstanceOf(Object);

    // Check that each band has an _id and a name property
    expect(bands).toHaveProperty("_id");
    expect(typeof bands._id).toBe("string");
    expect(bands).toHaveProperty("name");
    expect(typeof bands.name).toBe("string");
    expect(bands).toHaveProperty("genre");
    expect(Array.isArray(bands.genre)).toBeTruthy();
    expect(bands).toHaveProperty("website");
    expect(typeof bands.website).toBe("string");
    expect(bands).toHaveProperty("recordCompany");
    expect(typeof bands.recordCompany).toBe("string");
    expect(bands).toHaveProperty("groupMembers");
    expect(Array.isArray(bands.groupMembers)).toBeTruthy();

    bands.groupMembers.forEach((x) => {
      expect(typeof x).toBe("string");
    });

    expect(bands).toHaveProperty("yearBandWasFormed");
    expect(typeof bands.yearBandWasFormed).toBe("number");
    expect(bands).toHaveProperty("overallRating");
    expect(typeof bands.overallRating).toBe("number");
    expect(bands).toHaveProperty("albums");
    expect(Array.isArray(bands.albums)).toBeTruthy();

    expect(bands.albums.length).toBe(0);
  });
});
