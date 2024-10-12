import React, { useState } from 'react';
import '../styles/CartC.css'; // Import the external CSS file

const CartC = ({ foodName, foodName2, rate, imageSrc, quantity }) => {
  // State to manage the display of the cart item
  const [isDeleted, setIsDeleted] = useState(false);
  
  // State to manage the quantity of the cart item
  const [itemQuantity, setItemQuantity] = useState(quantity || 1);

  // Function to handle delete button click
  const handleDelete = () => {
    setIsDeleted(true);
  };

  // Function to increase quantity
  const handleIncrease = () => {
    setItemQuantity(prevQuantity => prevQuantity + 1);
  };

  // Function to decrease quantity
  const handleDecrease = () => {
    setItemQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

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
            <button className="decrease-button" onClick={handleDecrease}>
              -
            </button>
            <button className="increase-button" onClick={handleIncrease}>
              +
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartC;
