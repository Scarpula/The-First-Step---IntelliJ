import React from 'react'
import Register from "./components/Register";
import Login from "./components/Login";

const test = () => {
    return (
        <div className="App">
            <h1>User Management</h1>
            <h2>Register</h2>
            <Register />
            <h2>Login</h2>
            <Login />
        </div>
    );
}

export default test