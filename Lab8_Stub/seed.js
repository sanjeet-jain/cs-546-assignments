import { dbConnection, closeConnection } from "./config/mongoConnection.js";

export async function runSetup() {
  console.log("Done seeding database");
  return;
}
export async function seed() {
  const db = await dbConnection();
  await db.dropDatabase();
  await runSetup();
  await closeConnection();
}
