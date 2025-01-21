import React,  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
		      <>
		        <div className="App">
		          <header className="App-header">
		            <img src={logo} className="App-logo" alt="logo" />
		            <p>
		              Edit <code>src/App.js</code> and save to reload.
		            </p>
		            <a
		              className="App-link"
		              href="https://reactjs.org"
		              target="_blank"
		              rel="noopener noreferrer"
		            >
		              Learn React
		            </a>
		  	    <Router>
		              <Routes>
		    		<Route path="/" element={<HomePage />} />
			      	<Route path="/login" element={<LoginPage setToken={setToken} />} />
		              	<Route path="/register" element={<RegisterPage />} />
		              	<Route path="/upload" element={<FileUpload token={token} />} />
		              	<Route path="/files" element={<FileList token={token} />} />
		              </Routes>
		            </Router>
		          </header>
		        </div>	
		      </>
		    );
};

export default App;
