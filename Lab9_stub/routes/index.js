// Here you will require route files and export them as used in previous labs.
// Here you will import route files and export them as used in previous labs

import textAnalyzerRoute from "./textanalyzer.js";

const constructorMethod = (app) => {
  app.use("/", textAnalyzerRoute);
};

export default constructorMethod;
