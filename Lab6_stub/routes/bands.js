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
      return res.json(
        returnList.map((band) => {
          return {
            _id: band._id.toString(),
            name: band.name,
          };
        })
      );
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
      return res.status(200).json(newBand);
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
      return res.status(200).json(band);
    } catch (e) {
      return res.status(404).json({ error: "User not found" });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    let id = "";
    try {
      id = helpers.validateId(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let message = await bandsData.remove(id);
      return res.status(200).json({ bandId: id, deleted: true });
    } catch (e) {
      return res.status(404).json({ error: "User not found" });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    let id = "";
    try {
      id = helpers.validateId(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

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
      const newBand = await bandsData.update(
        id,
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed
      );
      return res.status(200).json(newBand);
    } catch (e) {
      if (e === "Error: same object passed for update with no changes") {
        return res.status(400).json({ error: e });
      }
      return res.status(500).json({ error: e });
    }
  });

export default router;
