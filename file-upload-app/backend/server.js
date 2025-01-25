const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
//const multer = require('multer');

// Database connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//Mongodb connection string
const dbUri = 'mongodb://localhost:27017/fileupload';

//Define the user schema
const userSchema = new mongoose.Schema({
	  username: { type: String, required: true },
	  email: { type: String, required: true, unique: true },
	  password: { type: String, required: true }
});

// Create a model from the schema
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Routes
app.use('/api/user', userRoutes);
app.use('/api/files', fileRoutes);

app.post('/register', async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		    return res.status(400).json({ message: 'All fields are required' });
		  }

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
		  return res.status(400).json({ message: 'Email already exists' });
		}
	
	const newUser = new User({ username, email, password });

	const savedUser = await newUser.save();

		  res.status(201).json({
			  message: 'Registration successful',
			  user: {
				  username: savedUser.username,
				  email: savedUser.email
			  }
			});
	} catch(err) {
		      console.error('Error saving user to MongoDB:', err);
		      if (!res.headersSent) {
			      res.status(500).json({ 
				      message: 'Internal server error during registration',
			      	      error: err.message,
			      });
		    };
};
});

app.post('/login', async (req, res) => {
	  const { email, password } = req.body;
	  
	  try {

		  if (!email || !password) {
		     return res.status(400).json({ message: 'Email and password are required' });
		   }

		  const user = await User.findOne({ email });
		  if (!user) {
			return res.status(400).json({ message: 'email not found' });
		  }

		  const isPasswordCorrect = await bcrypt.compare(password, user.password);
		      if (!isPasswordCorrect) {
			            return res.status(400).json({ message: 'Incorrect password' });
		  }

		  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
		  res.status(200).json({
			message: 'Login successful',
			user,
			token
		  });

	} catch (err) {
		console.error('Error during login:', err);
		res.status(500).json({ message: 'Server error during login', error: err.message });
		}
});

//define a route for root
app.get('/', (req, res) => {
	  res.send('Hello, World!');
});

// Static file serving (if necessary)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
