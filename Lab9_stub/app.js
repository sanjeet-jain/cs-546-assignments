/*
Here is where you'll set up your server as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the text analyzer page.
*/
// Here is where you'll set up your server as shown in lecture code
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import configRoutes from "./routes/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = express.static(`${__dirname}/public`);

app.use("/public", publicDir);
app.use(express.json());

app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
