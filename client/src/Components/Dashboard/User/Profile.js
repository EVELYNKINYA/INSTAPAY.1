import React, { useState } from 'react';

const Profile = ({ user, updateUser, isTest = false }) => {
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user ? { ...user } : {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleUpdate = () => {
    updateUser(updatedUser);
    setEditing(false);
  };

  if (!isTest && !user || !user.username) {
    return (
      <div>
        <h2>Profile</h2>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile">
      {editing ? (
        <div>
          <input
            type="text"
            name="username"
            value={updatedUser.username || ''}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            value={updatedUser.email || ''}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={updatedUser.password || ''}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Profile;