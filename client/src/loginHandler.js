// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('login_button').addEventListener('click', function() {
//         window.location.href = '/login';
//     })
// })

import React from 'react';
import ReactDOM from 'react-dom';

class LoginButton extends React.Component {
    handleLogin = () => {
        window.location.href = '/login';
    }

    render() {
        return (
            <div>
                <h1>Click to login</h1>
                <button id="login_button" onClick={this.handleLogin}>Login</button>
            </div>
        );
    }
}

ReactDOM.render(<LoginButton />, document.getElementById('root'));