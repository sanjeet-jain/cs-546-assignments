// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from "express";
const router = Router();
import { bandsData } from "../data/index.js";
import helpers from "../helpers.js";

router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try {
      const returnList = await bandsData.getAll();
      return res.json(returnList);
    } catch (error) {
      return res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const bandsPostData = req.body.requestBody;
    if (!bandsPostData || Object.keys(bandsPostData).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    let validObject = {};
    try {
      //validation
      validObject = helpers.validateBandObject(
        bandsPostData.name,
        bandsPostData.genre,
        bandsPostData.website,
        bandsPostData.recordCompany,
        bandsPostData.groupMembers,
        bandsPostData.yearBandWasFormed
      );
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const {
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed,
      } = validObject;
      const newBand = await bandsData.create(
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed
      );
      return res.json(newBand);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    //code here for GET
    let id = "";
    try {
      id = helpers.validateId(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let band = await bandsData.get(id);
    } catch (e) {
      return res.status(404).json({ error: "User not found" });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
  })
  .put(async (req, res) => {
    //code here for PUT
  });

export default router;
