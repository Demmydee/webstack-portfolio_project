const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { uploadFile, getUserFiles } = require('../controllers/fileController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/upload', authenticateUser, uploadFile);
router.get('/files', authenticateUser, getUserFiles);

module.exports = router;
