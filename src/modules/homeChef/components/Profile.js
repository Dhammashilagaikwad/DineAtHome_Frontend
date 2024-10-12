// import React, { useState, useEffect } from "react";
// import "../styles/Profile.css";
// import MainProfileEdit from "./MainProfileEdit.js";
// import Navbar from "./Navbar.js";
// import axiosInstance from "../../../utils/axiosService"; // Import your axios instance
// import { jwtDecode } from "jwt-decode"; // Make sure to install this package if you haven't

// const Profile = () => {
//   const [address, setAddress] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [photo, setPhoto] = useState(null);
//   const [displayAddress, setDisplayAddress] = useState("");
//   const [chefId, setChefId] = useState(""); // Start with an empty string
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     // Extract chefId from token
//     const token = localStorage.getItem("token"); // or however you're storing the token
//     if (token) {
//       const decodedToken = jwtDecode(token); // Decode the token to get the chef ID
//       setChefId(decodedToken.id); // Assuming the ID is stored under the "id" field
//     }
//   }, []);

//   // Fetch chef profile data on component mount
//   useEffect(() => {
//     const fetchChefProfile = async () => {
//       if (!chefId) return; // Don't fetch if chefId is not set

//       setLoading(true); // Set loading to true
//       setError(null); // Reset error state

//       try {
//         const response = await axiosInstance.get(`api/chefs/${chefId}`);
//         setDisplayAddress(response.data.address); // Make sure this matches your API response
//       } catch (error) {
//         console.error("Error fetching chef profile:", error);
//         setError("Failed to fetch chef profile."); // Update error state
//       } finally {
//         setLoading(false); // Set loading to false
//       }
//     };
//     fetchChefProfile();
//   }, [chefId]);

//   const handlePhotoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setPhoto(URL.createObjectURL(file));
//     }
//   };

//   const toggleEditAddress = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleAddressChange = (event) => {
//     setAddress(event.target.value);
//   };

//   const handleDone = async () => {
//     const payload = { address1: address };
//     console.log(`Updating address for chef ID ${chefId} with payload:`, payload); // Log for debugging

//     try {
//       const response = await axiosInstance.put(`/api/chefs/${chefId}`, payload); // Ensure URL and payload are correct
//       setDisplayAddress(address); // Update displayed address
//       setAddress(""); // Clear the address input after successful update
//       toggleEditAddress(); // Exit editing mode
//     } catch (error) {
//       console.error("Error updating address:", error.response ? error.response.data : error.message); // Log error details
//       setError("Failed to update address."); // Update error state
//     }
//   };

//   return (
//     <>
//       <div>
//         <Navbar />
//         <MainProfileEdit />
//       </div>

//       <div className="profile-container">
//         {loading && <p>Loading profile...</p>}
//         {error && <p className="error-message">{error}</p>}

//         <div className="upload-photoOfChef">
//           <label htmlFor="upload-photoOfChef">Upload Photo:</label>
//           <input
//             type="file"
//             name="profilePhoto"
//             id="upload-photoOfChef"
//             accept="image/*"
//             onChange={handlePhotoUpload}
//           />
//           {photo && <img src={photo} alt="Profile" className="profile-photoOfChef" />}
//         </div>

//         <div className="edit-address">
//           <button onClick={toggleEditAddress}>
//             {isEditing ? "Cancel Edit" : "Edit Address"}
//           </button>

//           {isEditing ? (
//             <div>
//               <textarea
//                 value={address}
//                 onChange={handleAddressChange}
//                 placeholder="Enter your address"
//                 rows="4"
//                 cols="50"
//                 className="address-input"
//               />
//               <button onClick={handleDone} className="done-button">
//                 Done
//               </button>
//             </div>
//           ) : (
//             <div className="address-display">
//               {displayAddress ? (
//                 <p>Your address: {displayAddress}</p>
//               ) : (
//                 <p>No address provided.</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;






















