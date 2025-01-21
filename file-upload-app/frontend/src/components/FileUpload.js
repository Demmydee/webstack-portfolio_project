import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ token }) => {
	  const [file, setFile] = useState(null);
	  const [message, setMessage] = useState('');

	  const handleFileChange = (e) => {
		      setFile(e.target.files[0]);
		    };

	  const handleFileUpload = async () => {
		      const formData = new FormData();
		      formData.append('file', file);

		      try {
			            await axios.post('/api/files/upload', formData, {
					            headers: {
							              'Authorization': `Bearer ${token}`,
							              'Content-Type': 'multipart/form-data',
							            },
					          });
			            setMessage('File uploaded successfully');
			          } catch (error) {
					        setMessage('Error uploading file');
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

