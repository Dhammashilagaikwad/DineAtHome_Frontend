import React, { useState } from 'react';
import '../styles/CartC.css'; // Import the external CSS file
import localImage from "../assets/1st.jpg";

const CartC = (props) => {
  // State to manage the display of the cart item
  const [isDeleted, setIsDeleted] = useState(false);
  
  // State to manage the quantity of the cart item
  const [quantity, setQuantity] = useState(1);

  // Function to handle delete button click
  const handleDelete = () => {
    setIsDeleted(true);
  };

  // Function to increase quantity
  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Function to decrease quantity
  const handleDecrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="AppCart">
      {!isDeleted && (
        <div className="cart-item">
          <div className="cart-details">
          <img src={props.imageSrc} alt={props.foodName} className="cart-image" />
            <div className="cart-text">
              <h3>{props.foodName}</h3>
              <p>{props.foodName2}</p>
              <p>{props.rate}</p>
              <p>{props.qty} {quantity}</p>
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
