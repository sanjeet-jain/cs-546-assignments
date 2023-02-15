//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json
import axios from "axios";
import helpers from "./helpers.js";

/**
 *
 * @returns json object of movies
 */
export async function getMovies() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json"
  );
  return data; // this will be the array of movie objects
}

export const findMoviesByDirector = async (directorName) => {};

export const findMoviesByCastMember = async (castMemberName) => {};

export const getOverallRating = async (title) => {};

export const getMovieById = async (id) => {};
