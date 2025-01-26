import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserFiles = ({ token }) => {
	    const [userFiles, setUserFiles] = useState([]);
	    const [message, setMessage] = useState('');

	    useEffect(() => {
		if (!token) {
			setMessage('No token, please log in.');
			return;
		}

		const fetchUserFiles = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/files/user-files', {
					headers: {
						'Authorization': `Bearer ${token}`,
					},
				});
				setUserFiles(response.data);
			} catch (error) {
				console.error('Error fetching user files:', error);
				setMessage('Error fetching user files');
			}
		};

	    	fetchUserFiles();
	    }, [token]);

	    return (
		<div>
		   <h2>Your Uploaded Files</h2>
		   {message && <p>{message}</p>}
		   {userFiles.length === 0 ? (
		     <p>No files uploaded yet.</p>
		   ) : (
		     <ul>
		     	{userFiles.map((file) => (
				<li key={file._id}>
					<a href={`http://localhost:5000/uploads/${file.filename}`} target="_blank" rel="noopener noreferrer">
						{file.filename}
					</a>
				</li>
			))}
		     </ul>
		   )}
		 </div>
	);
};

export default UserFiles;

