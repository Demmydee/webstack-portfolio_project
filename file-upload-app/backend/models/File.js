const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
	  filename: { type: String, required: true },
	  path: { type: String, required: true },
	  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	  fileSize: { type: Number, required: true },
	  fileType: { type: String, required: true },
	  uploadDate: { type: Date, default: Date.now },
	  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

module.exports = File;

