//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes
import { Router } from "express";
const router = Router();

import axios from "axios";

const apiKey = "7elxdku9GGG5k8j0Xm8KWdANDgecHMV01";
const baseUrl = `https://app.ticketmaster.com/discovery/v2/venues?apikey=${apiKey}`;

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
      error: Error(
        "Error: 400 bad request, Please give an input in the search field"
      ),
    });
  }
  let searchVenueTerm = "";

  try {
    const response = await axios.get(
      baseUrl.concat(`&keyword=${searchVenueTerm}`, `&size=10`)
    );
    const venues = response.data?._embedded?.venues;
    const result = venues?.map((venue) => {
      return { id: venue.id, name: venue.name };
    });
    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).render("venueNotFound", {
        searchVenueTerm: searchVenueTerm,
      });
    }
    res.render("venueSearchResults", {
      searchVenueTerm: searchVenueTerm,
      title: "Venues Found",
      venues: result,
    });
  } catch (error) {
    res.status(404).render("error", {
      error: error,
    });
  }
});

router.route("/venuedetails/:id").get(async (req, res) => {
  //code here for GET
  if (!req?.params?.id || typeof req.params.id !== "string") {
    return res.status(400).render("error", {
      error: Error(
        "Error: 400 bad request, Please give an input in the search field"
      ),
    });
  }
  const id = req.params.id;

  try {
    const response = await axios.get(baseUrl.concat(`&id=${id}`));
    const venue = response.data?._embedded?.venues;
    if (!Array.isArray(venue) || venue.length === 0) {
      return res.status(404).render("venueNotFound", {
        id: id,
      });
    }
    res.render("venueByID", {
      title: "Venue Details",
      venue: venue,
    });
  } catch (error) {
    res.status(404).render("error", {
      error: error,
    });
  }
});

export default router;