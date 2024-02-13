const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/', userRoutes);
router.use('/', authRoutes);

module.exports = router;
