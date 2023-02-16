//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json
import helpers, { getData } from "./helpers.js";

/**
 * return an array of objects that contains all the movies that were directed by directorName provided.
 * @param {string} directorName
 * @returns {[object]} array of movie objects
 */
export const findMoviesByDirector = async (directorName) => {};

/**
 * return an array of objects that contains all the movies where the castMemberName provided has starred in
 * @param {string} castMemberName
 * @returns {[object]} array of movie objects
 */
export const findMoviesByCastMember = async (castMemberName) => {};

/**
 * calculate the overallRating of that specified movie object from movies.json
 * @param {string} title
 * @returns {number} rating for the movie
 */
export const getOverallRating = async (title) => {};

/**
 * return the Movie for the specified id within the movies.json array. Note: The id is case sensitive.
 * @param {string} id
 * @returns {object} returns movie object
 */
export const getMovieById = async (id) => {};
