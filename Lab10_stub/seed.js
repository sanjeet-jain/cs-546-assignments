import { dbConnection, closeConnection } from "./config/mongoConnection.js";

import * as usersDataFunctions from "./data/users.js";

async function runSetup() {
  const user = await usersDataFunctions.createUser(
    "Sanjeet User",
    "Jain",
    "sjain68User@stevens.edu",
    "#Checkout123",
    "user"
  );
  const admin = await usersDataFunctions.createUser(
    "Sanjeet Admin",
    "Jain",
    "sjain68Admin@stevens.edu",
    "#Checkout123",
    "admin"
  );

  console.log("user created  sjain68User@stevens.edu #Checkout123");
  console.log("admin created sjain68Admin@stevens.edu #Checkout123");
}
// eslint-disable-next-line import/prefer-default-export
export async function seed() {
  const db = await dbConnection();
  await db.dropDatabase();
  await runSetup();
  await closeConnection();
}
