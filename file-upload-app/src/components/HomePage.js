import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
	  return (
		      <div>
		        <h1>Welcome to FileCloud</h1>
		        <p>Choose an action below:</p>

		        <div>
		          <Link to="/login">
		            <button>Login</button>
		          </Link>
		          <Link to="/register">
		            <button>Register</button>
		          </Link>
		        </div>
		      </div>
		    );
};

export default HomePage;

