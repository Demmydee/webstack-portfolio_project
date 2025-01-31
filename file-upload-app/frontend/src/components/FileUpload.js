import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');
const FileUpload = ({token}) => {
	console.log('Token being sent:', token);
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState('');
	const [userFiles, setUserFiles] = useState([]);
	const navigate = useNavigate();

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
		};

	const handleFileUpload = async () => {
		if (!file) {
			setMessage('Please select a file');
			return;
			}
		if (!token) {
			            setMessage('No token, please log in.');
			            return;
		}
		console.log('Token being sent:', token);

		const formData = new FormData();
		formData.append('file', file);

		try {
			await axios.post('https://webstack-portfolio-project-mk17.onrender.com/api/files/upload', formData, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			});
			setMessage('File uploaded successfully');
		} catch (error) {
			console.error('Error response:', error.response);
			if (error.response && error.response.status === 401) {
				setMessage('Authorization failed, please check your token.');
			} else {
			setMessage('Error uploading file');
			}
		}
	};
	 /* const handleViewFiles = async () => {
		if (!token) {
			setMessage('You must be logged in to view files.');
			return;
		}
		          
		try {
			const response = await axios.get('http://localhost:5000/api/files/user/files', {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			setUserFiles(response.data);
		} catch (error) {
			console.error('Error fetching files:', error);
			setMessage('Error fetching files.');
		}
	};*/

	  const goToUserFiles = () => {
		navigate('/user-files');
	};

	  return (
		  <div>
		      <div>
		        <input type="file" onChange={handleFileChange} />
		        <button onClick={handleFileUpload}>Upload</button>
		        <p>{message}</p>
		      </div>
		      <div className="home-button">
		        <Link to="/">
		          <button>Logout</button>
		        </Link>
		      </div>
		      <div className="user-files-button">
		        <button onClick={goToUserFiles}>View My Files</button>
		      </div>
		  </div>
	);
};

export default FileUpload;
