import express, { response } from "express";
import supertest from "supertest";
import configRoutes from "./routes/index.js";
const app = express();
const request = supertest(app);
beforeAll(async () => {
  app.use(express.json());
  configRoutes(app);
});
afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // wait for connections to close
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
