import React, { useState, useEffect, useRef } from "react";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import "../styles/EditProfile.css";
import pizza from "../images/pizza.png";
import pasta from "../images/pasta.jpg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";



export default function EditProfile() {
  const [view, setView] = useState("orders"); // Default view set to "orders"
  const panelRef = useRef(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editField, setEditField] = useState(null); // Tracks which field is being edited (username or email)
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  

 // Fetch user ID from token
 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken =jwtDecode(token);
    setUserId(decodedToken.id);
    fetchUserDetails(decodedToken.id);
  }
}, []);

 // Fetch user details from the backend
 const fetchUserDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/user/getUser/${id}`);
    setUserDetails(response.data.user);
    setAddresses(response.data.user.addresses || []);
  }  catch (error) {
    console.error("Error fetching user details:", error);
  }
};
  

  const handleClick = (newView) => {
    setView(newView);
  };

  const pastOrders = [
    {
      orderId: "12345",
      orderName: "Pizza Margherita",
      quantity: 1,
      foodImage: pizza,
      paidAmount: "Rs120.00",
      orderDate: "2024-09-15",
    },
    // {
    //   orderId: "12346",
    //   orderName: "Pasta Carbonara",
    //   quantity: 2,
    //   foodImage: pasta,
    //   paidAmount: "Rs200.00",
    //   orderDate: "2024-09-12",
    // },
  ];

  const preorders = [
    {
      orderId: "54321",
      orderName: "Vegan Burger",
      quantity: 1,
      foodImage: pizza,
      paidAmount: "Rs150.00",
      deliveryDate: "2024-09-30",
    },
    // {
    //   orderId: "54322",
    //   orderName: "Salad Bowl",
    //   quantity: 3,
    //   foodImage: pasta,
    //   paidAmount: "Rs350.00",
    //   deliveryDate: "2024-10-02",
    // },
  ];

  // const addresses = [
  //   {
  //     id: 1,
  //     address: "Ghatkopar, Mumbai",
  //     place: "Home",
  //   },
  //   {
  //     id: 2,
  //     address: "Bandra, Mumbai",
  //     place: "Office",
  //   },
  // ];

  const [addresses, setAddresses] = useState([]); // Track user addresses
  const [editingAddressId, setEditingAddressId] = useState(null); // Track which address is being edited
  const [newAddress, setNewAddress] = useState(""); 

  // const renderOrders = () => (
  //   <div className="orders-list">
  //     {pastOrders.map((order) => (
  //       <div className="order-item" key={order.orderId}>
  //         <img src={order.foodImage} alt={order.orderName} />
  //         <div>
  //           <h5>{order.orderName}</h5>
  //           <p>Order ID: {order.orderId}</p>
  //           <p>Quantity: {order.quantity}</p>
  //           <p>Amount Paid: {order.paidAmount}</p>
  //           <p>Date: {order.orderDate}</p>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  const renderPastOrders = () => (
    <div className="orders-list">
      <h3>Previous Orders</h3>
      {pastOrders.map((order) => (
        <div className="order-item" key={order.orderId}>
          <img src={order.foodImage} alt={order.orderName} />
          <div>
            <h5>{order.orderName}</h5>
            <p>Order ID: {order.orderId}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Amount Paid: {order.paidAmount}</p>
            <p>Date: {order.orderDate}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPreorders = () => (
    <div className="orders-list">
      <h3>Preorders</h3>
      {preorders.map((order) => (
        <div className="order-item" key={order.orderId}>
          <img src={order.foodImage} alt={order.orderName} />
          <div>
            <h5>{order.orderName}</h5>
            <p>Order ID: {order.orderId}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Amount Paid: {order.paidAmount}</p>
            <p>Delivery Date: {order.deliveryDate}</p>
          </div>
        </div>
      ))}
    </div>
  );

  // const renderAddresses = () => (
  //   <div className="address-list">
  //     {addresses.map((address) => (
  //       <div className="address-item" key={address.id}>
  //         <p>{address.address}</p>
  //         <p>{address.place}</p>
  //         <button>Edit</button>
  //         <button>Delete</button>
  //       </div>
  //     ))}
  //   </div>
  // );

  const renderAddresses = () => (
    <div className="address-list">
      {addresses.length === 0 ? (
        <div>
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter new address"
          />
          <button onClick={handleAddAddress}>Add Address</button>
        </div>
      ) : (
        addresses.map((address) => (
          <div className="address-item" key={address.id}>
            {editingAddressId === address.id ? (
              <div>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Edit address"
                />
                <button onClick={() => handleSaveAddress(address.id)}>
                  Done
                </button>
              </div>
            ) : (
              <div>
                <p>{address.address}</p>
                <button onClick={() => handleEditAddress(address.id)}>
                  Edit
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  const renderOrders = () => (
    <div>
      {renderPreorders()}
      {renderPastOrders()}
    </div>
  );


  // Update input handlers
const handleEmailChange = (e) => setEmail(e.target.value);
const handlePasswordChange = (e) => setPassword(e.target.value);


 // Function to handle when the user clicks "Delete Account" (trigger confirmation)
 const handleDeleteAccount = (e) => {
  e.preventDefault();
  
  // Show confirmation dialog before proceeding
  const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
  if (confirmation) {
    setIsConfirmed(true);  // If confirmed, allow the delete request
  } else {
    setIsConfirmed(false); // Reset confirmation
  }
};

// Function to handle actual account deletion after confirmation
const handleConfirmDelete = async (e) => {
  e.preventDefault();

  if (!isConfirmed) {
    alert("Please confirm you want to delete the account.");
    return;
  }

  const token = localStorage.getItem("token");
  console.log("Token stored:", token);
    
  if (!token) {
    alert("No authentication token found. Please log in again.");
    return;
  }

  // Log to see the email and password values
  console.log("Email:", email);
  console.log("Password:", password);

  try {
    const response = await axios.post(
      `http://localhost:4000/api/user/delete-UserAccount`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
      }
    );

    if (response.data.status) {
      alert("Account deleted successfully.");
      // Optionally, redirect the user or clear user data from localStorage
      localStorage.removeItem("token");
      window.location.href = "/"; // Redirect to login or homepage after deletion
    } else {
      alert("Error deleting account: " + response.data.message);
    }
  } catch (error) {
    alert("Server error: " + error.message);
  }
};

  const renderAccountOptions = () => (
    <div className="account-options">
      <h4>Delete Account</h4>
      <form>
        <label>Email</label>
        <input type="email" value={email} onChange={handleEmailChange} required />
        <label>Password</label>
        <input type="password" value={password} onChange={handlePasswordChange} required />
        {/* This button only shows the confirmation pop-up */}
        <button type="button" onClick={handleDeleteAccount}>Delete Account</button>
         {/* This button actually sends the delete request after confirmation */}
         <button type="button" onClick={handleConfirmDelete} disabled={!isConfirmed}>Confirm</button>
        
      </form>
    </div>
  );

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
    setEditField(null); // Reset edit field when opening/closing the panel
  };

  const handleEditClick = (field) => {
    setEditField(field);
    setInputValue(userDetails[field]); // Set the input value to current field value
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDoneClick = async () => {
    const updatedDetails = { ...userDetails, [editField]: inputValue };

    try {
      const response = await axios.put(
        `http://localhost:4000/api/user/editUser/${userId}`, // use dynamic userId
        updatedDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      

      if (response.data.status) {
        setUserDetails(updatedDetails);
        alert("Profile updated successfully");
      } else {
        alert("Error updating profile: " + response.data.message);
      }
    } catch (error) {
      alert("Server error: " + error.message);
    }

    setEditField(null);
  };

  const handleClickOutside = (event) => {
    if (isPanelOpen && panelRef.current && !panelRef.current.contains(event.target)) {
      setIsPanelOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPanelOpen]);

  const handleAddAddress = () => {
    if (newAddress.trim() !== "") {
      setAddresses([...addresses, { id: Date.now(), address: newAddress }]);
      setNewAddress("");
    }
  };

  // Handle editing an address
  const handleEditAddress = (id) => {
    setEditingAddressId(id); // Set the ID of the address being edited
  };

  // Handle saving the edited address
  const handleSaveAddress = (id) => {
    const updatedAddresses = addresses.map((address) =>
      address.id === id ? { ...address, address: newAddress } : address
    );
    setAddresses(updatedAddresses);
    setEditingAddressId(null); // Clear the editing state
    setNewAddress(""); // Clear the input field
  };

  

  return (
    <>
      <AfterLoginNavbar />
      <div className="edit-profile">
        <div className="details">
          <div className="left-details">
            <h1>{userDetails.username}</h1>
            <h4>{userDetails.email}</h4>
          </div>
          <div className="right-details">
            <button className="edit-profile-btn" onClick={togglePanel}>
              EDIT PROFILE
            </button>
            <div className={`slide-panel1 ${isPanelOpen ? "visible" : ""}`} ref={panelRef}>
              <h2>Edit Profile</h2>

              <div className="profile-field">
                <label>username:</label>
                {editField === "username" ? (
                  <>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    <button className="done-btn" onClick={handleDoneClick}>
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    <span>{userDetails.username}</span>
                    <button className="change-btn" onClick={() => handleEditClick("username")}>
                      Change
                    </button>
                  </>
                )}
              </div>

              <div className="profile-field">
                <label>Email:</label>
                {editField === "email" ? (
                  <>
                    <input
                      type="email"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    <button className="done-btn" onClick={handleDoneClick}>
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    <span>{userDetails.email}</span>
                    <button className="change-btn" onClick={() => handleEditClick("email")}>
                      Change
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="box1">
          <div className="box2">
            <ul>
              <li
                className={view === "orders" ? "active" : ""}
                onClick={() => handleClick("orders")}
              >
                Orders
              </li>
              <li
                className={view === "addresses" ? "active" : ""}
                onClick={() => handleClick("addresses")}
              >
                Addresses
              </li>
              <li
                className={view === "account" ? "active" : ""}
                onClick={() => handleClick("account")}
              >
                Account
              </li>
            </ul>
          </div>
          <div className="box3">
            <div className="box4">
              {view === "orders" && renderOrders()}
              {view === "addresses" && renderAddresses()}
              {view === "account" && renderAccountOptions()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
