// This data file should export all functions using the ES6 standard as shown in the lecture code
import { ObjectId } from "mongodb";
import helpers from "../helpers.js";
import * as bandsData from "./bands.js";
import { bands } from "./../config/mongoCollections.js";

/**
 *
 * @param {string} bandId ObjectId of the band
 * @param {string} title title of album
 * @param {string} releaseDate date string in format MM/DD/YYY
 * @param {[string]} tracks string list of tracks in the albumb
 * @param {number} rating rating for the albumb (between 1 to 5 and floats are 1 decimal precision)
 * @returns {Object} returns updated band object
 */
export const create = async (bandId, title, releaseDate, tracks, rating) => {
  let validObject = helpers.validateAlbumObject(
    bandId,
    title,
    releaseDate,
    tracks,
    rating
  );
  bandId = validObject.bandId;
  title = validObject.title;
  releaseDate = validObject.releaseDate;
  tracks = validObject.tracks;
  rating = validObject.rating;
  let band = await bandsData.get(bandId);
  //make all object ids
  band.albums = band.albums.map((x) => {
    return {
      ...x,
      _id: new ObjectId(x._id),
    };
  });
  const album = {
    _id: new ObjectId(),
    title: title.trim(),
    releaseDate: releaseDate.trim(),
    tracks: tracks.map((g) => g.trim()),
    rating: rating,
  };
  if (band.albums.find((x) => x.title.toLowerCase() === title.toLowerCase())) {
    helpers.throwError("", "", "Duplicate Album not allowed");
  }
  band.albums.push(album);

  let newOverallRating = band.albums.reduce((avg, x) => {
    avg += x.rating / band.albums.length;
    return avg;
  }, 0);
  band.overallRating = Number(newOverallRating.toFixed(1));
  delete band._id;
  const bandCollection = await bands();
  const updatedInfo = await bandCollection.findOneAndReplace(
    { _id: new ObjectId(bandId) },
    band
  );

  if (updatedInfo.lastErrorObject.n === 0) {
    helpers.throwError("", "", "could not update post successfully");
  }
  band = updatedInfo.value;

  return band;
};

/**
 *
 * @param {string} bandId bandId to get all albums for
 * @returns {[Object]}
 */
export const getAll = async (bandId) => {
  bandId = helpers.validateId(bandId);
  let band = await bandsData.get(bandId);
  return band.albums;
};

/**
 * @param {string} albumId albumId to query
 * @returns album object corresponding to albumId
 */
export const get = async (albumId) => {
  albumId = helpers.validateId(albumId);
  const bandCollection = await bands();
  const band = await bandCollection.findOne({
    albums: { $elemMatch: { _id: new ObjectId(albumId) } },
  });
  if (!band) {
    throw `band with albumID ${albumId} not found`;
  }
  const albumsList = await getAll(band._id.toString());
  return albumsList.find((x) => {
    return x._id.toString() === albumId;
  });
};

export const remove = async (albumId) => {
  albumId = helpers.validateId(albumId);
  const bandCollection = await bands();
  const band = await bandCollection.findOne({
    albums: { $elemMatch: { _id: new ObjectId(albumId) } },
  });
  const album = await get(albumId);

  const newOverallRating =
    band.albums.length === 0
      ? 0
      : (band.albums.reduce((avg, x) => {
          avg += x.rating;
          return avg;
        }, 0) -
          album.rating) /
        band.albums.length;
  const updatedBand = await bandCollection.updateOne(
    { "albums._id": new ObjectId(albumId) },
    {
      $pull: { albums: { _id: new ObjectId(albumId) } },
      $set: {
        overallRating: Number(newOverallRating.toFixed(1)),
      },
    },
    {
      returnNewDocument: true,
    }
  );

  return bandsData.get(band._id.toString());
};
