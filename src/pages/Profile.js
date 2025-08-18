// src/pages/Profile.js
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [bio, setBio] = useState('Passionate donor and volunteer.');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    alert('Profile updated successfully!');
    // You can integrate backend logic here
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="profile-picture">
        {preview ? <img src={preview} alt="Profile Preview" /> : <div className="placeholder">No Image</div>}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div className="profile-details">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Bio</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

        <button onClick={handleSave}>Save Changes</button>
      </div>

      <div className="profile-additional">
        <h3>Additional Features</h3>
        <ul>
          <li>View Donation History</li>
          <li>Manage Campaign Subscriptions</li>
          <li>Set Donation Preferences</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
