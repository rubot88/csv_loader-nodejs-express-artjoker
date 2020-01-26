import React from 'react';

import './alert.css';

const Alert = ({ message, status }) => {
    const alertType = status ? 'success' : 'danger';
    return (
            <div className={`alert alert-${alertType} text-center`} >
                {message}
            </div>
    )
};
export default Alert;