const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { uploadFile, getUserFiles } = require('../controllers/fileController');
const { authenticateUser } = require('../middleware/authMiddleware');
const File = require('../models/File');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/'); // Store files in the 'uploads' folder
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filenames
	},
});

const upload = multer({ storage });

router.post('/upload', authenticateUser, upload.single('file'), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded' });
		}

		const newFile = new File({
			filename: req.file.filename,
			path: req.file.path,
			user: req.user._id, // Store the user's ID with the file
			userId: req.user._id,
			fileType: req.file.mimetype,  // Store the file's MIME type
			fileSize: req.file.size,
		});
		
		await newFile.save();
		res.status(200).json({ message: 'File uploaded successfully', file: newFile });
	} catch (err) {
		console.error('Error during file upload:', err);
		res.status(500).json({ message: 'Internal server error' });
	}
});

//router.post('/upload', authenticateUser, uploadFile);
router.get('/files', authenticateUser, getUserFiles);
router.get('/user-files', authenticateUser, async (req, res) => {
	  try {
		const files = await File.find({ userId: req.user._id }).exec();
		          res.status(200).json(files);
		/*const userFiles = await File.find({ user: req.user._id });
			res.status(200).json(userFiles);*/
	  } catch (err) {
		console.error('Error fetching user files:', err);
		res.status(500).json({ message: 'Error fetching user files' });
	  }
});

module.exports = router;
