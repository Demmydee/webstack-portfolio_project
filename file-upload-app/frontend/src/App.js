import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Import Link from react-router-dom
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import logo from './logo.svg';
import HomePage from './components/HomePage';
import './App.css';

const App = () => {
	  const [token, setToken] = useState(localStorage.getItem('token'));

	  return (
		      <div className="App">
		        <header className="App-header">
		          <img src={logo} className="App-logo" alt="logo" />
		          <p>Upload your files to our online database.</p>
		          
		          {/* Adding Login and Register buttons */}
		          <div className="auth-buttons">
		            <Link to="/login">
		              <button>Login</button>
		            </Link>
		            <Link to="/register">
		              <button>Register</button>
		            </Link>
		          </div>

		          <Routes>
		            <Route path="/" element={<HomePage />} />
		            <Route path="/login" element={<LoginPage setToken={setToken} />} />
		            <Route path="/register" element={<RegisterPage />} />
		            <Route path="/upload" element={<FileUpload token={token} />} />
		            <Route path="/files" element={<FileList token={token} />} />
		          </Routes>
		        </header>
		      </div>
		    );
};

const Root = () => {
	  return (
		      <Router>
		        <App />
		      </Router>
		    );
};

export default Root;
