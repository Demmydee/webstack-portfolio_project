import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		    e.preventDefault();

		    const registrationData = {
			          username,
			          email,
			          password,
			        };

		    setLoading(true);

		    try {
			    const response = await axios.post('http://localhost:5000/register', registrationData);
			    console.log('Registration successful:', response.data);

		    } catch (err) {
		      console.error('Error during registration:', err);
		      setError(err.response?.data?.message || 'Registration failed');
		    } finally {
		      setLoading(false);
		    }
		  };

	  return (
		      <div className="register-container">
		        <h2>Register</h2>

		        {/* Display error message if registration fails */}
		        {error && <div className="error-message">{error}</div>}

		        {/* Registration Form */}
		        <form onSubmit={handleSubmit}>
		          <div className="form-group">
		            <label htmlFor="username">Username</label>
		            <input
		              type="text"
		              id="username"
		              value={username}
		              onChange={(e) => setUsername(e.target.value)}
		              required
		            />
		          </div>

		          <div className="form-group">
		            <label htmlFor="email">Email</label>
		            <input
		              type="email"
		              id="email"
		              value={email}
		              onChange={(e) => setEmail(e.target.value)}
		              required
		            />
		          </div>

		          <div className="form-group">
		            <label htmlFor="password">Password</label>
		            <input
		              type="password"
		              id="password"
		              value={password}
		              onChange={(e) => setPassword(e.target.value)}
		              required
		            />
		          </div>

		          <button type="submit" disabled={loading}>
		            {loading ? 'Registering...' : 'Register'}
		          </button>
		        </form>

		        {/* Home Button */}
		        <div className="home-button">
		          <Link to="/">
		            <button>Go to Homepage</button>
		          </Link>
		        </div>
		      </div>
		    );
};

export default RegisterPage;
