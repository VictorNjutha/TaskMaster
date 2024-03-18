import React, { useState } from 'react';

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
    fetch('http://127.0.0.1:5552/email-notification', {
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
    <div>
      <h2>Email Notification Preference</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <input type="checkbox" checked={emailNotificationEnabled} onChange={handleToggle} />
          Enable Email Notifications
        </label>
        <button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={handleEnable} disabled={emailNotificationEnabled || isLoading}>Enable</button>
        <button type="button" onClick={handleDisable} disabled={!emailNotificationEnabled || isLoading}>Disable</button>
      </form>
    </div>
  );
}

export default EmailNotificationForm;
