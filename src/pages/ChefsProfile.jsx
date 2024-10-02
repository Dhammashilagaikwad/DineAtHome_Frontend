import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "../styles/ChefProfile.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

//ChefProfile
function ChefProfile() {
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
    priceRange: {
      minPrice: "",
      maxPrice: "",
    },
    deliveryDate: new Date(),
  });

  const [preOrders, setPreOrders] = useState([]);

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
        const response = await axios.get(`http://localhost:4000/api/chefs/${id}`);
        setChefData(response.data);

        // Use the chef ID dynamically in the URL
        const menuResponse = await axios.get(`http://localhost:4000/addItem/getitembychefid/${id}`);
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
      alert("Please log in to proceed with Preorders.");
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

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setCustomizedOrder((prevOrder) => ({
      ...prevOrder,
      priceRange: {
        ...prevOrder.priceRange,
        [name]: value,
      },
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:4000/preOrderRoutes/preOrder`, {
        ...customizedOrder,
        priceRange: {
          minPrice: parseFloat(customizedOrder.priceRange.minPrice),
          maxPrice: parseFloat(customizedOrder.priceRange.maxPrice),
        },
        deliveryDate: selectedDate, // Ensure deliveryDate is set to selected date
      });
      alert("Customized order request sent successfully!");
      setShowCustomizedForm(false);
      setCustomizedOrder({
        name: "",
        description: "",
        quantity: "",
        priceRange: { minPrice: "", maxPrice: "" },
        deliveryDate: new Date(),
      });
    } catch (error) {
      console.error("Error sending customized order:", error);
      alert("Failed to send customized order.");
    }
  };

  const updatePreOrder = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:4000/preOrderRoutes/edit-preOrder/${id}`, updatedData);
      alert("Pre-order updated successfully!");
      // Update local state as needed
    } catch (error) {
      console.error("Error updating pre-order:", error);
    }
  };

  const deletePreOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/preOrderRoutes/delete-preOrder/${id}`);
      alert("Pre-order deleted successfully!");
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
      alert("Please log in to add items to the cart.");
      return;
    }

    // Add item to cart logic here
    console.log(`Item added to cart: ${item.foodName}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.menuCard}>
        <h5 style={{ textAlign: "center", paddingTop: "70px" }}>
          {chefData ? `${chefData.name} - ${chefData.cuisine} Specialist` : 'Loading...'}
        </h5>

        {chefData ? (
          <div>
            <h1>{chefData.name}</h1>
            {chefData.coverImage && (
                    <img
                    src={`http://localhost:4000/coverImage-uploads/${chefData.coverImage}`}  // Make sure this matches your backend
                        alt={`${chefData.name}'s Cover Image`}
                        style={{ width: "100%", height: "300px", objectFit: "cover" }}
                    />
                )}
                
   
            <p>Rating: {chefData.average_rating}</p>
            <p>Cuisine: {chefData.cuisine}</p> {/* Directly displaying Cuisine */}
            <p>Specialities: {Array.isArray(chefData.specialities) ? chefData.specialities.join(", ") : chefData.specialities}</p> {/* Check if specialities is an array */}
            <p>{chefData.is_active ? "Open" : "Closed"}</p>
          </div>
        ) : (
          <p>No data available for this chef.</p>
        )}

        <div>
          <label>Select Delivery Date:</label>
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
      <div style={styles.menuSection}>
        <h2>Menu</h2>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item._id} style={styles.menuItem}>
              {item.foodPhoto ? (
                <img src={`http://localhost:4000/${item.foodPhoto}`} alt={item.foodName} style={styles.image} />
              ) : (
                <div style={styles.imagePlaceholder}>No Image Available</div>
              )}
              <div>
                <h3>{item.foodName}</h3>
                <p>{item.foodDescription}</p>
                <p>Price: ${item.amount}</p>
                {/* Display the chef's name instead of chefId */}
                {chefData && <p>Chef: {chefData.name}</p>}
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p>No menu items available for this chef.</p>
        )}
      </div>



      <div>
        <h2>Pre-Orders</h2>
        {preOrders.length > 0 ? (
          preOrders.map((order) => (
            <div key={order._id}>
              <h3>{order.name}</h3>
              <p>{order.description}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Price Range: ${order.priceRange.minPrice} - ${order.priceRange.maxPrice}</p>
              <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
              {/* Add buttons for update and delete here */}
            </div>
          ))
        ) : (
          <p>No pre-orders available.</p>
        )}
      </div>

      {/* Customized Food Form */}
      {showCustomizedForm && (
        <div style={styles.customized_form_overlay}>
          <div style={styles.customized_form}>
            <button
              style={styles.customized_close_button}
              onClick={handleCloseForm}
            >
              X
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
                Price Range:
                <input
                  type="number"
                  name="minPrice"
                  value={customizedOrder.priceRange.minPrice}
                  onChange={handlePriceRangeChange}
                  placeholder="Min Price"
                  style={styles.customized_input}
                  required
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={customizedOrder.priceRange.maxPrice}
                  onChange={handlePriceRangeChange}
                  placeholder="Max Price"
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
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  menuCard: {
    width: "70%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
  },
  menuSection: {
    width: "70%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
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
  },
  customized_form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  },
  customized_close_button: {
    background: "none",
    border: "none",
    fontSize: "20px",
    position: "absolute",
    right: "10px",
    top: "10px",
    cursor: "pointer",
  },
  customized_form_heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  customized_order: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  customized_input: {
    padding: "5px",
    margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
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

export default ChefProfile;

