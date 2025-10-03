// // // src/pages/Profile.js
// // import React, { useState } from 'react';
// // import './Profile.css';

// // const Profile = () => {
// //   const [name, setName] = useState('John Doe');
// //   const [email, setEmail] = useState('john@example.com');
// //   const [bio, setBio] = useState('Passionate donor and volunteer.');
// //   const [image, setImage] = useState(null);
// //   const [preview, setPreview] = useState(null);

// //   const handleImageUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setImage(file);
// //       setPreview(URL.createObjectURL(file));
// //     }
// //   };

// //   const handleSave = () => {
// //     alert('Profile updated successfully!');
// //     // You can integrate backend logic here
// //   };

// //   return (
// //     <div className="profile-page">
// //       <h2>My Profile</h2>

// //       <div className="profile-picture">
// //         {preview ? <img src={preview} alt="Profile Preview" /> : <div className="placeholder">No Image</div>}
// //         <input type="file" accept="image/*" onChange={handleImageUpload} />
// //       </div>

// //       <div className="profile-details">
// //         <label>Name</label>
// //         <input value={name} onChange={(e) => setName(e.target.value)} />

// //         <label>Email</label>
// //         <input value={email} onChange={(e) => setEmail(e.target.value)} />

// //         <label>Bio</label>
// //         <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

// //         <button onClick={handleSave}>Save Changes</button>
// //       </div>

// //       <div className="profile-additional">
// //         <h3>Additional Features</h3>
// //         <ul>
// //           <li>View Donation History</li>
// //           <li>Manage Campaign Subscriptions</li>
// //           <li>Set Donation Preferences</li>
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;












// import React, { useState, useEffect } from 'react';
// import './Profile.css';

// const Profile = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [bio, setBio] = useState('');
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // Get current user ID/email from localStorage
//   const storedUser = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     if (storedUser) {
//       // Fetch user data from backend
//       fetch(`http://localhost:5000/users/${storedUser._id}`)
//         .then(res => res.json())
//         .then(data => {
//           setName(data.username || '');
//           setEmail(data.email || '');
//           setBio(data.bio || ''); // bio field if exists in your DB
//           // If you store profile image URL in DB:
//           if (data.imageUrl) setPreview(data.imageUrl);
//         })
//         .catch(err => console.error(err));
//     }
//   }, [storedUser]);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('username', name);
//       formData.append('email', email);
//       formData.append('bio', bio);
//       if (image) formData.append('image', image);

//       const res = await fetch(`http://localhost:5000/users/${storedUser._id}`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (res.ok) alert('✅ Profile updated successfully!');
//       else alert('❌ Failed to update profile.');
//     } catch (err) {
//       console.error(err);
//       alert('❌ Something went wrong.');
//     }
//   };

//   return (
//     <div className="profile-page">
//       <h2>My Profile</h2>

//       <div className="profile-picture">
//         {preview ? <img src={preview} alt="Profile Preview" /> : <div className="placeholder">No Image</div>}
//         <input type="file" accept="image/*" onChange={handleImageUpload} />
//       </div>

//       <div className="profile-details">
//         <label>Name</label>
//         <input value={name} onChange={(e) => setName(e.target.value)} />

//         <label>Email</label>
//         <input value={email} onChange={(e) => setEmail(e.target.value)} />

//         <label>Bio</label>
//         <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

//         <button onClick={handleSave}>Save Changes</button>
//       </div>

//       <div className="profile-additional">
//         <h3>Additional Features</h3>
//         <ul>
//           <li>View Donation History</li>
//           <li>Manage Campaign Subscriptions</li>
//           <li>Set Donation Preferences</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Profile;












import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    bio: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const userData = JSON.parse(localStorage.getItem("user")); // current logged-in user
  const userId = userData?._id;

  useEffect(() => {
    // Fetch user data from backend
    if (userId) {
      axios
        .get(`http://localhost:5000/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err));
    }
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("bio", user.bio);
      if (imageFile) formData.append("image", imageFile);

      const res = await axios.put(
        `http://localhost:5000/users/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data)); // update localStorage
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="profile-picture">
        {preview ? (
          <img src={preview} alt="Profile Preview" />
        ) : user.imageUrl ? (
          <img src={`http://localhost:5000${user.imageUrl}`} alt="Profile" />
        ) : (
          <div className="placeholder">No Image</div>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="profile-details">
        <label>Username</label>
        <input
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <label>Email</label>
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label>Bio</label>
        <textarea
          value={user.bio}
          onChange={(e) => setUser({ ...user, bio: e.target.value })}
        />

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Profile;
