// import React, { useState } from 'react';

// function Register({ onLogin }) {
//   const [registerFormData, setRegisterFormData] = useState({
//     registerUsername: '',
//     registerEmail: '',
//     registerPassword: ''
//   });

//   const [loginFormData, setLoginFormData] = useState({
//     loginEmail: '',
//     loginPassword: ''
//   });

//   const [registerSuccess, setRegisterSuccess] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);

//   const handleRegisterChange = (e) => {
//     setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
//   };

//   const handleLoginChange = (e) => {
//     setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     fetch('http://127.0.0.1:5552/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         username: registerFormData.registerUsername,
//         email: registerFormData.registerEmail,
//         password: registerFormData.registerPassword
//       })
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Failed to register');
//       }
//       // Handle successful registration
//       console.log('User registered successfully');
//       setRegisterSuccess(true);
//       // After successful registration, automatically log in the user
//       handleLogin();
//     })
//     .catch(error => {
//       console.error('Error registering user:', error);
//     });
//   };

//   const handleLogin = () => {
//     fetch('http://127.0.0.1:5552/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: loginFormData.loginEmail,
//         password: loginFormData.loginPassword
//       })
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Invalid email or password');
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Handle successful login
//       console.log('User logged in successfully');
//       setLoginSuccess(true);
//       // Store the access token in local storage or state for future use
//       localStorage.setItem('access_token', data.access_token);
//       // Notify the parent component (if provided) that login is successful
//       if (onLogin) {
//         onLogin();
//       }
//     })
//     .catch(error => {
//       console.error('Error logging in:', error);
//     });
//   };

//   return (
//     <div>
//       <div>
//         <h2>Register</h2>
//         {registerSuccess && <p>Successfully registered! You can now login.</p>}
//         <form onSubmit={handleRegister}>
//           <div>
//             <label>Username:</label>
//             <input type="text" name="registerUsername" value={registerFormData.registerUsername} onChange={handleRegisterChange} />
//           </div>
//           <div>
//             <label>Email:</label>
//             <input type="email" name="registerEmail" value={registerFormData.registerEmail} onChange={handleRegisterChange} />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input type="password" name="registerPassword" value={registerFormData.registerPassword} onChange={handleRegisterChange} />
//           </div>
//           <button type="submit">Register</button>
//         </form>
//       </div>

//       <div>
//         <h2>Login</h2>
//         {loginSuccess && <p>Successfully logged in!</p>}
//         <form onSubmit={handleLogin}>
//           <div>
//             <label>Email:</label>
//             <input type="email" name="loginEmail" value={loginFormData.loginEmail} onChange={handleLoginChange} />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input type="password" name="loginPassword" value={loginFormData.loginPassword} onChange={handleLoginChange} />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;






// import React, { useState } from 'react';
// import backgroundImage from '../images/landingpage.jpeg';

// const Register = ({ onLogin }) => {
//   const [registerFormData, setRegisterFormData] = useState({
//     registerUsername: '',
//     registerEmail: '',
//     registerPassword: '',
//   });

//   const [loginFormData, setLoginFormData] = useState({
//     loginEmail: '',
//     loginPassword: '',
//   });

//   const [registerSuccess, setRegisterSuccess] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);

//   // Handle register form changes
//   const handleRegisterChange = (e) => {
//     setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
//   };

//   // Handle login form changes
//   const handleLoginChange = (e) => {
//     setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
//   };

//   // Define background styles for the component
//   const backgroundRadialGradientStyle = {
//     backgroundColor: 'hsl(218, 41%, 15%)',
//     backgroundImage: `url(${backgroundImage})`,
//     backgroundSize: 'cover', // Set background size to cover
//     backgroundPosition: 'center', // Set background position to center
//     opacity: '1.0', // This should be in your component style rather than the background style
//     height: '100vh',
//     overflow: 'hidden',
//     position: 'relative',
//   };

//   const containerStyle = {
//     opacity: 1.0, // Adjust the opacity value as needed (values range from 0 to 1)
//   };

//   const bgGlassStyle = {
//     backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
//     backdropFilter: 'saturate(200%) blur(25px)',
//     borderRadius: '15px',
//     opacity:'1.0',
//   };

//   // Function to handle registration
//   const handleRegister = (e) => {
//     e.preventDefault();
//     // Registration logic here
//   };

//   // Function to handle login
//   const handleLogin = () => {
//     // Login logic here
//   };

//   return (
//     <section style={backgroundRadialGradientStyle}>
//       <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
//         <div className="row gx-lg-5 align-items-center mb-5">
//           <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
//             {/* Optionally, place content or additional elements here */}
//           </div>
//           <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
//             <div className="card" style={bgGlassStyle}>
//               <div className="card-body px-4 py-5 px-md-5">
//                 <div>
//                   <h2>Register</h2>
//                   {registerSuccess && <p>Successfully registered! You can now login.</p>}
//                   <form onSubmit={handleRegister}>
//                     <div>
//                       <label>Username:</label>
//                       <input
//                         type="text"
//                         name="registerUsername"
//                         value={registerFormData.registerUsername}
//                         onChange={handleRegisterChange}
//                       />
//                     </div>
//                     <div>
//                       <label>Email:</label>
//                       <input
//                         type="email"
//                         name="registerEmail"
//                         value={registerFormData.registerEmail}
//                         onChange={handleRegisterChange}
//                       />
//                     </div>
//                     <div>
//                       <label>Password:</label>
//                       <input
//                         type="password"
//                         name="registerPassword"
//                         value={registerFormData.registerPassword}
//                         onChange={handleRegisterChange}
//                       />
//                     </div>
//                     <button type="submit">Register</button>
//                   </form>
//                 </div>

//                 <div>
//                   <h2>Login</h2>
//                   {loginSuccess && <p>Successfully logged in!</p>}
//                   <form onSubmit={handleLogin}>
//                     <div>
//                       <label>Email:</label>
//                       <input
//                         type="email"
//                         name="loginEmail"
//                         value={loginFormData.loginEmail}
//                         onChange={handleLoginChange}
//                       />
//                     </div>
//                     <div>
//                       <label>Password:</label>
//                       <input
//                         type="password"
//                         name="loginPassword"
//                         value={loginFormData.loginPassword}
//                         onChange={handleLoginChange}
//                       />
//                     </div>
//                     <button type="submit">Login</button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Register;









import React, { useState } from 'react';
import backgroundImage from '../images/landingpage.jpeg';

const Register = ({ onLogin }) => {
  const [registerFormData, setRegisterFormData] = useState({
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
  });

  const handleRegisterChange = (e) => {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Registration logic here
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;