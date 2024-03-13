import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profileImage: '',
  });

  useEffect(() => {
    // Fetch user profile data when the component mounts
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5552/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'), // Include the JWT token from localStorage
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5552/users/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'), 
        },
        body: JSON.stringify({
          username: userData.username,
          profile_image: userData.profileImage,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      // User profile updated successfully
      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <h2>User Profile</h2>
      <label>Username:</label>
      <input type="text" name="username" value={userData.username} onChange={handleChange} />
      <label>Email:</label>
      <input type="email" value={userData.email} readOnly />
      <label>Profile Image URL:</label>
      <input type="text" name="profileImage" value={userData.profileImage} onChange={handleChange} />
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default Profile;