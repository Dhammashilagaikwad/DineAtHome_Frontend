// import React from 'react';
// import '../Styles/NotificationR.css';

// function NotificationR(props) {
//   return (
//     <div className="request-card">
//       <div className="request-info">
//         <div className="request-name">{props.foodName}</div>
//         <div className="request-qty">{props.quantity}</div>
//         <div className="request-price">{props.priceRange}</div>
//       </div>
//       <div className="request-actions">
//         <span className="request-date">{props.date}</span>
//         <button className="btn decline">{props.decline}</button>
//         <button className="btn accept">{props.accept}</button>
//       </div>
//     </div>
//   );
// }

// export default NotificationR;



import React from 'react';
import '../Styles/NotificationR.css';

function NotificationR(props) {
  return (
    <div className="request-card">
      <div className="request-type">{props.type}</div>
      <div className="request-content">
        <div className="request-header">
          <h4 className="request-title">{props.foodName}</h4>
          <span className="request-date">{props.date}</span>
        </div>
        <div className="request-details">
          <div className="request-qty">{props.quantity}</div>
          <div className="request-price">{props.priceRange}</div>
        </div>
      </div>
      <div className="request-actions">
        <button className="btn decline">{props.decline}</button>
        <button className="btn accept">{props.accept}</button>
      </div>
    </div>
  );
}

export default NotificationR;
