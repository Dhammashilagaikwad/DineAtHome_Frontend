
import React, { useState } from 'react';
import '../styles/FoodCardForShop.css'; 
import axiosInstance from '../../../utils/axiosService';
import {jwtDecode } from 'jwt-decode';

function FoodCardForShop({ id }) {
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [quantity, setQuantity] = useState('0'); // Changed to quantity
  const [unit, setUnit] = useState('kilogram'); // New state for unit
  const [price, setPrice] = useState('0');

  const [isEditable, setIsEditable] = useState(false);
  const [image, setImage] = useState(null);
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
    setIsDeleted(true);
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
    if (!foodName || !foodDescription || quantity < 0 || price < 0) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

    const foodData = {
      itemname: foodName,
      description: foodDescription,
      price: parseFloat(price), // Ensure price is a number
      image,
      quantity: parseInt(quantity, 10), // Ensure quantity is an integer
      unit,
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
            {image ? (
              <img src={image} alt="Food" className="food-imageForShop" />
            ) : (
              <div className="photo-placeholderForShop">Food Photo</div>
            )}
          </label>
          <input className='inputForShop'
            id={`photo-upload-${id}`}
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="contentForShop">
          <input className='inputForShop'
            type="text"
            value={foodName}
            placeholder="Enter Food Name"
            onChange={(e) => setFoodName(e.target.value)}
            disabled={!isEditable}
          />
          <textarea className='textareaForShop'
            value={foodDescription}
            placeholder="Enter Food Description"
            onChange={(e) => setFoodDescription(e.target.value)}
            disabled={!isEditable}
          />

          <div className="quantity-inputForShop">
          {/* <span>que</span> */}
            <input className='inputForShop'
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={!isEditable}
            />
            <select 
              className='unit-dropdownForShop' 
              value={unit} 
              onChange={(e) => setUnit(e.target.value)} 
              disabled={!isEditable}
            >
              <option value="kilogram">Kilogram (KG)</option>
              <option value="gram">Gram (G)</option>
              <option value="liter">Liter (L)</option>
              <option value="liter">Milli Lite (ML)</option>
            </select>
          </div>
        </div>


        <div className="price-inputForShop">
            <span>₹</span>
            <input className='inputForShop'
                type="number"
                value={price}
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
