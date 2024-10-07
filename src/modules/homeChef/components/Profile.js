

import React, { useState } from "react";
import "../styles/Profile.css";
import MainProfileEdit from "./MainProfileEdit.js";
import Navbar from "./Navbar.js";

const Profile = () => {
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [displayAddress, setDisplayAddress] = useState(""); // New state to hold the displayed address

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const toggleEditAddress = () => {
    setIsEditing(!isEditing);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDone = () => {
    setDisplayAddress(address); // Set the displayed address to the current input
    toggleEditAddress(); // Exit editing mode
  };

  return (
    <>
      <div>
        <Navbar />
        <MainProfileEdit />
      </div>

      <div className="profile-container">
        <div className="upload-photoOfChef">
          <label htmlFor="upload-photoOfChef">Upload Photo:</label>
          <input
            type="file"
            id="upload-photoOfChef"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
          {photo && <img src={photo} alt="Profile" className="profile-photoOfChef" />}
        </div>

        <div className="edit-address">
          <button onClick={toggleEditAddress}>
            {isEditing ? "Cancel Edit" : "Edit Address"}
          </button>

          {isEditing ? (
            <div>
              <textarea
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter your address"
                rows="4"
                cols="50"
                className="address-input"
              />
              <button onClick={handleDone} className="done-button">
                Done
              </button>
            </div>
          ) : (
            // Show the address if not editing
            <div className="address-display">
              {displayAddress ? (
                <p>Your address: {displayAddress}</p>
              ) : (
                <p>No address provided.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
