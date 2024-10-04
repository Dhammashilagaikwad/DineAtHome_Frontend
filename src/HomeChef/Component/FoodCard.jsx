import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../Styles/FoodCard.css'; 

function FoodCard({ id, initialFoodData }) { // Accept initialFoodData for editing
  const [foodName, setFoodName] = useState(initialFoodData?.foodName || '');
  const [foodDescription, setFoodDescription] = useState(initialFoodData?.foodDescription || '');
  const [amount, setAmount] = useState(initialFoodData?.amount || '0');
  const [isEditable, setIsEditable] = useState(false);
  const [image, setImage] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setImage(reader.result);
      // };
      // reader.readAsDataURL(file);
      setImage(file);  // Save the file itself
    }
  };

  // Handle editing
  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  // Handle delete card
  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:4000/deleteItem/${id}`, { // Ensure correct endpoint
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Food item deleted successfully!');
        setIsDeleted(true);
      } catch (error) {
        console.error('Error deleting food item:', error.response ? error.response.data : error.message);
        alert('Failed to delete food item.');
      }
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    const decodedToken = jwtDecode(token);
    const chefId = decodedToken.id;

    if (!chefId) {
      alert('Chef ID not found in the token');
      return;
    }

    if (!foodName || !foodDescription || amount < 0) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

      // Create a FormData object for the image and other fields
      const formData = new FormData();
      formData.append('foodName', foodName);
      formData.append('foodDescription', foodDescription);
      formData.append('amount', parseFloat(amount));
      if (image) {
        formData.append('foodPhoto', image);  // Append the image file
      }

    try {
      let response;
      if (initialFoodData) {
        // Update existing item
        response = await axios.put(`http://localhost:4000/edit-item/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Food item updated successfully!');
      } else {
        // Add new item
        response = await axios.post(`http://localhost:4000/additem/${chefId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Food item added successfully!');
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error adding/updating food item:', error.response ? error.response.data : error.message);
      alert('Failed to add/update food item.');
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="paddingForFoodCard">
      <div className="foodcardForFoodCard">
        <div className="image-containerForFoodCard">
          <label htmlFor={`photo-upload-${id}`}>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Food" className="food-imageForFoodCard" />
            ) : (
              <div className="photo-placeholderForFoodCard">Food Photo</div>
            )}
          </label>
          <input
            id={`photo-upload-${id}`}
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="contentForFoodCard">
          <input
            type="text"
            value={foodName}
            placeholder="Enter Food Name"
            onChange={(e) => setFoodName(e.target.value)}
            disabled={!isEditable}
          />
          <textarea
            value={foodDescription}
            placeholder="Enter Food Description"
            onChange={(e) => setFoodDescription(e.target.value)}
            disabled={!isEditable}
          />
          <div className="price-inputForFoodCard">
            <span>₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!isEditable}
              min="0"
            />
          </div>
        </div>

        <div className="actionsForFoodCard">
          <button className='cardEditDoneForFoodCard' onClick={handleEditClick}>
            {isEditable ? 'Done' : 'Edit'}
          </button>
          <button className='cardDeleteForFoodCard cardEditDoneForFoodCard' onClick={handleDeleteClick}>
            Delete
          </button>
          <button className='cardAdd' onClick={handleSubmit} disabled={!isEditable}>
            {initialFoodData ? 'Update Food Item' : 'Add Food Item'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
