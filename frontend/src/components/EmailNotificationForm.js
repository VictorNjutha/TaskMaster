import React, { useState } from 'react';
import backgroundImage from '../images/landingpage.jpeg';
import Footer from './footer';

function EmailNotificationForm({ userEmail }) {
  const [emailNotificationEnabled, setEmailNotificationEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleToggle = () => {
    setEmailNotificationEnabled(!emailNotificationEnabled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage(''); // Clear any previous success message

    // Submit the preference to the backend
    fetch('https://task-master-backend-ng4l.onrender.com/email-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({ email_notification_enabled: emailNotificationEnabled })
    })
    .then(response => {
      setIsLoading(false);
      if (!response.ok) {
        throw new Error('Failed to update notification preference');
      }
      // Handle successful submission
      console.log('Notification preference updated successfully');
      setSuccessMessage('Notification preference updated successfully');
    })
    .catch(error => {
      setIsLoading(false);
      setErrorMessage('Failed to update notification preference. Please try again.');
      console.error('Error updating notification preference:', error);
    });
  };

  const handleEnable = () => {
    setEmailNotificationEnabled(true);
  };

  const handleDisable = () => {
    setEmailNotificationEnabled(false);
  };

  return (
    <div><h2>.</h2>
    <div className="container-fluid" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', position: 'relative'}}>
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="border p-4" style={{ backgroundColor: '#f2f2f2', marginTop: '50px' }}>
        <h2 className="mb-4 text-center">Email Notification Preference</h2>
        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <input type="checkbox" checked={emailNotificationEnabled} onChange={handleToggle} />
            Enable Email Notifications
          </label>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn btn-success" onClick={handleEnable} disabled={emailNotificationEnabled || isLoading}>Enable</button>
            <button type="button" className="btn btn-danger" onClick={handleDisable} disabled={!emailNotificationEnabled || isLoading}>Disable</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<Footer />
</div>

  );
}

export default EmailNotificationForm;
