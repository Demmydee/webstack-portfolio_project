import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({token}) => {
	console.log('Token being sent:', token);
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState('');

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
			await axios.post('http://localhost:5000/api/files/upload', formData, {
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

	  return (
		      <div>
		        <input type="file" onChange={handleFileChange} />
		        <button onClick={handleFileUpload}>Upload</button>
		        <p>{message}</p>
		      </div>
		    );
};

export default FileUpload;
