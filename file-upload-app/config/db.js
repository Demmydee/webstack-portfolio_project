const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
	  try {
		      const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/file-upload';
		      if (!uri) {
			            throw new Error('MongoDB URI is not defined!');
			          }
		      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		      console.log('MongoDB connected');
		    } catch (error) {
			        console.error('Error connecting to MongoDB:', error.message);
			        process.exit(1);
			      }
};

module.exports = connectDB;

