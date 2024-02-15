require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes/index');

const app = express();
const port = process.env.NODE_PORT;

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use('/', routes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}`);
});