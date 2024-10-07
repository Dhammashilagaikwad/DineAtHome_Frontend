import React from 'react';
import '../Styles/NotificationP.css';

function NotificationP(props) {
  return (
    <div className="PreOrder-card">
      <div className="PreOrder-type">{props.type}</div>
      <div className="PreOrder-content">
        <div className="PreOrder-header">
          <h4 className="PreOrder-title">{props.foodName}</h4>
          <span className="PreOrder-date">{props.date}</span>
        </div>
        <div className="PreOrder-details">
          <div className="PreOrder-qty">{props.quantity}</div>
          <div className="PreOrder-price">₹{props.price}</div>
        </div>
      </div>
    </div>
  );
}

export default NotificationP;
