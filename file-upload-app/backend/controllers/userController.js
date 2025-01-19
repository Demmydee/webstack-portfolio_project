const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
	  const { username, email, password } = req.body;
	  const userExist = await User.findOne({ email });
	  if (userExist) return res.status(400).json({ message: 'User already exists' });

	  const user = new User({ username, email, password });
	  await user.save();
	  res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = async (req, res) => {
	  const { email, password } = req.body;
	  const user = await User.findOne({ email });
	  if (!user) return res.status(400).json({ message: 'User not found' });

	  const isMatch = await user.matchPassword(password);
	  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

	  const token = user.generateToken();
	  res.status(200).json({ token });
};

module.exports = { registerUser, loginUser };

