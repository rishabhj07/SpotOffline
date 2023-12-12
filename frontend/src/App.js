import React from 'react';

class App extends React.Component {
  handleLoginClick = () => {
    window.location.href = 'http://localhost:8080/login';
  }

  render() {
    return (
      <div>
        <h1>Click to login</h1>
        <button id="login_button" onClick={this.handleLoginClick}>Login</button>
      </div>
    );
  }
}

export default App;