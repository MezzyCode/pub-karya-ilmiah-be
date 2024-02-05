require('dotenv').config();
const express = require('express');
const cors = require('cors')
const routes = require('./src/routes/apiRoutes');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}`);
  console.log(uuidv4());
});