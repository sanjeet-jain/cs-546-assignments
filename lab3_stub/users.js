import helpers from "./helpers.js";
import axios from "axios";
/**
 *
 * @returns json object of users
 */
async function getUsers() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json"
  );
  helpers.errorIfNullOrEmpty(data, "data from users api");

  return data; // this will be the array of user objects
}

/** returns the user object for the specified id within the users.json array. Note: The id is case sensitive. if user not found then throws an error
 * @param {string} id
 * @returns {object} user object returned
 */
export const getUserById = async (id) => {
  helpers.errorIfNullOrEmpty(id, "user id");
  if (!helpers.isNonEmptyString(id)) {
    throw "Error: user id is not a valid string";
  }
  let userByIdData = await getUsers();
  let result = userByIdData.find((user) => user.id === id);
  helpers.errorIfNullOrEmpty(result, "User Data returned");
  return result;
};

/**
 * returns an array of the first 50 users who have the same favorite genre from users.json
 * @param {string} genre
 */
export const sameGenre = async (genre) => {};

export const moviesReviewed = async (id) => {};

export const referMovies = async (id) => {};
