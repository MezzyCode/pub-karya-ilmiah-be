const { pool } = require('../config/dbConfig');
const models = require('../models/userModel');

const handleQueryError = (res, err) => {
  // eslint-disable-next-line no-console
  console.error('Database error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
};

const verifyEmail = async (email) => {
  try {
    const checkEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkEmail.rows.length > 0) {
      throw new Error('Email already exists');
    }
  } catch (err) {
    throw new Error('Internal Server Error');
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await models.createUser(req.body);
    const { username } = newUser.rows[0];
    res.status(201).json({ message: 'User Created!', username });
  } catch (err) {
    handleQueryError(res, err);
  }
};

const getUser = async (req, res) => {
  try {
    const users = await models.getUser();
    res.json(users);
  } catch (err) {
    handleQueryError(res, err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await models.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    handleQueryError(res, err);
  }
};

const editUser = async (req, res) => {
  try {
    const editedData = await models.editUser(req.params.id, req.body);
    res.json({ message: 'User edited!', editedData });
  } catch (err) {
    handleQueryError(res, err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await models.deleteUserById(req.params.id);
    res.status(204).json({ message: 'User Deleted!' });
  } catch (err) {
    handleQueryError(res, err);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  editUser,
  deleteUser
};
