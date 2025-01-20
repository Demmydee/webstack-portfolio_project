const mongoose = require('mongoose');
require('dotenv').config(); // Ensure environment variables are loaded

const connectDB = async () => {
	  try {
		      const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/file-upload'; // Make sure the URI is defined
		      if (!uri) {
			            throw new Error('MongoDB URI is not defined!');
			          }
		      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		      console.log('MongoDB connected');
		    } catch (error) {
			        console.error('Error connecting to MongoDB:', error.message);
			        process.exit(1); // Exit the process if DB connection fails
			      }
};

module.exports = connectDB;

