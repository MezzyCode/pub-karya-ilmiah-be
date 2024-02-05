const { pool } = require('../config/dbConfig');

const handleQueryError = (res, err) => {
  // eslint-disable-next-line no-console
  console.error('Database error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
};

const getProject = async (req, res) => {
  res.json({ message: 'Get ALl Project' });
};

const getProjectById = async (req, res) => {
  res.json({ message: 'Get Project By ID' });
};

const createProject = async (req, res) => {
  res.json({ message: 'Create Project' });
};

const editProject = async (req, res) => {
  res.json({ message: 'Edit Project' });
};

const deleteProject = async (req, res) => {
  res.json({ message: 'Project deleted' })
}

module.exports = {
  getProject,
  getProjectById,
  createProject,
  editProject,
  deleteProject
};
