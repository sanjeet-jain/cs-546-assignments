/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/

function configMiddleWares(app) {
  app.use(async (req, res, next) => {
    let typeofuser = "";
    if (req.session.user) {
      typeofuser = "(Authenticated User)";
      res.locals.session = req.session.user;
      // todo extend cookie
    } else {
      typeofuser = "(Non Authenticated User)";
    }
    // log the info
    console.log(
      `${new Date().toUTCString()} ${req.method} ${
        req.originalUrl
      }  ${typeofuser}`
    );
    next();
  });
  app.get("/", (req, res) => {
    if (req.session?.user) {
      // add session to response so we can get it in each handlebar as well
      res.locals.session = req.session.user;
      if (req.session.user?.role === "admin") {
        return res.redirect("/admin");
      }
      if (req.session.user?.role === "user") {
        return res.redirect("/protected");
      }
    }
    return res.redirect("/login");
  });
  app.get("/login", (req, res, next) => {
    if (req.session?.user) {
      if (req.session.user?.role === "admin") {
        return res.redirect("/admin");
      }
      if (req.session.user?.role === "user") {
        return res.redirect("/protected");
      }
    }
    return next();
  });

  app.get("/register", (req, res, next) => {
    if (req.session?.user) {
      if (req.session.user?.role === "admin") {
        return res.redirect("/admin");
      }
      if (req.session.user?.role === "user") {
        return res.redirect("/protected");
      }
    }
    return next();
  });

  app.get("/protected", (req, res, next) => {
    if (!req.session?.user) {
      return res.redirect("/login");
    }
    return next();
  });

  app.get("/admin", (req, res, next) => {
    if (!req.session?.user) {
      return res.redirect("/login");
    }
    if (req.session.user?.role !== "admin") {
      req.session.redirected = true;
      return res.status(403).redirect("/error");
    }
    return next();
  });
  app.get("/error", (req, res, next) => {
    if (!req.session?.user || !req.session.redirected) {
      return res.redirect("/");
    }
    req.session.redirect = false;
    return next();
  });

  app.get("/logout", (req, res, next) => {
    if (!req.session?.user) {
      return res.redirect("/login");
    }
    return next();
  });
}

export default configMiddleWares;
