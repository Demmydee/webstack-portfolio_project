const multer = require('multer');
const File = require('../models/File');
const path = require('path');

const storage = multer.diskStorage({
	  destination: (req, file, cb) => {
		      cb(null, 'uploads/');
		    },
	  filename: (req, file, cb) => {
		      cb(null, Date.now() + path.extname(file.originalname));
		    },
});

const upload = multer({ storage: storage }).single('file');

const uploadFile = async (req, res) => {
	  upload(req, res, async (err) => {
		      if (err) {
			            return res.status(400).json({ message: 'File upload failed' });
			          }
		      const newFile = new File({
			            filename: req.file.filename,
			            fileSize: req.file.size,
			            fileType: req.file.mimetype,
			            userId: req.user.id,
			          });
		      await newFile.save();
		      res.status(200).json({ message: 'File uploaded successfully' });
		    });
};

const getUserFiles = async (req, res) => {
	  const files = await File.find({ userId: req.user.id });
	  res.status(200).json(files);
};

module.exports = { uploadFile, getUserFiles };

