import React from 'react';

import './upload-form.css'

const UploadForm = ({onsubmit}) => {
    return (
        <div className="jumbotron">
            <h1 className="text-center mb-4">Upload file</h1>
            <form encType="multipart/form-data" className="from text-center d-flex justify-content-center align-items-center"
             onSubmit={onsubmit}
              action="http://localhost:5000/users" 
              method="POST" >
                    <input type="file" name="users" className="custom-input" />
                    <button 
                    className="btn btn-primary"
                    type="submit">Send file</button>
            </form>
        </div>
    )
};

export default UploadForm;