// import React, { useState, useEffect } from "react";
// import '../styles/Profile.css'
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const Profile = () => {
//   const [chefId, setChefId] = useState(null);
//   const [isEditable, setIsEditable] = useState(false);
//   const [profileName, setProfileName] = useState("");
//   const [cuisine, setCuisine] = useState("");
//   const [category, setCategory] = useState("");
//   const [workTiming, setWorkTiming] = useState("");
//   const [specialities, setSpecialities] = useState([]);
//   const [activeButton, setActiveButton] = useState("Veg");
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [photoFile, setPhotoFile] = useState(null);
//   const [newSpeciality, setNewSpeciality] = useState("");
//   const [address, setAddress] = useState("");
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [displayAddress, setDisplayAddress] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch chefId from JWT token
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setChefId(decodedToken.id);
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         alert("Invalid token");
//       }
//     }
//   }, []);

//   // Fetch profile data when chefId is set
//   useEffect(() => {
//     if (!chefId) return;

//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/chefs/${chefId}`);
//         const chefData = response.data;
//         setProfileName(chefData.profilename || "");
//         setCuisine(chefData.cuisine || "");
//         setCategory(chefData.category || "");
//         setWorkTiming(chefData.workTiming || "");
//         setSpecialities(Array.isArray(chefData.specialities) ? chefData.specialities : []);
//         setActiveButton(chefData.activeButton || "Veg");
//         if (chefData.coverImage) {
//           setProfilePhoto(`http://localhost:4000/coverImage-uploads/${chefData.coverImage}`);
//         }
//         setDisplayAddress(chefData.address || ""); // Set the initial address
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     fetchProfile();
//   }, [chefId]);

//   const handleEditClick = () => {
//     setIsEditable(!isEditable);
//   };

//   const handleProfilePhotoChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setProfilePhoto(URL.createObjectURL(e.target.files[0]));
//       setPhotoFile(e.target.files[0]);
//     }
//   };

//   const handleButtonClick = (type) => {
//     setActiveButton(type);
//   };

//   const handleSpecialityAdd = async () => {
//     if (newSpeciality && !specialities.includes(newSpeciality)) {
//       const updatedSpecialities = [...specialities, newSpeciality];

//       try {
//         await axios.put(`http://localhost:4000/api/chefs/${chefId}`, { specialities: updatedSpecialities });
//         setSpecialities(updatedSpecialities);
//         setNewSpeciality("");
//       } catch (error) {
//         console.error("Error adding speciality:", error);
//         alert("Failed to add speciality.");
//       }
//     } else if (specialities.includes(newSpeciality)) {
//       alert("Speciality already added!");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!chefId) {
//       alert("Chef ID is missing");
//       return;
//     }

//     const formData = new FormData();
//     if (profileName) formData.append("name", profileName);
//     if (cuisine) formData.append("cuisine", cuisine);
//     if (category) formData.append("category", category);
//     if (workTiming) formData.append("workTiming", workTiming);
//     formData.append("specialities", JSON.stringify(specialities));
//     formData.append("activeButton", activeButton);

//     if (photoFile) {
//       formData.append("coverImage", photoFile);
//     }

//     try {
//       await axios.put(`http://localhost:4000/api/chefs/${chefId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Error updating profile: " + (error.response.data.message || "An error occurred"));
//     }
//   };

//   const handleAddressChange = (event) => {
//     setAddress(event.target.value);
//   };

//   const toggleEditAddress = () => {
//     setIsEditingAddress(!isEditingAddress);
//   };

//   const handleDone = async () => {
//     const payload = { address: address };
//     try {
//       await axios.put(`http://localhost:4000/api/chefs/${chefId}`, payload);
//       setDisplayAddress(address);
//       setAddress("");
//       toggleEditAddress();
//     } catch (error) {
//       console.error("Error updating address:", error);
//       alert("Failed to update address.");
//     }
//   };

//   return (

//     <>

//     <form onSubmit={handleSubmit} className="profile-form">
//       <div className="profile-photo">
//         {profilePhoto ? (
//           <img src={profilePhoto} alt="Profile" className="photo" />
//         ) : (
//           <div className="photo-placeholder">Upload Cover Photo</div>
//         )}
//         {isEditable && (
//           <input
//           type="file"
//           accept="image/*"
//           className="upload-input"
//           onChange={handleProfilePhotoChange}
//           />
//         )}
//       </div>

//       <div className="button-group">
//         <button type="button" onClick={() => handleButtonClick("Veg")} className={activeButton === "Veg" ? "active" : ""} disabled={!isEditable}>Veg</button>
//         <button type="button" onClick={() => handleButtonClick("Non-Veg")} className={activeButton === "Non-Veg" ? "active" : ""} disabled={!isEditable}>Non-Veg</button>
//         <button type="button" onClick={() => handleButtonClick("Both")} className={activeButton === "Both" ? "active" : ""} disabled={!isEditable}>Both</button>
//       </div>

//       <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="Enter Profile Name" disabled={!isEditable} className="input-field" />
//       <input type="text" value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="Cuisine e.g.(MAHARASHTRIAN)" disabled={!isEditable} className="input-field" />
//       <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" disabled={!isEditable} className="input-field" />
//       <input type="text" value={workTiming} onChange={(e) => setWorkTiming(e.target.value)} placeholder="Work Timing" disabled={!isEditable} className="input-field" />

//       <input type="text" value={newSpeciality} onChange={(e) => setNewSpeciality(e.target.value)} placeholder="Add Speciality" disabled={!isEditable} className="input-field" />
//       <button type="button" onClick={handleSpecialityAdd} disabled={!isEditable}>Add Speciality</button>

//       <div>
//         <h4>Specialities:</h4>
//         <ul>
//           {specialities.map((speciality, index) => (
//             <li key={index}>{speciality}</li>
//           ))}
//         </ul>
//       </div>

//       <div className="edit-address">
//         <button onClick={toggleEditAddress}>
//           {isEditingAddress ? "Cancel Edit" : "Edit Address"}
//         </button>

//         {isEditingAddress ? (
//           <div>
//             <textarea
//               value={address}
//               onChange={handleAddressChange}
//               placeholder="Enter your address"
//               rows="4"
//               cols="50"
//               className="address-input"
//               />
//             <button onClick={handleDone} className="done-button">Done</button>
//           </div>
//         ) : (
//           <div className="address-display">
//             {displayAddress ? <p>Your address: {displayAddress}</p> : <p>No address provided.</p>}
//           </div>
//         )}
//       </div>

//       <div className="leftbtnn">
//         <button type="button" onClick={handleEditClick} className="edit-button">{isEditable ? "Done" : "Edit"}</button>
//         {isEditable && <button type="submit" className="submit-button">Save</button>}
//       </div>
//     </form>
//         </>
//   );
// };

// export default Profile;




















import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from '../components/Navbar'

const ProfileForm = () => {
  const [chefId, setChefId] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [workTiming, setWorkTiming] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [activeButton, setActiveButton] = useState("Veg");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  const [newSpeciality, setNewSpeciality] = useState("");
  const [address1, setAddress1] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [displayAddress, setDisplayAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch chefId from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setChefId(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token:", error);
        alert("Invalid token");
      }
    }
  }, []);

  // Fetch profile data when chefId is set
  useEffect(() => {
    if (!chefId) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/chefs/${chefId}`
        );
        const chefData = response.data;
        console.log("API Response:", response.data);

        setProfileName(chefData.name || "");
        console.log("Set Profile Name:", chefData.name);
        setCuisine(chefData.cuisine.join(", ") || ""); 
        setCategory(chefData.category || ""); // If you want to handle category
        setWorkTiming(chefData.workTiming || ""); // If you want to handle work timing
        setSpecialities(
          Array.isArray(chefData.specialities) ? chefData.specialities : []
        );
        setActiveButton(chefData.activeButton || "Veg");
        // Log state values after setting them
    console.log("Profile Name:", chefData.profilename);
    console.log("Cuisine:", chefData.cuisine);
    console.log("Category:", chefData.category);
    console.log("Work Timing:", chefData.workTiming);
    console.log("Specialities:", chefData.specialities);

        setActiveButton(chefData.activeButton || "Veg");
        if (chefData.coverImage) {
          setCoverPhoto(
            `http://localhost:4000/coverImage-uploads/${chefData.coverImage}`
          );
        }
        if (chefData.profilePhoto) {
          setProfilePhoto(
           `http://localhost:4000/coverImage-uploads/${chefData.profilePhoto}`
          );
        }
        console.log(chefData);

        
        setDisplayAddress(chefData.address1 || "");  // Update to use address1
        console.log("Profile Photo:", chefData.profilePhoto);
        console.log("Profile Name:", chefData.name); // Log the name to confirm
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [chefId]);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleCoverPhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPhoto(URL.createObjectURL(e.target.files[0]));
      setCoverImageFile(e.target.files[0]);  // Store file separately for cover image
    }
  };

  const handleProfilePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(e.target.files[0]));
      setProfilePhotoFile(e.target.files[0]);  // Store file separately for profile image
    }
  };

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  const handleSpecialityAdd = async () => {
    if (newSpeciality && !specialities.includes(newSpeciality)) {
      const updatedSpecialities = [...specialities, newSpeciality];

      try {
        await axios.put(`http://localhost:4000/api/chefs/${chefId}`, {
          specialities: updatedSpecialities,
        });
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
    formData.append('name', profileName); // Use profileName instead of chefData.name
    formData.append('cuisine', cuisine); // Use cuisine instead of chefData.cuisine
    formData.append('category', category); // Use category instead of chefData.category
    formData.append('workTiming', workTiming); // Use workTiming instead of chefData.workTiming
    formData.append("specialities", JSON.stringify(specialities));
    formData.append("activeButton", activeButton);
    formData.append('address1', displayAddress); // Add this line

    // Append cover and profile photo files
    if (coverImageFile) { // Use coverImageFile instead of coverImage
        formData.append('coverImage', coverImageFile);
    }
    if (profilePhotoFile) { // Use profilePhotoFile instead of profilePhoto
        formData.append('profilePhoto', profilePhotoFile);
    }

    try {
        const response = await axios.put(`http://localhost:4000/api/chefs/${chefId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response.data); // Log the response data after the request
        alert("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error);
        alert(
            "Error updating profile: " +
            (error.response.data.message || "An error occurred")
        );
    }
};

  

  const handleAddressChange = (event) => {
    setAddress1(event.target.value);
  };

  const toggleEditAddress = () => {
    setIsEditingAddress(!isEditingAddress);
  };

  const handleDone = async () => {
    const payload = { address1: address1 };
    try {
      await axios.put(`http://localhost:4000/api/chefs/${chefId}`, payload);
      setDisplayAddress(address1);
      setAddress1("");
      toggleEditAddress();
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address.");
    }
  };


  return (


    <>

    <Navbar/>
    

    <form onSubmit={handleSubmit} className="profile-form">
      <div className="profile-photo">
      <strong>Profile Photo:</strong>
        {profilePhoto ? (
          <img src={profilePhoto} alt="Profile" className="photo" />
        ) : (
          <div className="photo-placeholder">Upload Profile Photo</div>
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

      <div className="profile-photo">
      <strong>Cover Photo:</strong>

        {coverPhoto ? (
          <img src={coverPhoto} alt="Cover" className="photo" />
        ) : (
          <div className="photo-placeholder">Upload Cover Photo</div>
        )}
        {isEditable && (
          <input
          type="file"
          accept="image/*"
          className="upload-input"
          onChange={handleCoverPhotoChange}
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
      <button
        type="button"
        onClick={handleSpecialityAdd}
        disabled={!isEditable}
        >
        Add Speciality
      </button>

      <div>
  <h4>Specialities:</h4>
  <ul>
    {specialities.length > 0 ? (
      specialities.map((speciality, index) => <li key={index}>{speciality}</li>)
    ) : (
      <li>No specialities added yet.</li>
    )}
  </ul>
</div>

      <div className="edit-address">
        <button onClick={toggleEditAddress} className="edit-addressBtn">
          {isEditingAddress ? "Cancel Edit" : "Edit Address"}
        </button>

        {isEditingAddress ? (
          <div>
            <input
              type="text"
              value={address1}
              onChange={handleAddressChange}
              placeholder="Enter your address"
              className="input-field"
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

      <div className="leftbtnn">
        <button type="button" onClick={handleEditClick} className="edit-button">
          {isEditable ? "Done" : "Edit"}
        </button>
        {isEditable && (
          <button type="submit" className="submit-button">
            Save
          </button>
        )}
      </div>
    </form>
        </>
  );
};

export default ProfileForm;
