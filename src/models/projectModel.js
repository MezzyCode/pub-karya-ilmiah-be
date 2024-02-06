const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/dbConfig');

const createProject = async (data) => {
  const id = uuidv4();
  const columns = [...Object.keys(data), 'project_id'];
  const values = [...Object.values(data), id];

  const result = await pool.query(
    `INSERT INTO projects (${columns.join(', ')}) VALUES (${values.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`,
    values,
  );
  return result;
};

const getProject = async () => {
  const result = await pool.query('SELECT * FROM projects');
  return result.rows;
};

const getProjectById = async (id) => {
  const result = await pool.query('SELECT * FROM projects WHERE project_id=$1', [id]);
  return result.rows[0];
};

const editProject = async (id, updatedData) => {
  const columns = Object.keys(updatedData);
  const values = Object.values(updatedData);

  const result = await pool.query(
    `UPDATE projects SET ${columns.map((col, index) => `${col}=$${index + 1}`).join(', ')} WHERE project_id=$${columns.length + 1} RETURNING *`,
    [...values, id],
  );
  return result.rows[0];
};

const deleteProject = async (id) => {
  await pool.query('DELETE FROM projects WHERE project_id=$1', [id]);
};

module.exports = {
  createProject,
  getProject,
  getProjectById,
  editProject,
  deleteProject
}