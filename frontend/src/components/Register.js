import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/landingpage.jpeg';
import Footer from './footer';

const Register = () => {
  const [registerFormData, setRegisterFormData] = useState({
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegisterChange = (e) => {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    fetch('https://task-master-backend-ng4l.onrender.com/register', {
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
      setRegistrationSuccess(true);
    })
    .catch(error => {
      console.error('Error registering user:', error);
    });
  };

  const backgroundRadialGradientStyle = {
    backgroundColor: 'hsl(218, 41%, 15%)',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: '1.0',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
  };

  const bgGlassStyle = {
    backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
    backdropFilter: 'saturate(200%) blur(25px)',
    borderRadius: '15px',
    opacity: '1.0',
  };

  return (
    <div>
    <section style={backgroundRadialGradientStyle}>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            {/* Optionally, place content or additional elements here */}
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div className="card" style={bgGlassStyle}>
              <div className="card-body px-4 py-5 px-md-5">
                <div>
                  {registrationSuccess ? (
                    <div>
                      <p>Registration successful! You can now <Link to="/login">log in</Link>.</p>
                    </div>
                  ) : (
                    <div>
                      <h2>Sign Up</h2>
                      <form onSubmit={handleRegister}>
                        <div className="mb-3">
                          <label htmlFor="registerUsername" className="form-label">Username:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="registerUsername"
                            name="registerUsername"
                            value={registerFormData.registerUsername}
                            onChange={handleRegisterChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="registerEmail" className="form-label">Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            id="registerEmail"
                            name="registerEmail"
                            value={registerFormData.registerEmail}
                            onChange={handleRegisterChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="registerPassword" className="form-label">Password:</label>
                          <input
                            type="password"
                            className="form-control"
                            id="registerPassword"
                            name="registerPassword"
                            value={registerFormData.registerPassword}
                            onChange={handleRegisterChange}
                          />
                        </div>
                        <button type="register" className="btn btn-primary">Sign Up</button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
     <Footer />
     </div>
  );
};

export default Register;
