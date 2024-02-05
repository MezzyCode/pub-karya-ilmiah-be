/* eslint-disable no-console */
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_DB_USER,
  host: process.env.PG_DB_HOST,
  database: process.env.PG_DB_NAME,
  password: process.env.PG_DB_PASSWORD,
  port: process.env.PG_DB_PORT,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log(`Connected to PostgreSQL [${process.env.PG_DB_NAME}] on [${res.rows[0].now}]`);
  }
});

module.exports = { pool };
