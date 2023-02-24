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
  helpers.errorIfNullOrEmpty(name, "name");
  helpers.errorIfNullOrEmpty(genre, "genre");
  helpers.errorIfNullOrEmpty(website, "website");
  helpers.errorIfNullOrEmpty(recordCompany, "recordCompany");
  helpers.errorIfNullOrEmpty(groupMembers, "groupMembers");
  helpers.errorIfNullOrEmpty(yearBandWasFormed, "yearBandWasFormed");

  if (!helpers.isNonEmptyString(name, false)) {
    helpers.throwError("name", "string");
  }
  if (!helpers.isNonEmptyString(website, false)) {
    helpers.throwError("website", "string");
  }
  if (!helpers.isNonEmptyString(recordCompany, false)) {
    helpers.throwError("recordCompany", "string");
  }
  helpers.errorIfNotArray(genre, "genre");
  helpers.errorIfNotArray(groupMembers, "groupMembers");

  helpers.checkIfItemsAreString(genre, "genre", false);
  helpers.checkIfItemsAreString(groupMembers, "groupMembers", false);
  name = name.trim();
  genre = genre.map((g) => g.trim());
  website = website.trim();
  recordCompany = recordCompany.trim();
  groupMembers = groupMembers.map((m) => m.trim());
  if (!helpers.isValidUrl(website)) {
    helpers.throwError(
      "website",
      "string",
      "Website must be a valid URL starting with http://www. and ending in .com and have at least 5 characters in-between"
    );
  }
  if (typeof yearBandWasFormed !== "number") {
    helpers.throwError("yearBandWasFormed", "number");
  }
  if (yearBandWasFormed < 1900 || yearBandWasFormed > 2023) {
    helpers.throwError(
      "yearBandWasFormed",
      "number",
      "yearBandWasFormed is not between 1900 to 2023"
    );
  }
  // Insert new band into database
  const band = {
    name: name.trim(),
    genre: genre.map((g) => g.trim()),
    website: website.trim(),
    recordCompany: recordCompany.trim(),
    groupMembers: groupMembers.map((m) => m.trim()),
    yearBandWasFormed: yearBandWasFormed,
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
    };
  });
};

/**
 * @param {string} id band id to get
 * @returns band object corresponding to id
 */
export const get = async (id) => {
  helpers.errorIfNullOrEmpty(id, "id");
  if (!helpers.isNonEmptyString(id, false) || !ObjectId.isValid(id.trim())) {
    helpers.throwError("id", "ObjectId string");
  }
  id = id.trim();
  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: new ObjectId(id) });
  helpers.errorIfNullOrEmpty(band, "band", `Band not found with id : ${id}`);
  band._id = band._id.toString(); // Convert ObjectId to string
  return band;
};

/**
 * @param {string} id band id to be removed
 * @returns `${deleted.movieName} has been successfully deleted!`
 */
export const remove = async (id) => {
  helpers.errorIfNullOrEmpty(id, "id");
  if (!helpers.isNonEmptyString(id, false) || !ObjectId.isValid(id.trim())) {
    helpers.throwError("id", "ObjectId string");
  }
  id = id.trim();
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
 * renames the band
 * @param {string} id band id
 * @param {string} newName new name used for renaming the band
 */
export const rename = async (id, newName) => {
  helpers.errorIfNullOrEmpty(id, "id");
  if (!helpers.isNonEmptyString(id, false) || !ObjectId.isValid(id.trim())) {
    helpers.throwError("id", "ObjectId string");
  }
  helpers.errorIfNullOrEmpty(newName, "newName");
  if (!helpers.isNonEmptyString(newName, false)) {
    helpers.throwError("newName", "string");
  }
  id = id.trim();
  const band = await get(id);
  newName = newName.trim();
  if (newName === band.name) {
    helpers.throwError("", "", "newName cant be same as old name");
  }
  let updatedBand = {
    ...band,
    name: newName,
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
