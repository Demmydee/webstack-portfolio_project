import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
	  const [email, setEmail] = useState('');
	  const [password, setPassword] = useState('');
	  const [message, setMessage] = useState('');
	  const navigate = useNavigate();

	const handleSubmit = async (e) => {
		      e.preventDefault();
		   
		      try {
			   const response = await axios.post('http://localhost:5000/login', {
				email,
				password,
			   }, {
			     headers: {
			       'Content-Type': 'application/json',
			     }
			   });
			   const token = response.data.token;
			   if (token) {
				localStorage.setItem('token', token);
			   } else {
				console.log('No token returned from login');
						            }
			   setMessage('Login successful');
			   console.log(response.data);

			   navigate('/upload');

		       } catch (error) {
			   setMessage('Login failed');
			   console.error('Error during log in:', error);
			   }
		    };

	  return (
		      <div>
		        <h2>Login</h2>
		        <form onSubmit={handleSubmit}>
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
		          <button type="submit">Login</button>
		        </form>
		        {message && <p>{message}</p>}
		  	<div className="home-button">
		     	  <Link to="/">
		            <button>Go to Homepage</button>
		     	  </Link>
		  	</div>
		      </div>
		    );
};

export default LoginPage;
