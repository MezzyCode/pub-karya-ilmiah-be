const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/dbConfig');
const bcrypt = require('bcrypt');

// User model schema is:
// id [uuid]
// username [250], password [50], email [255] [varchar]
// role [numeric 1-5]

const createUser = async (data) => {
  const id = uuidv4();
  data.password = await bcrypt.hash(data.password, 10);
  const columns = [...Object.keys(data), 'id'];
  const values = [...Object.values(data), id];

  const result = await pool.query(
    `INSERT INTO users (${columns.join(', ')}) VALUES (${values.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`,
    values,
  );
  return result;
};

const getUser = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
  return result.rows[0];
};

const editUser = async (id, updatedData) => {
  const columns = Object.keys(updatedData);
  const values = Object.values(updatedData);

  const result = await pool.query(
    `UPDATE users SET ${columns.map((col, index) => `${col}=$${index + 1}`).join(', ')} WHERE id=$${columns.length + 1} RETURNING *`,
    [...values, id],
  );
  return result.rows[0];
};

const deleteUserById = async (id) => {
  await pool.query('DELETE FROM users WHERE id=$1', [id]);
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  editUser,
  deleteUserById
};
