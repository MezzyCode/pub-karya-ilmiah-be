const models = require('../models/projectModel');

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
      break;
  }
};

const createProject = async (req, res) => {
  try {
    // const userId = '';
    // const newProject = await models.createProject({ ...req.body, project_created_by: userId });
    const newProject = await models.createProject(req.body)
    const { project_name } = newProject.rows[0];
    res.status(201).json({ message: 'Project Created!', project_name });
  } catch (err) {
    handleQueryError(req, res, err);
  }
};

const getProject = async (req, res) => {
  try {
    const project = await models.getProject();
    res.json(project);
  } catch (err) {
    handleQueryError(req, res, err);
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await models.getProjectById(req.params.id);
    res.json(project);
  } catch (err) {
    handleQueryError(req, res, err);
  }
};

const editProject = async (req, res) => {
  try {
    const editedData = await models.editProject(req.params.id, req.body);
    res.status(201).json({ message: 'Project edited!', editedData });
  } catch (err) {
    console.log(err);
    handleQueryError(req, res, err);
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await models.getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const projectName = project.project_name;
    await models.deleteProject(project.project_id);

    res.status(200).json({ message: `${username} successfully deleted` });
  } catch (err) {
    handleQueryError(req, res, err);
  }
}

module.exports = {
  createProject,
  getProject,
  getProjectById,
  editProject,
  deleteProject
};
