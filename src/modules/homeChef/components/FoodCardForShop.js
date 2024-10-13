import React, { useState, useEffect } from 'react';
import '../styles/FoodCardForShop.css';
import axiosInstance from '../../../utils/axiosService';
import { jwtDecode } from 'jwt-decode';

function FoodCardForShop({ id, itemname, description, price, image, quantity, unit }) {
  const [foodName, setFoodName] = useState(itemname || '');
  const [foodDescription, setFoodDescription] = useState(description || '');
  const [quantityState, setQuantity] = useState(quantity || '0');
  const [unitState, setUnit] = useState(unit || 'kilogram');
  const [priceState, setPrice] = useState(price || '0');
  const [isEditable, setIsEditable] = useState(!id);
  const [imageState, setImage] = useState(image ? `http://localhost:4000${image}` : null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsEditable(!id); // Enable edit mode if no id is present
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result); // Preview the image locally
      reader.readAsDataURL(file); // Make sure the image loads
    } else {
      setImage(null);
      setUploadedFile(null);
    }
  };

  const handleEditClick = () => setIsEditable(!isEditable); // Toggle edit mode

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const token = localStorage.getItem('token');

      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      try {
        const response = await axiosInstance.delete(`/api/shop/items/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Food item deleted successfully!');
        setIsDeleted(true);
      } catch (error) {
        console.error('Error deleting food item:', error.response ? error.response.data : error.message);
        alert('Failed to delete food item. ' + (error.response ? error.response.data : ''));
      }
    }
  };

  if (isDeleted) return null; // Return null if the item has been deleted

  const validateInputs = () => {
    if (!foodName || !foodDescription || quantityState <= 0 || priceState <= 0) {
      alert('Please fill in all required fields with valid values.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return; // Validate inputs before proceeding

    const token = localStorage.getItem('token');
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    const decodedToken = jwtDecode(token);
    const chefId = decodedToken.id;

    const formData = new FormData();
    formData.append('itemname', foodName);
    formData.append('description', foodDescription);
    formData.append('price', parseFloat(priceState));
    formData.append('quantity', parseInt(quantityState, 10));
    formData.append('unit', unitState || 'kilogram');

    if (uploadedFile) {
      formData.append('image', uploadedFile);
    }

    try {
      let response;
      if (id) {
        // Update existing item if id is present
        response = await axiosInstance.put(`/api/shop/updateitem/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Food item updated successfully!');
      } else {
        // Create new item if id is not present
        response = await axiosInstance.post(`/api/shop/additem/${chefId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Food item added successfully!');
      }
      console.log('Response from server:', response.data);  // Log response for debugging

      // Disable editing after submitting
      setIsEditable(false);

    } catch (error) {
      console.error('Error processing food item:', error.response ? error.response.data : error.message);
      alert('Failed to process food item. ' + (error.response ? error.response.data : ''));
    }
  };

  return (
    <div className="paddingForFoodCardForShop">
      <div className="cardForShop">
        <div className="image-containerForShop">
          <label htmlFor={`photo-upload-${id}`}>
            {imageState ? (
              <img src={imageState} alt="Food" className="food-imageForShop" />
            ) : (
              <div className="photo-placeholderForShop">Food Photo</div>
            )}
          </label>
          <input
            className='inputForShop'
            id={`photo-upload-${id}`}
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="contentForShop">
          <input
            className='inputForShop'
            type="text"
            value={foodName}
            placeholder="Enter Food Name"
            onChange={(e) => setFoodName(e.target.value)}
            disabled={!isEditable}
          />
          <textarea
            className='textareaForShop'
            value={foodDescription}
            placeholder="Enter Food Description"
            onChange={(e) => setFoodDescription(e.target.value)}
            disabled={!isEditable}
          />

          <div className="quantity-inputForShop">
            <input
              className='inputForShop'
              type="number"
              value={quantityState}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={!isEditable}
              min="0"
            />
            <select 
              className='unit-dropdownForShop' 
              value={unitState} 
              onChange={(e) => setUnit(e.target.value)} 
              disabled={!isEditable}
            >
              <option value="kilogram">Kilogram (KG)</option>
              <option value="gram">Gram (G)</option>
              <option value="liter">Liter (L)</option>
              <option value="milliliter">Milli Liter (ML)</option>
            </select>
          </div>
        </div>

        <div className="price-inputForShop">
          <span>₹</span>
          <input
            className='inputForShop'
            type="number"
            value={priceState}
            onChange={(e) => setPrice(e.target.value)}
            disabled={!isEditable}
            min="0"
          />
        </div>

        <div className="actionsForShop">
          <button className='cardEditDoneForShop' onClick={handleEditClick}>
            {isEditable ? 'Done' : 'Edit'}
          </button>
          <button className='cardDeleteForShop cardEditDoneForShop' onClick={handleDeleteClick}>
            Delete
          </button>
          <button className='cardAddForShop' onClick={handleSubmit} disabled={!isEditable && !id}>
            {id ? 'Update Food Item' : 'Add Food Item'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCardForShop;
