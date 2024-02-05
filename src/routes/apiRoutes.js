const express = require('express');

const router = express.Router();

//Project API
const projectController = require('../controllers/projectController');
router.post('/project-create', projectController.createProject);
router.get('/project-get', projectController.getProject);
router.get('/project-get/:id', projectController.getProjectById);
router.put('/project-edit/:id', projectController.editProject);
router.delete('/project-delete/:id', projectController.deleteProject);

//User API
const userController = require('../controllers/userController');
router.post('/user-create', userController.createUser);
router.get('/user-get', userController.getUser);
router.get('/user-get/:id', userController.getUserById);
router.put('/user-edit/:id', userController.editUser);
router.delete('/user-delete/:id', userController.deleteUser);

module.exports = router;
