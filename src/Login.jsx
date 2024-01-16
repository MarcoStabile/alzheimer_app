// Login.jsx

import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Simulate authentication (replace with actual authentication logic)
        if (username === 'caregiver' && password === 'password') {
            onLogin(); // Notify the parent component that the user has logged in
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>Username: </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
