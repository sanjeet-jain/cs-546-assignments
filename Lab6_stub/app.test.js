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
afterEach(async () => {
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
  test("responds with JSON containing all bands", async () => {
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
    expect(bands).toMatchObject(requestBody);
  });
});

describe("PUT/bands", () => {
  test("responds with JSON containing all bands", async () => {
    const requestBody = {
      name: "Pink Floyd 2",
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
      .put(`/bands/${data._id}`)
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

    expect(Array.isArray(bands.albums)).toBeTruthy();
    expect(bands).toMatchObject(requestBody);
  });
});

describe("DELETE/bands", () => {
  test("responds with JSON containing all bands", async () => {
    const response = await request.delete(`/bands/${data._id}`);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );

    // Check the response body
    const bands = response.body;
    expect(bands).toBeInstanceOf(Object);
    expect(bands).toHaveProperty("bandId");
    expect(bands.bandId).toEqual(data._id);
    expect(bands).toHaveProperty("deleted");
    expect(bands.deleted).toEqual(true);
  });
});
