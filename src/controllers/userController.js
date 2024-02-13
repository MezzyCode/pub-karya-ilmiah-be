const models = require('../models/userModel');

const handleQueryError = (req, res, err) => {
  const sendBadRequest = (message) => {
    res.status(400).json({ message });
  };

  switch (err.constraint) {
    case 'email_unique':
      const email = req.body.email
      sendBadRequest(`Email ${email} already exists`);
      break;
    case 'valid_roles_chk':
      sendBadRequest('Invalid Roles');
      break;
    default:
      res.status(500).json(err);
      console.log(err);
      break;
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await models.createUser(req.body);
    const { username } = newUser.rows[0];
    res.status(201).json({ message: 'User Created!', username });
  } catch (err) {
    handleQueryError(req, res, err);
  }
};

const getUser = async (req, res) => {
  try {
    const users = await models.getUser();
    res.json(users);
  } catch (err) {
    handleQueryError(req, res, err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await models.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    handleQueryError(req, res, err);
  }
};

const editUser = async (req, res) => {
  try {
    const editedData = await models.editUser(req.params.id, req.body);
    res.status(201).json({ message: 'User edited!', editedData });
  } catch (err) {
    console.log(err);
    handleQueryError(req, res, err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await models.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const username = user.username;
    await models.deleteUserById(user.user_id);

    res.status(200).json({ message: `${username} successfully deleted` });
  } catch (err) {
    handleQueryError(req, res, err);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  editUser,
  deleteUser
};
