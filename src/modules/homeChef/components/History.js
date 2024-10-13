import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import HistoryC from "./HistoryC";
import axiosInstance from "../../../utils/axiosService";
import { jwtDecode } from "jwt-decode";

const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let chefId = null;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        chefId = decodedToken.id;
      } catch (error) {
        console.error("Error decoding token:", error);
        setError("Failed to decode token.");
      }
    } else {
      setError("Token is not provided.");
    }

    const fetchOrderHistory = async () => {
      setLoading(true);
      if (!chefId) {
        setError("Chef ID is not provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(
          `/api/chefs/${chefId}/order-history`
        );
        setOrderHistory(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setError("Failed to fetch order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (orderHistory.length === 0) return <p>No order history available.</p>;

  return (
    <>
      <Navbar />
      <div className="HistoryC-Height">
        <div>
          {orderHistory.map((order) => (
            <HistoryC
              key={order._id}
              customerName={
                order.customerId ? order.customerId.name : "Unknown Customer"
              }
              customerInfo={
                order.preOrderId
                  ? order.preOrderId.name || order.preOrderId._id
                  : "Unknown Order"
              }
              itemPrice={order.price}
              quantity={order.preOrderId ? order.preOrderId.quantity : "N/A"} // Update this to use the quantity from the preOrderId
              orderDate={new Date(order.date).toLocaleDateString()}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
