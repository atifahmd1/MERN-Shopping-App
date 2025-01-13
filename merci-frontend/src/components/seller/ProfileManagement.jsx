import React, { useState } from 'react';

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await fetch('/api/seller/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <h1>Profile Management</h1>
      <label>
        Name: <input name="name" value={profile.name} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Email: <input name="email" value={profile.email} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Password: <input name="password" type="password" value={profile.password} onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ProfileManagement;
