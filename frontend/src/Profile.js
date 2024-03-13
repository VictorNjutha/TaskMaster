import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });

  // Define the default profile picture URL
  const defaultProfilePicture = 'https://image.kilimall.com/kenya/shop/store/goods/5603/2022/09/1663988910431b23368a706e8434e822580b9ab7cba98_360.jpg.webp#';

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
    <div>
      <h2>User Profile</h2>
      <label>Username:</label>
      <p>{userData.username}</p>
      <label>Email:</label>
      <p>{userData.email}</p>
      {/* Display the default profile picture */}
      <img src={userData.profileImage} alt="Profile" />
    </div>
  );
};

export default Profile;
