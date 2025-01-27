import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [setError] = useState(null);
	const [setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [registrationSuccess, setRegistrationSuccess] = useState(false);

	const handleSubmit = async (e) => {
		    e.preventDefault();

		    const registrationData = {
			          username,
			          email,
			          password,
			        };

		    //setLoading(true);

		    try {
			    const response = await axios.post('http://localhost:5000/register', registrationData);
			    console.log('Registration successful:', response.data);
			    setMessage('Registration successful! Please log in');
			    setRegistrationSuccess(true);

		    } catch (err) {
		      console.error('Error during registration:', err);
		      setError(err.response?.data?.message || 'Registration failed');
		    } finally {
		     // setLoading(false);
		    }
		  };

	  return (
		  <div>
		              <h2>Register</h2>
		              <form onSubmit={handleSubmit}>
		                  <input
		                      type="text"
		                      placeholder="Username"
		                      value={username}
		                      onChange={(e) => setUsername(e.target.value)}
		                      required
		                  />
		                  <input
		                      type="email"
		                      placeholder="Email"
		                      value={email}
		                      onChange={(e) => setEmail(e.target.value)}
		                      required
		                  />
		                  <input
		                      type="password"
		                      placeholder="Password"
		                      value={password}
		                      onChange={(e) => setPassword(e.target.value)}
		                      required
		                  />
		                  <button type="submit">Register</button>
		              </form>

		              {/* Display success message and Login button */}
		              {registrationSuccess && (
				                      <div>
				                          <p>{message}</p>
				                          <Link to="/login">
				                              <button>Login</button>
				                          </Link>
				                      </div>
				                  )}

		              {/* Display any error or generic message */}
		              {!registrationSuccess && message && <p>{message}</p>}
		          </div>
		      );



		      /*<div className="register-container">
		        <h2>Register</h2>

		        {error && <div className="error-message">{error}</div>}

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

		        <div className="home-button">
		          <Link to="/">
		            <button>Go to Homepage</button>
		          </Link>
		        </div>
		      </div>*/

};

export default RegisterPage;
