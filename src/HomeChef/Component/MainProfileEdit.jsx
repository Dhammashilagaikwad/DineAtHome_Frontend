import React, { useState, useEffect } from "react";
import "../Styles/MainProfileEdit.css"; // Import the CSS file
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProfileForm = () => {
  const [chefId, setChefId] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [workTiming, setWorkTiming] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [activeButton, setActiveButton] = useState("Veg");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [newSpeciality, setNewSpeciality] = useState("");

  // Fetch chefId from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        if (decodedToken.id) {
          setChefId(decodedToken.id);
        } else {
          console.error("id not found in token:", decodedToken);
          alert("Chef ID is missing in the token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        alert("Invalid token");
      }
    } else {
      console.error("No token found in localStorage");
    }
  }, []);

  // Fetch profile data when chefId is set
  useEffect(() => {
    if (!chefId) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/chefs/${chefId}`);
        const chefData = response.data;
        console.log("Fetched chef data:", chefData);
        setProfileName(chefData.profilename || "");
        setCuisine(chefData.cuisine || "");
        setCategory(chefData.category || "");
        setWorkTiming(chefData.workTiming || "");
        setSpecialities(Array.isArray(chefData.specialities) ? chefData.specialities : []);
        setActiveButton(chefData.activeButton || "Veg");
        if (chefData.coverImage) {
          setProfilePhoto(`http://localhost:4000/coverImage-uploads/${chefData.coverImage}`);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [chefId]);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleProfilePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(e.target.files[0]));
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  const handleSpecialityAdd = async () => {
    if (newSpeciality && !specialities.includes(newSpeciality)) {
      const updatedSpecialities = [...specialities, newSpeciality];
  
      try {
        await axios.put(`http://localhost:4000/api/chefs/${chefId}/specialities`, { specialities: updatedSpecialities });
        setSpecialities(updatedSpecialities);
        setNewSpeciality("");
      } catch (error) {
        console.error("Error adding speciality:", error);
        alert("Failed to add speciality.");
      }
    } else if (specialities.includes(newSpeciality)) {
      alert("Speciality already added!");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chefId) {
      alert("Chef ID is missing");
      return;
    }

    const formData = new FormData();
    if (profileName) formData.append("name", profileName);
    if (cuisine) formData.append("cuisine", cuisine);
    if (category) formData.append("category", category);
    if (workTiming) formData.append("workTiming", workTiming);
    formData.append("specialities", JSON.stringify(specialities));  // Corrected array handling
    formData.append("activeButton", activeButton);

    if (photoFile) {
      formData.append("coverImage", photoFile);
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/chefs/${chefId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from server:", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        alert("Error updating profile: " + (error.response.data.message || "An error occurred"));
      } else {
        alert("Error updating profile: " + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flexForprofile-form">
      <div className="profile-form">
        <div className="profile-photo">
          {profilePhoto ? (
            <img src={profilePhoto} alt="Profile" className="photo" />
          ) : (
            <div className="photo-placeholderOfMainProfileEdit">Upload Cover Photo</div>
          )}
          {isEditable && (
            <input
              type="file"
              accept="image/*"
              className="upload-input"
              onChange={handleProfilePhotoChange}
            />
          )}
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={() => handleButtonClick("Veg")}
            className={activeButton === "Veg" ? "active" : ""}
            disabled={!isEditable}
          >
            Veg
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick("Non-Veg")}
            className={activeButton === "Non-Veg" ? "active" : ""}
            disabled={!isEditable}
          >
            Non-Veg
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick("Both")}
            className={activeButton === "Both" ? "active" : ""}
            disabled={!isEditable}
          >
            Both
          </button>
        </div>

        <input
          type="text"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          placeholder="Enter Profile Name"
          disabled={!isEditable}
          className="input-field"
        />
        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Cuisine e.g.(MAHARASHTRIAN)"
          disabled={!isEditable}
          className="input-field"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          disabled={!isEditable}
          className="input-field"
        />
        <input
          type="text"
          value={workTiming}
          onChange={(e) => setWorkTiming(e.target.value)}
          placeholder="Work Timing"
          disabled={!isEditable}
          className="input-field"
        />

        <input
          type="text"
          value={newSpeciality}
          onChange={(e) => setNewSpeciality(e.target.value)}
          placeholder="Add Speciality"
          disabled={!isEditable}
          className="input-field"
        />
        <button type="button" onClick={handleSpecialityAdd} disabled={!isEditable}>
          Add Speciality
        </button>

        <div>
          <h4>Specialities:</h4>
          <ul>
            {specialities.map((speciality, index) => (
              <li key={index}>{speciality}</li>
            ))}
          </ul>
        </div>



        <div className="leftbtnn">
          <button type="button" onClick={handleEditClick} className="edit-button">
            {isEditable ? "Done" : "Edit"}
          </button>
          {isEditable && <button type="submit" className="submit-button">Save</button>}
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;

