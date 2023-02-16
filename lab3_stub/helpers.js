//Todo You can use this file for any helper s you may need. This file is optional and you don't have to use it if you do not want to.
import axios from "axios";

const getData = {
  /**
   *
   * @returns json object of users
   */
  // sample format of each object
  //   {
  //     id: "48fded55-37cd-4e6b-8f19-e78b481a14a4",
  //     username: "abrett0",
  //     password: "YQ8Jpot33Mf",
  //     first_name: "Abigail",
  //     last_name: "Brett",
  //     email: "abrett0@gizmodo.com",
  //     favorite_genre: "Fantasy",
  //   }
  async getUsers() {
    const { data } = await axios.get(
      "https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json"
    );
    helpers.errorIfNullOrEmpty(data, "data from users api");
    return data; // this will be the array of user objects
  },

  /**
   *
   * @returns json object of movies
   */
  async getMovies() {
    const { data } = await axios.get(
      "https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json"
    );
    helpers.errorIfNullOrEmpty(data, "data from movies api");

    return data; // this will be the array of movie objects
  },
  // sample format of each object
  // {
  //   id: '0edc8652-062d-46b2-a930-fd815f88ddd5',
  //   title: 'Kill List',
  //   genre: 'Horror|Mystery|Thriller',
  //   director: 'Zeb Fountaine',
  //   release_date: '03/09/2002',
  //   runtime: '1h 50mins',
  //   mpa_rating: 'PG',
  //   cast: [ 'Stanleigh Perham', 'Jessee Haberfield' ],
  //   streaming_service: { company: 'Disney+', link: 'https://Disney+.com/Kill List' },
  //   reviews: [ {username: 'afrill27', rating: 3, review: 'A very ok movie.'} ]
  // },
};

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
      let errorMessage = "the " + inputName + " is null or empty!";
      if (customErrorMessage !== "") {
        errorMessage = customErrorMessage;
      }
      throw "Error: " + errorMessage;
    }
    return true;
  },

  /**
   *  check if input is a non empty string (not whitespace).
   * @param {any|string}value an input string value to check if its not empty
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
};
export { helpers as default, getData };
