//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes
import { Router } from "express";
const router = Router();

import axios from "axios";

const apiKey = "8e9n1lX0yzuidf7pam9z4Z00wybdIGXJ";
const baseUrl = `https://app.ticketmaster.com/discovery/v2/venues`;
const apiKeyUrl = `?apikey=${apiKey}&countryCode=US`;

router.route("/").get(async (req, res) => {
  //code here for GET
  res.render("homepage", { title: "Venue Finder" });
});

router.route("/searchvenues").post(async (req, res) => {
  //code here for POST

  if (
    !req?.body?.searchVenueTerm ||
    typeof req.body.searchVenueTerm !== "string" ||
    req.body.searchVenueTerm.trim() === ""
  ) {
    return res.status(400).render("error", {
      title: "Error",
      error: Error(
        "Error: 400 bad request, Please give an input in the search field"
      ),
    });
  }
  const searchVenueTerm = req.body.searchVenueTerm;

  try {
    const response = await axios.get(
      baseUrl.concat(apiKeyUrl, `&keyword=${searchVenueTerm}`, `&size=10`)
    );
    const venues = response.data?._embedded?.venues;
    const result = venues?.map((venue) => {
      return { id: venue.id, name: venue.name };
    });
    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).render("venueNotFound", {
        title: "Venue Not Found",
        searchVenueTerm: searchVenueTerm,
      });
    }
    res.render("venueSearchResults", {
      searchVenueTerm: searchVenueTerm,
      title: "Venues Found",
      venues: result,
    });
  } catch (error) {
    res.status(404).render("error", { title: "Error", error: error });
  }
});

router.route("/venuedetails/:id").get(async (req, res) => {
  //code here for GET
  if (
    !req?.params?.id ||
    typeof req.params.id !== "string" ||
    req.params.id.trim() === ""
  ) {
    return res.status(404).render("venueNotFound", {
      title: "Venue Not Found",
      id: id,
    });
  }
  const id = req.params.id.trim();

  try {
    const response = await axios.get(baseUrl.concat(`/${id}`, apiKeyUrl));
    const venue = response?.data;
    if (!venue) {
      return res.status(404).render("venueNotFound", {
        title: "Venue Not Found",
        id: id,
      });
    }

    res.render("venueByID", {
      title: "Venue Details",
      venue: venue,
    });
  } catch (error) {
    return res.status(404).render("venueNotFound", {
      title: "Venue Not Found",
      id: id,
    });
  }
});

export default router;
