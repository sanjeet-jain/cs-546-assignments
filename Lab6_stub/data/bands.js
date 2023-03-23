import helpers from "../helpers.js";
import { ObjectId } from "mongodb";
import { bands } from "./../config/mongoCollections.js";

/**
 *
 * @param {string} name name of the band
 * @param {[string]} genre array of genre strings
 * @param {string} website url of website
 * @param {string} recordCompany name of record company
 * @param {[string]} groupMembers array of group member name strings
 * @param {number} yearBandWasFormed year as number
 * @returns
 */
export const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  let validObject = helpers.validateBandObject(
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed
  );
  name = validObject.name;
  genre = validObject.genre;
  website = validObject.website;
  recordCompany = validObject.recordCompany;
  groupMembers = validObject.groupMembers;
  yearBandWasFormed = validObject.yearBandWasFormed;
  // Insert new band into database
  const band = {
    name: name.trim(),
    genre: genre.map((g) => g.trim()),
    website: website.trim(),
    recordCompany: recordCompany.trim(),
    groupMembers: groupMembers.map((m) => m.trim()),
    yearBandWasFormed: yearBandWasFormed,
    albums: [],
    overallRating: 0,
  };
  const bandCollection = await bands();
  const insertInfo = await bandCollection.insertOne(band);
  // Retrieve inserted band and return as object
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    helpers.throwError("", "", "Could not add band");
  }
  const newId = insertInfo.insertedId.toString();
  const insertedBand = await get(newId);
  return insertedBand;
};

/**
 * @returns {[object]} list of all bands
 */
export const getAll = async () => {
  const bandCollection = await bands();
  const bandList = await bandCollection.find({}).toArray();
  return bandList.map((band) => {
    return {
      ...band,
      _id: band._id.toString(),
      albums: band.albums.map((album) => {
        return {
          ...album,
          _id: album._id.toString(),
        };
      }),
    };
  });
};

/**
 * @param {string} id band id to get
 * @returns {object} band object corresponding to id
 */
export const get = async (id) => {
  id = helpers.validateId(id);
  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: new ObjectId(id) });
  helpers.errorIfNullOrEmpty(band, "band", `Band not found with id : ${id}`);
  return {
    ...band,
    _id: band._id.toString(),
    albums: band.albums.map((x) => {
      return {
        ...x,
        _id: x._id.toString(),
      };
    }),
  };
};

/**
 * @param {string} id band id to be removed
 * @returns `${deleted.movieName} has been successfully deleted!`
 */
export const remove = async (id) => {
  id = helpers.validateId(id);

  const bandCollection = await bands();
  const deletionInfo = await bandCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (deletionInfo.lastErrorObject.n === 0) {
    helpers.throwError("", "", `${id} not found for deletion`);
  }
  //do not trim !
  return `${deletionInfo.value.name} has been successfully deleted!`;
};
/**
 *
 * @param {string:ObjectId} id objectId to be updated
 * @param {string} name updated name of the band
 * @param {[string]} genre updated array of genre strings
 * @param {string} website updated url of website
 * @param {string} recordCompany  updated name of record company
 * @param {[string]} groupMembers updated array of group member name strings
 * @param {number} yearBandWasFormed updated yearBandWasFormed as number
 * @returns {Object} returns the newly updated band
 */
export const update = async (
  id,
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  let validObject = helpers.validateBandObject(
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed
  );
  name = validObject.name;
  genre = validObject.genre;
  website = validObject.website;
  recordCompany = validObject.recordCompany;
  groupMembers = validObject.groupMembers;
  yearBandWasFormed = validObject.yearBandWasFormed;

  id = helpers.validateId(id);
  const band = await get(id);

  let updatedBand = {
    ...band,
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed,
  };
  delete updatedBand._id;
  const bandCollection = await bands();
  const updatedInfo = await bandCollection.findOneAndReplace(
    { _id: new ObjectId(id) },
    updatedBand
  );

  if (updatedInfo.lastErrorObject.n === 0) {
    helpers.throwError("", "", "could not update post successfully");
  }

  return await get(id);
};
