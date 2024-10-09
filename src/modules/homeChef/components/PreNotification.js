// import React from 'react'
// import NotificationR from "./NotificationR.js";
// import NotificationP from "./NotificationP.js";
// import Navbar from './Navbar.js';
// import axiosInstance from '../../../utils/axiosService.js';

// export default function PreNotification() {
//   return (
//     <div>
// <Navbar/>
// <div>
//           <NotificationP
//             type="Pre-Order"
//             foodName="Pizza"
//             date="2024-10-07"
//             quantity="2"
//             // price="400"
//             decline="Decline"
//             accept="Accept"
//           />
//           {/* <NotificationR
//             type="Rquest"
//             foodName="Pizza"
//             date="2024-10-07"
//             quantity="2"
//             // priceRange="120- 220"
//             decline="Decline"
//             accept="Accept"
//           /> */}
//           <NotificationP
//             type="Pre-Order"
//             foodName="Pasta"
//             date="2024-10-06"
//             quantity="1"
//             // price="200"
//             decline="Decline"
//             accept="Accept"
//           />
//         </div>


      
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosService.js';
import Navbar from './Navbar';

export default function ChefPreOrders() {
  const [preOrders, setPreOrders] = useState([]);
  const [price, setPrice] = useState({}); // Store price for each pre-order

  useEffect(() => {
    // Fetch pre-orders for the logged-in chef
    const fetchPreOrders = async () => {
      try {
        // Get the token from localStorage or sessionStorage
        const token = localStorage.getItem('token'); // or sessionStorage.getItem('token');
      
        // Check if token is available
        if (!token) {
          console.error('No token found, please log in.');
          return;
        }

        const response = await axiosInstance.get('/preOrder/get-preOrder', {
          headers: {
            Authorization: `Bearer ${token}`,  // Add the token to the Authorization header
          },
        }); // Endpoint to get pre-orders for chef
        if (response.data.length === 0) {
          console.log("No pre-orders found.");
        } else {
          setPreOrders(response.data);  // Assuming setPreOrders is your state setter
        }
      } catch (error) {
        console.error("Error fetching pre-orders: ", error);
      }
    };
  
    fetchPreOrders();
  }, []);

  const handleAccept = async (preOrderId) => {
    try {
        // Get the token from localStorage
        const token = localStorage.getItem('token'); 

        if (!token) {
            alert('You are not logged in. Please log in to continue.');
            return;
        }

        // Make the PUT request with the token in headers and the price in the body
        const response = await axiosInstance.put(
            `/api/chefs/${preOrderId}/preorder/accept`,  // Use the correct endpoint
            { price: price[preOrderId] },  // Send the price in the body
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
                },
            }
        );

        alert('Pre-order accepted and price updated!');

        // Update the state
        const updatedPreOrders = preOrders.map(preOrder =>
            preOrder._id === preOrderId
                ? { ...preOrder, status: 'accepted', price: price[preOrderId] }
                : preOrder
        );
        setPreOrders(updatedPreOrders);
    } catch (error) {
        if (error.response?.status === 403) {
            alert('Forbidden: You are not authorized to update this pre-order.');
        } else if (error.response?.status === 401) {
            alert('Unauthorized: Please log in again.');
        } else {
            alert('An error occurred: ' + error.message);
        }
        console.error('Error updating price: ', error);
    }
};

  
  

  const handlePriceChange = (preOrderId, value) => {
    setPrice({ ...price, [preOrderId]: value });
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2>Pre-Orders</h2>
        {preOrders.length === 0 ? (
          <p>No pre-orders available.</p>
        ) : (
          preOrders.map((preOrder) => (
            <div key={preOrder._id}>
              <h3>{preOrder.name}</h3>
              <p>{preOrder.description}</p>
              <p>Quantity: {preOrder.quantity}</p>
              <p>Delivery Date: {new Date(preOrder.deliveryDate).toLocaleDateString()}</p>

              {preOrder.status === 'pending' && (
                <div>
                  <input
                    type="number"
                    placeholder="Set price"
                    value={price[preOrder._id] || ''}
                    onChange={(e) => handlePriceChange(preOrder._id, e.target.value)}
                  />
                  <button onClick={() => handleAccept(preOrder._id)}>Accept and Set Price</button>
                </div>
              )}

              {preOrder.status === 'accepted' && (
                <div>
                  <p>Status: {preOrder.status}</p>
                  <p>Price: ₹{preOrder.price}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
