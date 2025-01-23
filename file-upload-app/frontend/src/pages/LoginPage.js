import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
			   setMessage('Login successful');
			   console.log(response.data);

			   navigate('/upload');

		       } catch (error) {
			   setMessage('Login failed');
			   console.error('Error during login:', error);
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
		      </div>
		    );
};

export default LoginPage;
