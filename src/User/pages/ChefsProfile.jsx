import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "../styles/ChefProfile.css";
import "react-datepicker/dist/react-datepicker.css";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import axiosInstance from "../../utils/axiosService";
import { jwtDecode } from "jwt-decode"; // Correct import
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../components/NotificationContext";

function UserChefProfile() {
  const { triggerNotification } = useNotification();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the page is loaded
  }, []);
  const { id } = useParams();
  const [chefData, setChefData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to check login status
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 7);
  const [showCustomizedForm, setShowCustomizedForm] = useState(false);
  const [customizedOrder, setCustomizedOrder] = useState({
    name: "",
    description: "",
    quantity: "",
    // priceRange: {
    //   minPrice: "",
    //   maxPrice: "",
    // },
    deliveryDate: new Date(),
  });

  const [preOrders, setPreOrders] = useState([]);

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000" // Localhost URL
      : "https://dineathomebackend.vercel.app"; // Deployed URL

  // useEffect(() => {
  //   const fetchPreOrders = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:4000/preOrderRoutes/get-preOrder`);
  //       setPreOrders(response.data);
  //     } catch (error) {
  //       console.error("Error fetching pre-orders:", error);
  //     }
  //   };

  //   fetchPreOrders();
  // }, []);

  useEffect(() => {
    // Fetch user login status from your auth system (e.g., JWT token check)
    const checkLoginStatus = () => {
      // Example: Checking token in localStorage
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();

    const fetchChefData = async () => {
      try {
        const response = await axiosInstance.get(`/api/chefs/${id}`);
        setChefData(response.data);

        // Use the chef ID dynamically in the URL
        const menuResponse = await axiosInstance.get(
          `/addItem/getitembychefid/${id}`
        );
        setMenuItems(menuResponse.data);
      } catch (error) {
        console.error("Error fetching chef data:", error);
      }
    };

    fetchChefData();
  }, [id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isFutureDate = selectedDate > today;

  const handleCustomizedFoodClick = () => {
    if (!isLoggedIn) {
      // alert("Please log in to proceed with Preorders.");
      triggerNotification("Please log in to proceed with Preorders.", "red");
      return;
    }
    setShowCustomizedForm(true);
  };

  const handleCustomizedInputChange = (e) => {
    const { name, value } = e.target;
    setCustomizedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // const handlePriceRangeChange = (e) => {
  //   const { name, value } = e.target;
  //   setCustomizedOrder((prevOrder) => ({
  //     ...prevOrder,
  //     priceRange: {
  //       ...prevOrder.priceRange,
  //       [name]: value,
  //     },
  //   }));
  // };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Ensure that you're retrieving the token correctly

    try {
      await axiosInstance.post(
        `/preOrder/add-preOrder`,
        {
          ...customizedOrder,
          deliveryDate: selectedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );

      triggerNotification(
        "Customized order request sent successfully!",
        "green"
      );
      setShowCustomizedForm(false);
      setCustomizedOrder({
        name: "",
        description: "",
        quantity: "",
        deliveryDate: new Date(),
      });
    } catch (error) {
      console.error("Error sending customized order:", error);
      triggerNotification("Failed to send customized order.", "red");
    }
  };

  const updatePreOrder = async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(
        `/preOrder/edit-preOrder/${id}`,
        updatedData
      );
      // alert("Pre-order updated successfully!");
      triggerNotification("Pre-order updated successfully!", "green");
      // Update local state as needed
    } catch (error) {
      console.error("Error updating pre-order:", error);
    }
  };

  const deletePreOrder = async (id) => {
    try {
      await axiosInstance.delete(`/preOrder/delete-preOrder/${id}`);
      // alert("Pre-order deleted successfully!");
      triggerNotification("Pre-order deleted successfully!", "green");
      // Update local state as needed
    } catch (error) {
      console.error("Error deleting pre-order:", error);
    }
  };

  const handleCloseForm = () => {
    setShowCustomizedForm(false);
  };

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      // alert("Please log in to add items to the cart.");
      triggerNotification("Please log in to add items to the cart.", "red");
      return;
    }

    // Add item to cart logic here
    console.log(`Item added to cart: ${item.foodName}`);
  };

  return (
    <div className="menu-card-container">
      <div className="menu-card">
        <h5>
          {chefData ? `${chefData.name} - ${chefData.cuisine}` : "Loading..."}
        </h5>

        {chefData ? (
          <div>
            {/* <h1>{chefData.name}</h1> */}
            {chefData.coverImage && (
              <img
                src={`${baseURL}/coverImage-uploads/${chefData.coverImage}`} // Make sure this matches your backend
                alt={`${chefData.name}'s Cover Image`}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  padding: "10px",
                }}
              />
            )}

            <div style={{ textAlign: "left", paddingLeft: "10px" }}>
              <p>
                <strong>Rating: </strong>
                {chefData.average_rating}
              </p>
              <p>
                <strong>Cuisine: </strong>
                {chefData.cuisine}
              </p>{" "}
              {/* Directly displaying Cuisine */}
              <p>
                <strong>Specialities: </strong>
                {Array.isArray(chefData.specialities)
                  ? chefData.specialities.join(", ")
                  : chefData.specialities}
              </p>{" "}
              {/* Check if specialities is an array */}
              <p>{chefData.is_active ? "Open" : "Closed"}</p>
            </div>
          </div>
        ) : (
          <p>No data available for this chef.</p>
        )}

        <div style={{ textAlign: "left" }}>
          <label>
            <strong>Select Delivery Date:</strong>
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={today}
            maxDate={maxDate}
            dateFormat="MMMM d, yyyy"
            style={styles.datePicker}
          />
          {isFutureDate && (
            <button
              style={styles.customizedButton}
              onClick={handleCustomizedFoodClick}
            >
              Customized Food / Preorders
            </button>
          )}
        </div>
      </div>
      <div className="menuSection">
        <strong>
          <h2 style={{ padding: "10px", fontSize: "20px" }}>Menu</h2>
        </strong>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item._id} style={styles.menuItem}>
              {item.foodPhoto ? (
                <img
                  src={`${baseURL}${item.foodPhoto}`} // Ensure correct URL
                  alt={item.foodName}
                  style={styles.image}
                />
              ) : (
                <div style={styles.imagePlaceholder}>No Image Available</div>
              )}
              <div>
                <strong>
                  <h3>{item.foodName}</h3>
                </strong>
                <p>{item.foodDescription}</p>
                <p>
                  <strong>Price:</strong> Rs {item.amount}
                </p>
                {/* Display the chef's name instead of chefId */}
                {chefData && (
                  <p>
                    <strong>Chef: </strong>
                    {chefData.name}
                  </p>
                )}
                <button
                  className="addtocart"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No menu items available for this chef.</p>
        )}
      </div>

      {/* <div>
        <h2>Pre-Orders</h2>
        {preOrders.length > 0 ? (
          preOrders.map((order) => (
            <div key={order._id}>
              <h3>{order.name}</h3>
              <p>{order.description}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Price Range: ${order.priceRange.minPrice} - ${order.priceRange.maxPrice}</p>
              <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
              Add buttons for update and delete here
            </div>
          ))
        ) : (
          <p>No pre-orders available.</p>
        )}
      </div> */}

      {/* Customized Food Form */}
      {showCustomizedForm && (
        <div style={styles.customized_form_overlay}>
          <div style={styles.customized_form}>
            <button
              style={styles.customized_close_button}
              onClick={handleCloseForm}
              aria-label="Close"
            >
              &times; {/* This is a more accessible close icon */}
            </button>
            <h3 style={styles.customized_form_heading}>
              Customize Your Food Order
            </h3>
            <form onSubmit={handleFormSubmit}>
              <label style={styles.customized_order}>
                Dish Name:
                <input
                  type="text"
                  name="name"
                  value={customizedOrder.name}
                  onChange={handleCustomizedInputChange}
                  style={styles.customized_input}
                  required
                />
              </label>
              <label style={styles.customized_order}>
                Dish Description:
                <textarea
                  name="description"
                  value={customizedOrder.description}
                  onChange={handleCustomizedInputChange}
                  style={styles.customized_input}
                  required
                />
              </label>
              <label style={styles.customized_order}>
                Quantity:
                <input
                  type="number"
                  name="quantity"
                  value={customizedOrder.quantity}
                  onChange={handleCustomizedInputChange}
                  style={styles.customized_input}
                  required
                />
              </label>
              <label style={styles.customized_order}>
                Delivery Date:
                <DatePicker
                  selected={customizedOrder.deliveryDate}
                  onChange={(date) =>
                    setCustomizedOrder((prevOrder) => ({
                      ...prevOrder,
                      deliveryDate: date,
                    }))
                  }
                  minDate={today}
                  maxDate={maxDate}
                  dateFormat="MMMM d, yyyy"
                  style={styles.datePicker}
                />
              </label>
              <button type="submit" style={styles.customized_submit_button}>
                Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  menuItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    width: "100%",
    maxWidth: "800px",
  },
  image: {
    width: "100px",
    height: "100px",
    marginRight: "20px",
  },
  customizedButton: {
    margin: "10px",
    padding: "5px 15px",
    backgroundColor: "#f9f9f9",
    color: "#000",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  customized_form_overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  customized_form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    position: 'relative', // To position the close button correctly
  },
  customized_close_button: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  customized_form_heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  customized_order: {
    display: "block",
    marginBottom: "10px",
  },
  customized_input: {
    padding: "8px",
    width: '100%',
    margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  datePicker: {
    width: '100%',
    padding: '8px',
  },
  customized_submit_button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};

export default UserChefProfile;
