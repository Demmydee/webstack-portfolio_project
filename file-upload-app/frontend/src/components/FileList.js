import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = ({ token }) => {
	  const [files, setFiles] = useState([]);

	  useEffect(() => {
		      const fetchFiles = async () => {
			            const response = await axios.get('/api/files/files', {
					            headers: {
							              'Authorization': `Bearer ${token}`,
							            },
					          });
			            setFiles(response.data);
			          };

		      fetchFiles();
		    }, [token]);

	  return (
		      <div>
		        <h2>Your Files</h2>
		        <ul>
		          {files.map(file => (
				            <li key={file._id}>
				              <p>{file.filename}</p>
				              <p>{file.uploadDate}</p>
				              <p>{file.fileSize} bytes</p>
				              <p>{file.fileType}</p>
				            </li>
				          ))}
		        </ul>
		      </div>
		    );
};

export default FileList;

