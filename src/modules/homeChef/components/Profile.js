import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import MainProfileEdit from "./MainProfileEdit.js";
import Navbar from "./Navbar.js";
import axiosInstance from "../../../utils/axiosService"; // Import your axios instance
import { jwtDecode } from "jwt-decode"; // Make sure to install this package if you haven't

const Profile = () => {
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [displayAddress, setDisplayAddress] = useState("");
  const [chefId, setChefId] = useState(""); // Start with an empty string
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Extract chefId from token
    const token = localStorage.getItem("token"); // or however you're storing the token
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the token to get the chef ID
      setChefId(decodedToken.id); // Assuming the ID is stored under the "id" field
    }
  }, []);

  // Fetch chef profile data on component mount
  useEffect(() => {
    const fetchChefProfile = async () => {
      if (!chefId) return; // Don't fetch if chefId is not set

      setLoading(true); // Set loading to true
      setError(null); // Reset error state

      try {
        const response = await axiosInstance.get(`api/chefs/${chefId}`);
        setDisplayAddress(response.data.address); // Make sure this matches your API response
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
    const payload = { address1: address };
    console.log(`Updating address for chef ID ${chefId} with payload:`, payload); // Log for debugging
  
    try {
      const response = await axiosInstance.put(`/api/chefs/${chefId}`, payload); // Ensure URL and payload are correct
      setDisplayAddress(address); // Update displayed address
      setAddress(""); // Clear the address input after successful update
      toggleEditAddress(); // Exit editing mode
    } catch (error) {
      console.error("Error updating address:", error.response ? error.response.data : error.message); // Log error details
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
