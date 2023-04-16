/*
Require express and express router as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the text analyzer page.

you just need one route to send the static homepage.html file
*/

import path from "path";
import { fileURLToPath } from "url";
import Router from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = new Router();

router.get("/", async (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../static/homepage.html"));
});

export default router;
