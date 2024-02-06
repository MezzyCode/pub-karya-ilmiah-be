const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/dbConfig');

// User model schema is:
// user_id [uuid]
// username, password, email, role [varchar]

const createUser = async (data) => {
  const id = uuidv4();
  const columns = [...Object.keys(data), 'user_id'];
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
  const result = await pool.query('SELECT * FROM users WHERE user_id=$1', [id]);
  return result.rows[0];
};

const editUser = async (id, updatedData) => {
  const columns = Object.keys(updatedData);
  const values = Object.values(updatedData);

  const result = await pool.query(
    `UPDATE users SET ${columns.map((col, index) => `${col}=$${index + 1}`).join(', ')} WHERE user_id=$${columns.length + 1} RETURNING *`,
    [...values, id],
  );
  return result.rows[0];
};

const deleteUserById = async (id) => {
  await pool.query('DELETE FROM users WHERE user_id=$1', [id]);
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  editUser,
  deleteUserById
};
