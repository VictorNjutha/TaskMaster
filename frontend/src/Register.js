import React, { useState } from 'react';

function Register({ onLogin }) {
  const [registerFormData, setRegisterFormData] = useState({
    registerUsername: '',
    registerEmail: '',
    registerPassword: ''
  });

  const [loginFormData, setLoginFormData] = useState({
    loginEmail: '',
    loginPassword: ''
  });

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleRegisterChange = (e) => {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5552/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: registerFormData.registerUsername,
        email: registerFormData.registerEmail,
        password: registerFormData.registerPassword
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to register');
      }
      // Handle successful registration
      console.log('User registered successfully');
      setRegisterSuccess(true);
      // After successful registration, automatically log in the user
      handleLogin();
    })
    .catch(error => {
      console.error('Error registering user:', error);
    });
  };

  const handleLogin = () => {
    fetch('http://127.0.0.1:5552/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginFormData.loginEmail,
        password: loginFormData.loginPassword
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid email or password');
      }
      return response.json();
    })
    .then(data => {
      // Handle successful login
      console.log('User logged in successfully');
      setLoginSuccess(true);
      // Store the access token in local storage or state for future use
      localStorage.setItem('access_token', data.access_token);
      // Notify the parent component (if provided) that login is successful
      if (onLogin) {
        onLogin();
      }
    })
    .catch(error => {
      console.error('Error logging in:', error);
    });
  };

  return (
    <div>
      <div>
        <h2>Register</h2>
        {registerSuccess && <p>Successfully registered! You can now login.</p>}
        <form onSubmit={handleRegister}>
          <div>
            <label>Username:</label>
            <input type="text" name="registerUsername" value={registerFormData.registerUsername} onChange={handleRegisterChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="registerEmail" value={registerFormData.registerEmail} onChange={handleRegisterChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="registerPassword" value={registerFormData.registerPassword} onChange={handleRegisterChange} />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>

      <div>
        <h2>Login</h2>
        {loginSuccess && <p>Successfully logged in!</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input type="email" name="loginEmail" value={loginFormData.loginEmail} onChange={handleLoginChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="loginPassword" value={loginFormData.loginPassword} onChange={handleLoginChange} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
