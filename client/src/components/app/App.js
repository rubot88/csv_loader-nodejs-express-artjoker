import React, { Component } from 'react';

import Alert from '../alert';
import UploadForm from '../upload-form';
import UsersTable from '../users-table';

class App extends Component {
  state = {
    message: null,
    showAlert: false,
    dataUploaded: false,
    users: null
  }

  submitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/upload-csv', {
      method: 'POST',
      body: new FormData(event.target)

    });

    const message = await response.json();
    this.setState({
      message,
      showAlert: true,
      dataUploaded: true,
    })
    setTimeout(() => this.setState({ showAlert: false }), 3500)
  }

  showUsersHandler = async () => {
    let response = await fetch('http://localhost:5000/users');
    response = await response.json();
    if (Array.isArray(response)) {
      return this.setState({
        users: response
      })
    }
    this.setState({
      message: response,
      showAlert: true
    });
    setTimeout(() => this.setState({ showAlert: false }), 3500)
  };

  downloadHandler = async () => {
    await fetch('http://localhost:5000/users?csv=true');
  }
  render() {
    const { showAlert, message, dataUploaded, users } = this.state;
    const alert = showAlert ? <Alert message={message.message} status={message.success} /> : null;
    return (
      <div className="container">
        {alert}
        <UploadForm onsubmit={this.submitHandler} />

        <UsersTable users={users} showHandler={this.showUsersHandler} dataUploaded={dataUploaded} />
        <a href="http://localhost:5000/users?csv=true" download>
          <button
            className="btn btn-info float-right"
            disabled={!dataUploaded}>
            Download CSV
            </button>
        </a>

      </div>
    );
  }
}

export default App;
