// import express, express router as shown in lecture code
import Router from "express";

import helpers from "../helpers.js";
import * as usersDataFunctions from "../data/users.js";

const router = new Router();

router.route("/").get(async (req, res) => {
  // code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/register")
  .get(async (req, res) => {
    // code here for GET
    res.render("register", { title: "Register" });
  })
  .post(async (req, res) => {
    // code here for POST
  });

router
  .route("/login")
  .get(async (req, res) => {
    // code here for GET
    return res.render("login", { title: "Login" });
  })
  .post(async (req, res) => {
    // code here for POST
    const errorMessages = {};
    let emailAddress = "";
    let password = "";
    try {
      emailAddress = helpers.checkEmailAddress(
        req.body?.emailAddressInput,
        "Email Address"
      );
    } catch (e) {
      errorMessages.emailAddressInput = e.message;
    }
    try {
      password = helpers.checkPassword(req.body?.passwordInput, "Password");
    } catch (e) {
      errorMessages.passwordInput = e.message;
    }
    if (Object.keys(errorMessages).length > 0) {
      return res.render("login", {
        title: "login",
        errorMessages,
        errorContent: req.body,
      });
    }
    try {
      const user = await usersDataFunctions.checkUser(emailAddress, password);
      req.session.user = { ...user };
      return res.status(200).redirect("/");
    } catch (error) {
      return res.status(400).render("login", {
        title: "Login",
        errorMessages: error,
        errorContent: req.body,
      });
    }
  });

router.route("/protected").get(async (req, res) => {
  // code here for GET
  return res.render("protected", { title: "Protected" });
});

router.route("/admin").get(async (req, res) => {
  // code here for GET
  return res.render("admin", { title: "Admin" });
});

router.route("/error").get(async (req, res) => {
  // code here for GET
  res.status(req.status).render("error", { error: "error" });
});

router.route("/logout").get(async (req, res) => {
  // code here for GET
  req.session.destroy();
  res.render("/logout");
});

export default router;
