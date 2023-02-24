import helpers from "../helpers.js";
import { ObjectId } from "mongodb";
export const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  helpers.errorIfNullOrEmpty(name);
  helpers.errorIfNullOrEmpty(genre);
  helpers.errorIfNullOrEmpty(website);
  helpers.errorIfNullOrEmpty(recordCompany);
  helpers.errorIfNullOrEmpty(groupMembers);
  helpers.errorIfNullOrEmpty(yearBandWasFormed);

  if (!helpers.isNonEmptyString(name, false)) {
    helpers.throwError(name, "string");
  }
  if (!helpers.isNonEmptyString(website, false)) {
    helpers.throwError(website, "string");
  }
  if (!helpers.isNonEmptyString(recordCompany, false)) {
    helpers.throwError(recordCompany, "string");
  }
  if (!helpers.isValidUrl(website)) {
    helpers.throwError(website, "string");
  }
  helpers.checkIfItemsAreString(genre, "genre", false);
  helpers.checkIfItemsAreString(groupMembers, "groupMembers", false);
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
};

export const getAll = async () => {};

export const get = async (id) => {};

export const remove = async (id) => {};

export const rename = async (id, newName) => {};
