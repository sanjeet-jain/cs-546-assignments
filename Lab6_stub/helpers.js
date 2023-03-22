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

  validateId(id) {
    helpers.errorIfNullOrEmpty(id, "id");
    if (!helpers.isNonEmptyString(id, false) || !ObjectId.isValid(id.trim())) {
      helpers.throwError("id", "ObjectId string");
    }
    id = id.trim();
    return id;
  },
};
export { helpers as default };
