const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/project-create', projectController.createProject);
router.get('/project-get', projectController.getProject);
router.get('/project-get/:id', projectController.getProjectById);
router.put('/project-edit/:id', projectController.editProject);
router.delete('/project-delete/:id', projectController.deleteProject);

module.exports = router;
