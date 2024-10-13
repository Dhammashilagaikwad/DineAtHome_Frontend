
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosService.js";
import Navbar from "./Navbar";
import "../styles/NotificationP.css";
import "../styles/PreNotification.css";
// import '../../../HomeChef/Styles/NotificationR.css'

export default function ChefPreOrders() {
  const [preOrders, setPreOrders] = useState([]);
  const [price, setPrice] = useState({}); // Store price for each pre-order

  useEffect(() => {
    // Fetch pre-orders for the logged-in chef
    const fetchPreOrders = async () => {
      try {
        // Get the token from localStorage or sessionStorage
        const token = localStorage.getItem("token"); // or sessionStorage.getItem('token');

        // Check if token is available
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const response = await axiosInstance.get("/preOrder/get-preOrder", {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }); // Endpoint to get pre-orders for chef
        if (response.data.length === 0) {
          console.log("No pre-orders found.");
        } else {
          setPreOrders(response.data); // Assuming setPreOrders is your state setter
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
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in. Please log in to continue.");
        return;
      }

      // Make the PUT request with the token in headers and the price in the body
      const response = await axiosInstance.put(
        `/api/chefs/${preOrderId}/preorder/accept`, // Use the correct endpoint
        { price: price[preOrderId] }, // Send the price in the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      alert("Pre-order accepted and price updated!");

      // Update the state
      const updatedPreOrders = preOrders.map((preOrder) =>
        preOrder._id === preOrderId
          ? { ...preOrder, status: "accepted", price: price[preOrderId] }
          : preOrder
      );
      setPreOrders(updatedPreOrders);
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Forbidden: You are not authorized to update this pre-order.");
      } else if (error.response?.status === 401) {
        alert("Unauthorized: Please log in again.");
      } else {
        alert("An error occurred: " + error.message);
      }
      console.error("Error updating price: ", error);
    }
  };

  const handlePriceChange = (preOrderId, value) => {
    setPrice({ ...price, [preOrderId]: value });
  };

  return (
    <div className="PreOrderInModule-Height">
      <Navbar />
      <h2 className="PreOrderInModule-type">Pre-Orders</h2>

      <div className="PreOrderInModule-card">
        <div className="PreOrderInModule-content">
          {preOrders.length === 0 ? (
            <p>No pre-orders available.</p>
          ) : (
            preOrders.map((preOrder) => (
              <div key={preOrder._id}>
                <div className="PreOrderInModule-header">
                  <h3 className="PreOrderInModule-title">{preOrder.name}</h3>
                  <p className="PreOrderInModule-date">
                    Delivery Date:{" "}
                    {new Date(preOrder.deliveryDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="PreOrderInModule-details">
                  <p className="PreOrderInModule-Description">
                    {preOrder.description}
                  </p>
                  <p className="PreOrderInModule-qty">
                    Quantity: {preOrder.quantity}
                  </p>
                </div>

                {preOrder.status === "pending" && (
                  <div className="PreOrderInModule-AcceptSetPrice">
                    <input
                      className="PreOrderInModule-Input"
                      type="number"
                      placeholder="Set price"
                      value={price[preOrder._id] || ""}
                      onChange={(e) =>
                        handlePriceChange(preOrder._id, e.target.value)
                      }
                    />

                    <div className="PreOrderInModule-AcceptDeclineBtn">
                      <button
                        className="PreOrderInModule-AcceptSetPriceBtn"
                        onClick={() => handleAccept(preOrder._id)}
                      >
                        Accept & Set Price
                      </button>

                      <button className="PreOrderInModule-DeclineNotSetPriceBtn">
                        Decline
                      </button>
                    </div>
                  </div>
                )}

                {preOrder.status === "accepted" && (
                  <div className="PreOrderInModule-StatusPrice">
                    <p className="PreOrderInModule-Price">
                      Price: ₹{preOrder.price}
                    </p>
                    <p className="PreOrderInModule-Status">
                      Status: {preOrder.status}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
