// import express, express router as shown in lecture code
import Router from "express";
import dayjs from "dayjs";
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
    const errorMessages = {};
    let firstName;
    let lastName;
    let emailAddress;
    let password;
    let confirmPassword;
    let role;

    try {
      firstName = helpers.checkFirstNameLastName(
        req?.body?.firstNameInput,
        "First Name"
      );
    } catch (e) {
      errorMessages.firstNameInput = e.message;
    }
    try {
      lastName = helpers.checkFirstNameLastName(
        req?.body?.lastNameInput,
        "Last Name"
      );
    } catch (e) {
      errorMessages.lastNameInput = e.message;
    }
    try {
      emailAddress = helpers.checkEmailAddress(
        req?.body?.emailAddressInput,
        "Email Address"
      );
    } catch (e) {
      errorMessages.emailAddressInput = e.message;
    }
    try {
      password = helpers.checkPassword(req?.body?.passwordInput, "Password");
    } catch (e) {
      errorMessages.passwordInput = e.message;
    }
    try {
      confirmPassword = helpers.checkPassword(
        req?.body?.confirmPasswordInput,
        "Password"
      );
    } catch (e) {
      errorMessages.confirmPasswordInput = e.message;
    }
    if (
      !errorMessages?.confirmPasswordInput &&
      !errorMessages?.passwordInput &&
      confirmPassword !== password
    ) {
      errorMessages.confirmPasswordInput = "Passwords dont match";
    }
    try {
      role = helpers.checkRole(req?.body?.roleInput, "Role");
    } catch (e) {
      errorMessages.roleInput = e.message;
    }
    if (Object.keys(errorMessages).length > 0) {
      return res.status(400).render("register", {
        title: "register",
        errorMessages,
        errorContent: req.body,
      });
    }
    try {
      const { insertedUser } = await usersDataFunctions.createUser(
        firstName,
        lastName,
        emailAddress,
        password,
        role
      );
      if (insertedUser) {
        return res.redirect("/login");
      }
    } catch (error) {
      return res.status(error.status).render("register", {
        title: "register",
        errorMessages: error,
        errorContent: req.body,
      });
    }
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
      return res.status(400).render("login", {
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
      return res.status(error.status).render("login", {
        title: "Login",
        errorMessages: error,
        // errorContent: req.body,
      });
    }
  });

router.route("/protected").get(async (req, res) => {
  // code here for GET
  return res.render("protected", {
    title: "Protected",
    firstName: req.session.user.firstName,
    role: req.session.user.role,
    currentTime: dayjs().format("HH:mm:ss"),
  });
});

router.route("/admin").get(async (req, res) => {
  // code here for GET
  return res.render("admin", {
    title: "Admin",
    firstName: req.session.user.firstName,
    currentTime: dayjs().format("HH:mm:ss"),
  });
});

router.route("/error").get(async (req, res) => {
  // code here for GET
  res.status(403).render("error", {
    title: "error",
    error: "No No No you dont have access to admin's special features",
  });
});

router.route("/logout").get(async (req, res) => {
  // code here for GET
  req.session.destroy();
  res.clearCookie("AuthCookie");
  delete res.locals.session;
  res.render("logout", { title: "Logout" });
});

export default router;
