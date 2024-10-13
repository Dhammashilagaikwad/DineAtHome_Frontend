import React, { useState } from 'react';
import '../styles/CartC.css'; // Import the external CSS file
import axiosInstance from '../../utils/axiosService';

const CartC = ({ foodName, foodName2, rate, imageSrc, quantity, itemId, onDelete }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(quantity || 1);

  // Function to handle delete button click
  const handleDelete = async () => {
    try {
      console.log("Deleting item with ID:", itemId); // Log the item ID

      // Delete from menu cart first
      const menuCartResponse = await axiosInstance.delete('/api/menuCart/removeFromMenuCart', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { itemId }, // Send the itemId in the request body
      });

      if (menuCartResponse.status === 200) {
        alert("Menu item deleted successfully.");
        console.log("Menu item deleted successfully.");

        // Now delete from the shop cart using the same itemId
        const shopCartResponse = await axiosInstance.delete(`/api/cart/removeItem/${itemId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (shopCartResponse.status === 200) {
          alert("Shop item deleted successfully.");
          console.log("Shop item deleted successfully.");
          setIsDeleted(true);
          onDelete(itemId); // Call the onDelete function passed from the parent component to update the UI
        } else {
          console.error("Failed to delete shop item:", shopCartResponse.status);
        }
      } else {
        console.error("Failed to delete menu item:", menuCartResponse.status);
      }
    } catch (error) {
      console.error("Error removing item:", error.response ? error.response.data : error);
    }
  };

  const handleIncrease = () => setItemQuantity(prevQuantity => prevQuantity + 1);

  const handleDecrease = () => setItemQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  return (
    <div className="AppCart">
      {!isDeleted && (
        <div className="cart-item">
          <div className="cart-details">
            <img src={imageSrc} alt={foodName} className="cart-image" />
            <div className="cart-text">
              <h3>{foodName}</h3>
              <p>{foodName2}</p>
              <p>Rate: {rate}</p>
              <p>Quantity: {itemQuantity}</p>
            </div>
          </div>
          <div className="cart-buttons">
            <button className="decrease-button" onClick={handleDecrease}>-</button>
            <button className="increase-button" onClick={handleIncrease}>+</button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartC;
