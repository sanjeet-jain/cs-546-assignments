// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
// /\*
// Created by https://sanjeet-jain.github.io/

// ```
//        _       _          _____
//       | |     (_)        / ____|
//       | | __ _ _ _ __   | (___
//   _   | |/ _` | | '_ \   \___ \
//  | |__| | (_| | | | | |  ____) |
//   \____/ \__,_|_|_| |_| |_____/
//                     ______
//                    |______|
// ```

// \*/
import { ObjectId } from "mongodb";
// import { options } from "superagent";
const currentYear = 2023;
const helpers = {
  /**
   *  check if input is null.
   * @param input an input value to check if its null.
   * @returns {boolean} returns true if input is null type
   */
  isNull(input) {
    if (
      (typeof input === "number" && isNaN(input)) ||
      input === undefined ||
      input === null
    ) {
      return true;
    }
    return false;
  },

  /**
   *  check if input is empty.
   * @param input an input value to check if its empty.
   * @returns {boolean} returns true if input is empty type
   */
  isEmpty(input) {
    if (Array.isArray(input) && input.length === 0) {
      return true;
    } else if (typeof input === "string" && input === "") {
      return true;
    } else if (typeof input === "object" && Object.keys(input).length === 0) {
      return true;
    }
    return false;
  },
  /**
   *
   * @param {any} input input to check if its numm or empty
   * @param {string} inputName name of input for error message
   * @returns {boolean}  returns a boolean true if input is valid
   */

  errorIfNullOrEmpty(input, inputName = "", customErrorMessage = "") {
    if (this.isNull(input) || this.isEmpty(input)) {
      let errorMessage = inputName + " is null or empty!";
      if (customErrorMessage !== "") {
        errorMessage = customErrorMessage;
      }
      throw "Error: " + errorMessage;
    }
    return true;
  },

  /**
   *  check if input is a non empty string (not whitespace).
   * @param {any|string} value an input string value to check if its not empty
   * @param {boolean} allowSpaces default true; boolean value whether to allow spcaes or no for the non empty check , if passed false treats spaces as empty string
   * @returns {boolean} returns a boolean value after checking if its a non empty string
   */
  isNonEmptyString(value, allowSpaces = true) {
    if (typeof value === "string") {
      return allowSpaces ? !this.isEmpty(value) : !this.isEmpty(value.trim());
    } else {
      return false;
    }
  },

  /**
   *
   * @param {string} url
   * @returns {boolean}
   */
  isValidUrl(url) {
    if (url.trim().startsWith("http://www.") && url.trim().endsWith(".com")) {
      let middleString = url.trim().substring(11, url.trim().length - 4);
      if (middleString.length >= 5) {
        return true;
      }
    }
    return false;
  },
  errorIfNotArray(input, arrayName = "") {
    if (!Array.isArray(input)) {
      throw this.throwError(arrayName, "array");
    }
  },
  throwError(
    variableName,
    invalidType = typeof variableName,
    customErrorMessage = ""
  ) {
    if (customErrorMessage !== "") {
      throw "Error: " + customErrorMessage;
    }
    throw `Error: ${variableName} is not a valid ${invalidType}`;
  },
  /**
   * function check if all items within the element input are strings.
   * throws an error if the input doesn't contain strings within it
   * @param {Array||Object} input an input array or object value to check if its items/properties are valid.
   * @param {string} inputName
   * @param {boolean} allowSpaces an input array value to check if its valid.
   */

  checkIfItemsAreString(input, inputName = "", allowSpaces = false) {
    if (!Array.isArray(input)) {
      this.throwError(inputName, "Array");
    }
    if (
      !input.every((value) => {
        return this.isNonEmptyString(value, allowSpaces);
      })
    ) {
      this.throwError(
        inputName,
        "array of strings",
        `${inputName} must be an array of non-empty strings`
      );
    }
    return true;
  },

  /**
   *
   * @param {string} name name of the band to be validated
   * @param {[string]} genre array of genre strings to be validated
   * @param {string} website url of website to be validated
   * @param {string} recordCompany name of record company to be validated
   * @param {[string]} groupMembers array of group member name strings to be validated
   * @param {number} yearBandWasFormed year as number to be validated
   * @returns {Object}  all inputs are made wellformed and returned as one object { name, genre, website, recordCompany, groupMembers, yearBandWasFormed}
   */
  validateBandObject(
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed
  ) {
    this.errorIfNullOrEmpty(name, "name");
    this.errorIfNullOrEmpty(genre, "genre");
    this.errorIfNullOrEmpty(website, "website");
    this.errorIfNullOrEmpty(recordCompany, "recordCompany");
    this.errorIfNullOrEmpty(groupMembers, "groupMembers");
    this.errorIfNullOrEmpty(yearBandWasFormed, "yearBandWasFormed");

    if (!this.isNonEmptyString(name, false)) {
      this.throwError("name", "string");
    }
    if (!this.isNonEmptyString(website, false)) {
      this.throwError("website", "string");
    }
    if (!this.isNonEmptyString(recordCompany, false)) {
      this.throwError("recordCompany", "string");
    }
    this.errorIfNotArray(genre, "genre");
    this.errorIfNotArray(groupMembers, "groupMembers");

    this.checkIfItemsAreString(genre, "genre", false);
    this.checkIfItemsAreString(groupMembers, "groupMembers", false);

    if (!this.isValidUrl(website)) {
      this.throwError(
        "website",
        "string",
        "Website must be a valid URL starting with http://www. and ending in .com and have at least 5 characters in-between"
      );
    }
    if (typeof yearBandWasFormed !== "number") {
      this.throwError("yearBandWasFormed", "number");
    }
    if (yearBandWasFormed < 1900 || yearBandWasFormed > currentYear) {
      this.throwError(
        "yearBandWasFormed",
        "number",
        "yearBandWasFormed is not between 1900 to " + currentYear
      );
    }
    name = name.trim();
    genre = genre.map((g) => g.trim());
    website = website.trim();
    recordCompany = recordCompany.trim();
    groupMembers = groupMembers.map((m) => m.trim());
    return {
      name,
      genre,
      website,
      recordCompany,
      groupMembers,
      yearBandWasFormed,
    };
  },

  /**
   *
   * @param {string} bandId ObjectId of the band
   * @param {string} title title of album
   * @param {string} releaseDate date string in format MM/DD/YYY
   * @param {[string]} tracks string list of tracks in the albumb
   * @param {number} rating rating for the albumb (between 1 to 5 and floats are 1 decimal precision)
   * @returns {Object} returns validated inputs as an object {bandId, title, releaseDate, tracks, rating}
   */
  validateAlbumObject(bandId, title, releaseDate, tracks, rating) {
    this.errorIfNullOrEmpty(bandId, "bandId");
    this.errorIfNullOrEmpty(title, "title");
    this.errorIfNullOrEmpty(releaseDate, "releaseDate");
    this.errorIfNullOrEmpty(tracks, "tracks");
    this.errorIfNullOrEmpty(rating, "rating");
    bandId = this.validateId(bandId);
    if (!this.isNonEmptyString(title, false)) {
      this.throwError("title", "string");
    }
    if (!this.isNonEmptyString(releaseDate, false)) {
      this.throwError("releaseDate", "string");
    }

    releaseDate = releaseDate.trim();
    const date = this.validateDateString(releaseDate);
    if (date.getFullYear() < 1900 || date.getFullYear() > currentYear + 1) {
      this.throwError(
        "Error: entered released date is not within years 1900 to " +
          (currentYear + 1)
      );
    }

    this.errorIfNotArray(tracks, "tracks");
    this.checkIfItemsAreString(tracks, "tracks", false);
    if (typeof rating !== "number") {
      this.throwError("rating", "number");
    }
    if (tracks.length < 3) {
      this.throwError("there need to be atleast 3 tracks in the list");
    }
    rating = Number(rating.toFixed(1));
    if (rating < 1 || rating > 5) {
      this.throwError("rating is not between 1 to 5");
    }

    title = title.trim();
    return { bandId, title, releaseDate, tracks, rating };
  },
  /**
   *
   * @param {string} id object id to be validated
   * @returns trimmed object id as string
   */
  validateId(id) {
    this.errorIfNullOrEmpty(id, "id");
    if (!this.isNonEmptyString(id, false) || !ObjectId.isValid(id.trim())) {
      this.throwError("id", "ObjectId string");
    }
    id = id.trim();
    return id;
  },
  /**
   *
   * @param {string} dateString input datestring to be validated ( should be of form MM/DD//YYY )
   * @returns {Date} date object of the dateString
   */
  validateDateString(dateString) {
    const date = new Date(dateString);
    let text = date.toLocaleDateString("en-us", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    if (text === "Invalid Date") {
      this.throwError(
        "dateString",
        "dateString",
        "dateString given is not a valid date"
      );
    }
    return date;
  },
  areObjectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (typeof val1 !== typeof val2) {
        return false;
      }

      if (typeof val1 === "object") {
        if (!this.areObjectsEqual(val1, val2)) {
          return false;
        }
      } else {
        if (val1 !== val2) {
          return false;
        }
      }
    }

    return true;
  },
};
export { helpers as default };
