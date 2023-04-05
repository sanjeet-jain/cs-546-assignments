//Here you will import route files and export them as used in previous labs
import path from "path";
import venueRoutes from "./venues.js";
const constructorMethod = (app) => {
  app.use("/", venueRoutes);

  app.use("*", async (req, res) => {
    res
      .status(404)
      .render("error", {
        title: "Error",
        error: Error("Erro: 404 page not found"),
      });
  });
};

export default constructorMethod;
