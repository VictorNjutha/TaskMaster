import React, { useState, useEffect } from 'react';
import profile from '../images/profile.jpg';
import '../index.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });

  // Define the default profile picture URL
  const defaultProfilePicture = 'https://i.pinimg.com/564x/fd/cd/d4/fdcdd4eeba23eaaf4cf2d6012102c4b5.jpg';

  useEffect(() => {
    // Fetch user profile data when the component mounts
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5552/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const userProfileData = await response.json();
      // Set user data including default profile picture URL
      setUserData({ ...userProfileData, profileImage: defaultProfilePicture });
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: 'lightblue', minHeight: '100vh' }}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-6">
          <div className="card shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">User Profile</h2>
              <div className="form-group row">
                <label htmlFor="username" className="col-sm-3 col-form-label">Username:</label>
                <div className="col-sm-9">
                  <p id="username">{userData.username}</p>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-3 col-form-label">Email:</label>
                <div className="col-sm-9">
                  <p id="email">{userData.email}</p>
                </div>
              </div>
              <div className="text-center">
                {/* Display the default profile picture */}
                <img src={userData.profileImage} alt="Profile" className="img-fluid rounded-circle" style={{ maxWidth: '200px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
