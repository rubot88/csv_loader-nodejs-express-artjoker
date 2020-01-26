import React from 'react';

import './users-table.css';

const UserTable = ({ users, showHandler, dataUploaded }) => {
    const renderUsers = users && users.map(({ id, UserName, FirstName, LastName, Age }, idx) => {
        return (
            <tr key={id}>
                <td>{idx + 1}</td>
                <td>{UserName}</td>
                <td>{FirstName}</td>
                <td>{LastName}</td>
                <td>{Age}</td>
            </tr>
        )
    })
    return (
        <div className="jumbotron">
            <h1 className="text-center mb-3">Parsed users from CSV</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody >
                    {renderUsers}
                </tbody>
            </table>
            <button
                className="btn btn-info float-right"
                onClick={showHandler}
                disabled={!dataUploaded}>Load users</button>
        </div>
    )
};
export default UserTable;