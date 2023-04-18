// import express, express router as shown in lecture code
import Router from "express";

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
  });

router.route("/protected").get(async (req, res) => {
  // code here for GET
});

router.route("/admin").get(async (req, res) => {
  // code here for GET
});

router.route("/error").get(async (req, res) => {
  // code here for GET
  res.render("error", { error: "error" });
});

router.route("/logout").get(async (req, res) => {
  // code here for GET
});

export default router;
