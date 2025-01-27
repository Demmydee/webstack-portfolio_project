const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { uploadFile, getUserFiles } = require('../controllers/fileController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

