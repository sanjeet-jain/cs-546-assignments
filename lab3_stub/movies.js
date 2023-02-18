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
import helpers, { getData } from "./helpers.js";

/**
 * return an array of objects that contains all the movies that were directed by directorName provided.
 * @param {string} directorName
 * @returns {[object]} array of movie objects
 */
export const findMoviesByDirector = async (directorName) => {
  helpers.errorIfNullOrEmpty(directorName, "directorName");
  if (!helpers.isNonEmptyString(directorName, false)) {
    throw "Error: movie id is not a valid string";
  }
  const movieData = await getData.getMovies();
  const result = movieData.filter(
    (movie) =>
      movie.director.trim().toLowerCase() === directorName.trim().toLowerCase()
  );
  helpers.errorIfNullOrEmpty(result, "director data", "director not found");
  return result;
};

/**
 * return an array of objects that contains all the movies where the castMemberName provided has starred in
 * @param {string} castMemberName
 * @returns {[object]} array of movie objects
 */
export const findMoviesByCastMember = async (castMemberName) => {
  helpers.errorIfNullOrEmpty(castMemberName, "castMemberName");
  if (!helpers.isNonEmptyString(castMemberName, false)) {
    throw "Error: castMemberName is not a valid string";
  }
  const movieData = await getData.getMovies();
  const result = movieData.filter((movie) =>
    movie.cast
      .map((cast) => {
        return cast.trim().toLowerCase();
      })
      .includes(castMemberName.trim().toLowerCase())
  );
  helpers.errorIfNullOrEmpty(result, "castMember data", "castMember not found");
  return result;
};

/**
 * calculate the overallRating of that specified movie object from movies.json
 * @param {string} title
 * @returns {number} rating for the movie
 */
export const getOverallRating = async (title) => {
  helpers.errorIfNullOrEmpty(title, "movie title");
  if (!helpers.isNonEmptyString(title, false)) {
    throw "Error: movie title is not a valid string";
  }
  const movieData = await getData.getMovies();
  let result = movieData.find(
    (movie) => movie.title.trim().toLowerCase() === title.trim().toLowerCase()
  );
  console.log(movieData);
  helpers.errorIfNullOrEmpty(movieData, "movie data", "movie title not found");
  //   helpers.errorIfNullOrEmpty(movieData.reviews, "movie review data");
  if (helpers.isEmpty(movieData.reviews)) {
    return 0;
  }
  let movieReviewRating = movieData.reviews.reduce(
    (sum, review) => (sum += review.rating),
    0
  );

  return Math.floor((movieReviewRating * 10) / movieData.reviews.length) / 10;
};

/**
 * return the Movie for the specified id within the movies.json array. Note: The id is case sensitive.
 * @param {string} id
 * @returns {object} returns movie object
 */
export const getMovieById = async (id) => {
  helpers.errorIfNullOrEmpty(id, "movie id");
  if (!helpers.isNonEmptyString(id, false)) {
    throw "Error: movie id is not a valid string";
  }
  const movieData = await getData.getMovies();
  const result = movieData.find((movie) => movie.id.trim() === id.trim());
  helpers.errorIfNullOrEmpty(result, "movie data", "movie not found");
  return result;
};
