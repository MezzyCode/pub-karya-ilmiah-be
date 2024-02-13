const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

router.post('/user-create', userController.createUser);
router.get('/user-get', verifyToken, userController.getUser);
router.get('/user-get/:id', userController.getUserById);
router.put('/user-edit/:id', userController.editUser);
router.delete('/user-delete/:id', userController.deleteUser);

module.exports = router;
