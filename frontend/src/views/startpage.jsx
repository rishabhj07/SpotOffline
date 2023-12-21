import React from "react";

const Startpage = () => {

    const handleLoginClick = () => {
        window.location.href = 'http://localhost:8080/login';
    }

    return (
        <div>
            <h1>Spotoffline</h1>
            <button id="login_button" onClick={handleLoginClick}>Login</button>
        </div>
    );
}

export default Startpage;