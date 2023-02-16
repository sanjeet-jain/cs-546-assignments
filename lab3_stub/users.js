import helpers, { getData } from "./helpers.js";

/** returns the user object for the specified id within the users.json array. Note: The id is case sensitive. if user not found then throws an error
 * @param {string} id
 * @returns {object} user object returned
 */
export const getUserById = async (id) => {
  helpers.errorIfNullOrEmpty(id, "user id");
  if (!helpers.isNonEmptyString(id, false)) {
    throw "Error: user id is not a valid string";
  }
  const userData = await getData.getUsers();
  const result = userData.find((user) => user.id.trim() === id.trim());
  helpers.errorIfNullOrEmpty(result, "User Data returned");
  return result;
};

/**
 * returns an array of the first 50 users who have the same favorite genre from users.json
 * @param {string} genre
 */
export const sameGenre = async (genre) => {
  helpers.errorIfNullOrEmpty(genre, "genre");
  if (!helpers.isNonEmptyString(genre, false)) {
    throw "Error: genre is not a valid string";
  }

  const result = (await getData.getUsers())
    .filter((user) => {
      return (
        user.favorite_genre.toLowerCase().trim() === genre.trim().toLowerCase()
      );
    })
    .map((user) => {
      return user.first_name + " " + user.last_name;
    });

  if (result.length < 2) {
    throw "Error: numbers of users with the same genre are less than 2";
  }
  //returns top 50
  return result.slice(0, 50);
};

/**
 * This function will take in id of a user object and return an array of all the movies that the specified user left a review on. The array will be comprised of objects of the following format: {title: {review object with username, rating, and review properties as shown below}}.
 * @param {string} id
 */
export const moviesReviewed = async (id) => {
  let result = [];
  const userData = await getUserById(id);
  const movieData = await getData.getMovies();
  movieData.forEach((movie) => {
    let reviewList = movie.reviews.filter((review) => {
      return review.username.trim() === userData.username.trim();
    });
    if (!helpers.isEmpty(reviewList)) {
      result.push({ [movie.title]: reviewList[0] });
    }
  });
  return result;
};

export const referMovies = async (id) => {
  const userData = await getUserById(id);
  const movieData = await getData.getMovies();
  const reviewedMovieData = await moviesReviewed(id);
  let userReviedMoviesArray = [];
  reviewedMovieData.forEach((reviewed) => {
    userReviedMoviesArray.push(...Object.keys(reviewed));
  });
  let userGenreArray = userData.favorite_genre.split("|").map((genre) => {
    return genre.trim().toLowerCase();
  });
  let filteredMovieData = movieData
    .filter((movie) => {
      return (
        !userReviedMoviesArray.includes(movie.title) &&
        movie.genre
          .split("|")
          .map((genre) => {
            return genre.trim().toLowerCase();
          })
          .some((x) => {
            return userGenreArray.includes(x);
          })
      );
    })
    .map((movie) => movie.title.trim());

  return filteredMovieData;
};
