
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

// Mock component for the Edit functionality
const EditIcon = ({ onClick, isEditing }) => (
    <button type="button" className="edit-icon" onClick={onClick}>
        {isEditing ? 'Done' : 'Edit'}
    </button>
);

const Profile = () => {
  const [user, setUser] = useState({
    username: "James", 
    bio: "I am a dedicated donor.", 
    email: "james_mcdowel@puposelyllc.com",
    phone: "+31 6 12 34 56 78",
    address_street: "123 Main St",
    address_cityzip: "San Francisco, 94107",
    imageUrl: "/uploads/avatar.jpg",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // State to manage which field is currently being edited
  const [isEditing, setIsEditing] = useState({
    username: false,
    bio: false,
    email: false,
    phone: false,
    address_street: false,
    address_cityzip: false,
  });

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?._id || "mock-user-id";

  useEffect(() => {
    // Fetch user data from backend
    if (userId && userId !== "mock-user-id") { 
      axios
        .get(`http://localhost:5000/users/${userId}`)
        .then((res) => {
            const fetchedUser = res.data;
            setUser({
                username: fetchedUser.username || user.username,
                bio: fetchedUser.bio || user.bio, 
                email: fetchedUser.email || user.email,
                phone: fetchedUser.phone || user.phone,
                address_street: fetchedUser.address_street || user.address_street,
                address_cityzip: fetchedUser.address_cityzip || user.address_cityzip,
                imageUrl: fetchedUser.imageUrl || user.imageUrl,
            });
        })
        .catch((err) => console.error(err));
    }
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      // Reset imageUrl when a new file is chosen, as the file will be sent
      setUser(prevUser => ({ ...prevUser, imageUrl: null })); 
    }
  };
  
  // ✅ FUNCTION TO HANDLE IMAGE REMOVAL
  const handleRemoveImage = () => {
      setImageFile(null); // Clear new file upload queue
      setPreview(null); // Clear local preview
      
      // Set the imageUrl to an empty string to signal removal to the backend
      setUser(prevUser => ({ 
          ...prevUser, 
          imageUrl: "" 
      }));
  };

  const handleSaveAllChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("bio", user.bio); 
      formData.append("phone", user.phone); 
      formData.append("address_street", user.address_street); 
      formData.append("address_cityzip", user.address_cityzip); 
      
      // ✅ Crucial for removal: Send the current imageUrl status
      formData.append("imageUrl", user.imageUrl || ""); 

      // If a NEW image file is selected, it should be appended last to be handled by multer
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const targetId = userData?._id || "mock-user-id-to-prevent-crash"; 
      
      const res = await axios.put(
        `http://localhost:5000/users/${targetId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setIsEditing(Object.fromEntries(Object.keys(isEditing).map(key => [key, false]))); 
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong! (Check server is running on :5000)");
    }
  };

  const renderField = (fieldKey, labelText, hintText) => {
    const isEditMode = isEditing[fieldKey];
    const value = user[fieldKey];

    const toggleEdit = () => {
        setIsEditing(prev => ({ ...prev, [fieldKey]: !isEditMode }));
    };

    const handleChange = (e) => {
        setUser({ ...user, [fieldKey]: e.target.value });
    };

    return (
        <div className="profile-field-group">
            <div className="field-label-row">
                <label htmlFor={fieldKey}>{labelText}</label>
                <span className="field-hint">{hintText}</span>
            </div>
            <div className="field-input-row">
                <input
                    id={fieldKey}
                    value={value}
                    onChange={handleChange}
                    readOnly={!isEditMode} 
                    className={!isEditMode ? 'read-only' : ''}
                    style={{ borderColor: isEditMode ? '#007bff' : '' }} 
                />
                {isEditing.hasOwnProperty(fieldKey) && 
                  <EditIcon onClick={toggleEdit} isEditing={isEditMode} />}
            </div>
        </div>
    );
  };

  return (
    <div className="profile-page">
      <h1 className="page-title">Account</h1>

      {/* --- ENLARGED PROFILE HEADER --- */}
      <div className="profile-header">
        <div className="profile-picture large-avatar">
            {/* Display logic: Preview > user.imageUrl > Placeholder */}
            {preview ? (
                <img src={preview} alt="Profile Preview" />
            ) : user.imageUrl ? (
                <img src={`http://localhost:5000${user.imageUrl}`} alt="Profile" />
            ) : (
                <div className="placeholder">A</div>
            )}
        </div>
        
        <div className="profile-info-display">
            <h2 className="highlighted-name">{user.username}</h2>
            <p className="highlighted-bio">{user.bio}</p>
            <div className="button-group">
                <label className="upload-button">
                    Upload new photo
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
                {/* ✅ Button now calls the removal function */}
                <button className="remove-button" onClick={handleRemoveImage}>
                    Remove photo
                </button>
            </div>
        </div>
      </div>
      {/* ----------------------------- */}


      <h2 className="section-title">User Details</h2>
      <div className="profile-details-grid">
        
        {renderField('username', 'Display name', 'Visible to other members')}
        {renderField('bio', 'Bio / Description', 'Tell us a bit about yourself')} 
        
        {renderField('email', 'Email address', 'For notifications and logging in')}
        {renderField('phone', 'Phone number', 'For receiving notifications')}

        {/* --- Address Section --- */}
        <h2 className="section-title" style={{ gridColumn: '1 / 3' }}> Address</h2>
        {renderField('address_street', 'Street Address', 'Required for shipping')}
        {renderField('address_cityzip', 'City and Zip Code', 'Required for shipping')}
      </div>

      {/* --- Save Changes Button (Spans Full Width) --- */}
      <div className="save-button-container">
        <button onClick={handleSaveAllChanges} className="save-changes-button">
          Save changes
        </button>
      </div>
      
    </div>
  );
};

export default Profile;