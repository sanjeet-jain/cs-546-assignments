// Here you will require route files and export them as used in previous labs.
// Here you will import route files and export them as used in previous labs

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const constructorMethod = (app) => {
  app.use('*', async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../static/homepage.html'));
  });
};

export default constructorMethod;
