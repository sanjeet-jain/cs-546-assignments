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
      .send({ ...requestBody });

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
      .send({ ...requestBody });
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

describe("GET /albums", () => {
  test("responds with JSON containing all albums", async () => {
    const response = await request.get(`/albums/${data._id}`);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    // Check the response body
    const albums = response.body;
    expect(albums).toBeInstanceOf(Array);

    expect(albums).toMatchObject(data.albums);
    // Check that each band has an _id and a name property
  });
});

describe("GET /albums/album/id", () => {
  test("responds with JSON containing all albums", async () => {
    const response = await request.get(`/albums/album/${data.albums[0]._id}`);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    // Check the response body
    const albums = response.body;
    expect(albums).toBeInstanceOf(Object);
    expect(albums).toMatchObject(data.albums[0]);
  });
});

describe("DELETE /albums/album/id", () => {
  test("responds with JSON containing all albums", async () => {
    const response = await request.delete(
      `/albums/album/${data.albums[1]._id}`
    );
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    // Check the response body
    const bands = response.body;
    expect(bands).toBeInstanceOf(Object);
    expect(bands).toHaveProperty("albumId");
    expect(bands.albumId).toEqual(data.albums[1]._id);
    expect(bands).toHaveProperty("deleted");
    expect(bands.deleted).toEqual(true);
  });
});

describe("POST /albums/bandId", () => {
  test("responds with JSON containing all albums", async () => {
    const requestBody = {
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
    const response = await request
      .post(`/albums/${data._id}`)
      .set("content-type", "application/json")
      .send({ ...requestBody });

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    // Check the response body
    const albums = response.body;
    expect(albums).toBeInstanceOf(Object);
    expect(albums).toMatchObject(data);
  });
});

describe("GET /albums/album/id", () => {
  test("responds with JSON containing all albums", async () => {
    const response = await request.get(`/albums/album/${data.albums[1]._id}`);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    // Check the response body
    const albums = response.body;
    expect(albums).toBeInstanceOf(Object);
    expect(albums).toMatchObject(data.albums[1]);
  });
});

describe("POST /albums/bandId", () => {
  test("responds with JSON containing all albums", async () => {
    const requestBody = {
      bandId: data._id,
      title: "Wish You Were Here 2",
      releaseDate: "12/12/1975",
      tracks: [
        "Shine On You Crazy Diamond, Pts. 1-5",
        "Welcome to the Machine",
        "Have a Cigar (Ft. Roy Harper)",
        "Wish You Were Here",
        "Shine On You Crazy Diamond, Pts. 6-9",
      ],
      rating: 5.1,
    };
    const response = await request
      .post(`/albums/${data._id}`)
      .set("content-type", "application/json")
      .send({ ...requestBody });

    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    // // Check the response body
    // const albums = response.body;
    // expect(albums).toBeInstanceOf(Object);
    // expect(albums).toMatchObject(data);
  });
});
describe("POST /albums/bandId", () => {
  test("responds with JSON containing all albums", async () => {
    const requestBody = {
      bandId: data._id,
      title: "Wish You Were Here 2",
      releaseDate: "12/12/1975",
      tracks: [
        "Shine On You Crazy Diamond, Pts. 1-5",
        "Welcome to the Machine",
        "Have a Cigar (Ft. Roy Harper)",
        "Wish You Were Here",
        "Shine On You Crazy Diamond, Pts. 6-9",
      ],
      rating: 4.88,
    };
    const response = await request
      .post(`/albums/${data._id}`)
      .set("content-type", "application/json")
      .send({ ...requestBody });

    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("application/json")
    );
    // // Check the response body
    // const albums = response.body;
    // expect(albums).toBeInstanceOf(Object);
    // expect(albums).toMatchObject(data);
  });
});
