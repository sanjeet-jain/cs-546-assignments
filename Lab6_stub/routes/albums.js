// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from "express";
const router = Router();
import { albumsData } from "../data/index.js";
import helpers from "../helpers.js";

router
  .route("/:bandId")
  .get(async (req, res) => {
    //code here for GET
    let bandId = "";
    try {
      bandId = helpers.validateId(req.params.bandId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let albums = await albumsData.getAll(bandId);
      return res.status(200).json(albums);
    } catch (e) {
      return res.status(404).json({ error: "User not found" });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const albumsPostData = req.body;
    if (!albumsPostData || Object.keys(albumsPostData).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    let validObject = {};
    try {
      //validation
      validObject = helpers.validateAlbumObject(
        albumsPostData.bandId,
        albumsPostData.title,
        albumsPostData.releaseDate,
        albumsPostData.tracks,
        albumsPostData.rating
      );
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const { bandId, title, releaseDate, tracks, rating } = validObject;
      const newAlbum = await albumsData.create(
        bandId,
        title,
        releaseDate,
        tracks,
        rating
      );
      return res.status(200).json(newAlbum);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

router
  .route("/album/:albumId")
  .get(async (req, res) => {
    //code here for GET
    let albumId = "";
    try {
      albumId = helpers.validateId(req.params.albumId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let albums = await albumsData.get(albumId);
      return res.status(200).json(albums);
    } catch (e) {
      return res.status(404).json({ error: "User not found" });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    let albumId = "";
    try {
      albumId = helpers.validateId(req.params.albumId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let message = await albumsData.remove(albumId);
      return res.status(200).json({ albumId: albumId, deleted: true });
    } catch (e) {
      return res.status(404).json({ error: "User not found" });
    }
  });

export default router;
