import React, { useState } from 'react';
import axiosInstance from '../../../utils/axiosService';
import { jwtDecode } from 'jwt-decode';
import '../styles/FoodCard.css';

function FoodCard({ id, initialFoodData }) {
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
      setImage(file);
      alert(`Image selected: ${file.name}`);
      console.log(`Image selected: ${file.name}`);
    }
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditable((prevState) => !prevState);
  };

  // Handle deletion of food item
  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const token = localStorage.getItem('token');
        console.log('Deleting food item with ID:', id);
        await axiosInstance.delete(`/api/shop/deleteItem/${id}`, {
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

  // Handle submit of new or updated food item
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

    // Validate inputs
    if (!foodName.trim() || !foodDescription.trim() || amount < 0) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

    // Create a FormData object to send image and other fields
    const formData = new FormData();
    formData.append('foodName', foodName);
    formData.append('foodDescription', foodDescription);
    formData.append('amount', parseFloat(amount));
    if (image) {
      formData.append('foodPhoto', image);
    }

    console.log('Submitting food item:', {
      foodName,
      foodDescription,
      amount,
      image: image ? image.name : 'No image selected'
    });

    try {
      let response;
      if (id) {
        // Update an existing food item
        console.log('Updating food item with ID:', id);
        response = await axiosInstance.put(`/additem/edit-item/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Food item updated successfully!');
      } else {
        // Add a new food item
        console.log('Adding new food item for chef ID:', chefId);
        response = await axiosInstance.post(`/additem/${chefId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Food item added successfully!');
      }
      console.log('Response:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error adding/updating food item:', error.response.data);
        alert(`Failed to add/update food item: ${error.response.data.message || error.response.data}`);
      } else {
        console.error('Error adding/updating food item:', error.message);
        alert('Failed to add/update food item.');
      }
    }

    // After submission, disable edit mode
    setIsEditable(false);
  };

  // If the item is deleted, don't render the component
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
              initialFoodData?.image ? ( // Display image from initialFoodData if no new image is selected
                <img src={initialFoodData.image} alt="Food" className="food-imageForFoodCard" />
              ) : (
                <div className="photo-placeholderForFoodCard">Food Photo</div>
              )
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
          <button type="button" className="cardEditDoneForFoodCard" onClick={handleEditClick}>
            {isEditable ? 'Cancel' : 'Edit'}
          </button>
          <button type="button" className="cardDeleteForFoodCard cardEditDoneForFoodCard" onClick={handleDeleteClick}>
            Delete
          </button>
          {isEditable && (
            <button type="button" className="cardSaveForFoodCard" onClick={handleSubmit}>
              {initialFoodData ? 'Update Food Item' : 'Add Food Item'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
