import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import MainProfileEdit from "./MainProfileEdit.js";
import Navbar from "./Navbar.js";
import axiosInstance from "../../../utils/axiosService"; // Import your axios instance

const Profile = () => {
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [displayAddress, setDisplayAddress] = useState("");
  const [chefId, setChefId] = useState("12345"); // Example chef ID; you should get this from your authentication context
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch chef profile data on component mount
  useEffect(() => {
    const fetchChefProfile = async () => {
      setLoading(true); // Set loading to true
      setError(null); // Reset error state

      try {
        const response = await axiosInstance.get(`api/chefs/${chefId}`);
        setDisplayAddress(response.data.address);
        // You can also set other profile details here, such as the photo
      } catch (error) {
        console.error("Error fetching chef profile:", error);
        setError("Failed to fetch chef profile."); // Update error state
      } finally {
        setLoading(false); // Set loading to false
      }
    };
    fetchChefProfile();
  }, [chefId]);

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

  const handleDone = async () => {
    try {
      await axiosInstance.put(`/api/chefs/${chefId}/address`, { address });
      setDisplayAddress(address); // Update displayed address
      setAddress(""); // Clear the address input after successful update
      toggleEditAddress(); // Exit editing mode
    } catch (error) {
      console.error("Error updating address:", error);
      setError("Failed to update address."); // Update error state
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <MainProfileEdit />
      </div>

      <div className="profile-container">
        {loading && <p>Loading profile...</p>}
        {error && <p className="error-message">{error}</p>} {/* Display error message */}

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
