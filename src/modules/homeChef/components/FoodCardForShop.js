import React, { useState, useEffect } from 'react';
import '../styles/FoodCardForShop.css'; 
import axiosInstance from '../../../utils/axiosService';
import { jwtDecode } from 'jwt-decode';

function FoodCardForShop({ id, itemname, description, price, image, quantity, unit }) {
  const [foodName, setFoodName] = useState(itemname || ''); // Initialize with prop
  const [foodDescription, setFoodDescription] = useState(description || ''); // Initialize with prop
  const [quantityState, setQuantity] = useState(quantity || '0'); // Initialize with prop
  const [unitState, setUnit] = useState(unit || 'kilogram'); // Initialize with prop
  const [priceState, setPrice] = useState(price || '0'); // Initialize with prop

  const [isEditable, setIsEditable] = useState(false);
  const [imageState, setImage] = useState(image || null); // Initialize with prop
  const [isDeleted, setIsDeleted] = useState(false);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle editing
  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  // Handle delete card
  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setIsDeleted(true);
    }
  };

  if (isDeleted) {
    return null; // If deleted, return nothing
  }

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

    // Validate required fields
    if (!foodName || !foodDescription || quantityState < 0 || priceState < 0) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

    const foodData = {
      itemname: foodName,
      description: foodDescription,
      price: parseFloat(priceState), // Ensure price is a number
      image: imageState,
      quantity: parseInt(quantityState, 10), // Ensure quantity is an integer
      unit: unitState,
    };

    console.log('Sending foodData:', foodData); // Debugging output

    try {
      const response = await axiosInstance.post(`/api/shop/additem/${chefId}`, foodData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Food item added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding food item:', error.response ? error.response.data : error.message);
      alert('Failed to add food item. ' + (error.response ? error.response.data : ''));
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
          />
        </div>

        <div className="actionsForShop">
          <button className='cardEditDoneForShop' onClick={handleEditClick}>
            {isEditable ? 'Done' : 'Edit'}
          </button>
          <button className='cardDeleteForShop cardEditDoneForShop' onClick={handleDeleteClick}>
            Delete
          </button>
          <button className='cardAddForShop' onClick={handleSubmit} disabled={!isEditable}>
            Add Food Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCardForShop;
