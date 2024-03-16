import React, { useState } from 'react';
import backgroundImage from '../images/landingpage.jpeg';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5552/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Save access token to local storage
      localStorage.setItem('access_token', data.access_token);
      // Handle success
      // Redirect or perform any other actions
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error here
    });
  };

  // Define background and container styles
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

  const containerStyle = {
    opacity: 1.0,
    zIndex: 10,
    position: 'relative',
  };

  const bgGlassStyle = {
    backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
    backdropFilter: 'saturate(200%) blur(25px)',
    borderRadius: '15px',
    opacity: '1.0',
  };

  return (
    <section style={backgroundRadialGradientStyle}>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5" style={containerStyle}>
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0">
            {/* Optionally, place content or additional elements here */}
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div className="card" style={bgGlassStyle}>
              <div className="card-body px-4 py-5 px-md-5">
                <div>
                  <h2>Log In</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={formData.email} onChange={handleChange} />
                      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    </div>
                    <button type="login" className="btn btn-primary">Log In</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
