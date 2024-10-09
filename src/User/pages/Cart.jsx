import React, { useEffect, useState } from 'react';
import CartC from '../components/CartC';
import AfterLoginNavbar from '../components/AfterLoginNavbar';
import axiosInstance from '../../utils/axiosService';
import '../styles/Cart.css';
import { Link } from 'react-router-dom';

export default function UserCart() {
  const [shopCartItems, setShopCartItems] = useState([]);
  const [cartItems, setCartItems] = useState([]); // For menu carts
  const [tip, setTip] = useState(20);
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; // Today's date in YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(formattedToday); // Default to today
  const [selectedTime, setSelectedTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [chefs, setChefs] = useState({});
  const [deliveryCharges, setDeliveryCharges] = useState(40);
  const [taxRate] = useState(0.10); // 10% tax rate

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the page is loaded

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to log in first.');
          return;
        }
  
        // Fetch menu cart items
        const menuResponse = await axiosInstance.get('/api/menuCart/userMenuCart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Menu cart response:', menuResponse.data);
        // const menuCartItems = menuResponse.data.items || [];
        // setCartItems(menuCartItems.map(item => ({ ...item, quantity: 1 })));
        setCartItems(menuResponse.data.items || []);
        console.log('Cart Items:', cartItems);
        cartItems.forEach(item => console.log('Cart Item:', item));

        // Fetch shop cart items
        const shopResponse = await axiosInstance.get('/api/cart/getallitems', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Shop cart response:', shopResponse.data);
        // const shopCartItems = shopResponse.data.cart.items || [];
        // setShopCartItems(shopCartItems.map(item => ({ ...item, quantity: 1 })));
        setShopCartItems(shopResponse.data.cart.items || []);
        console.log('Shop Cart Items:', shopCartItems);
        shopCartItems.forEach(item => console.log('Item:', item));

        // Fetch chefs
        const chefsResponse = await axiosInstance.get('/api/chefs');
        const chefsData = chefsResponse.data.reduce((acc, chef) => {
          acc[chef._id] = chef.name;
          return acc;
        }, {});
        setChefs(chefsData);
  
      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error);
      }
    };
  
    fetchData();
  }, []);


  const timeOptions = [
    '8 AM - 9 AM',
    '9 AM - 10 AM',
    '10 AM - 11 AM',
    '11 AM - 12 PM',
    '12 PM - 1 PM',
    '1 PM - 2 PM',
    '2 PM - 3 PM',
    '3 PM - 4 PM',
    '4 PM - 5 PM',
    '5 PM - 6 PM',
    '6 PM - 7 PM',
    '7 PM - 8 PM',
    '8 PM - 9 PM',
  ];

  const increaseTip = () => {
    if (tip < 50) setTip(tip + 10);
  };

  const decreaseTip = () => {
    if (tip > 0) setTip(tip - 10);
  };

  const calculateTotalCharges = (items) => {
    return items.reduce((total, item) => {
      const price = item.itemId ? item.itemId.amount : (item.item ? item.item.price : 0);
      const quantity = item.quantity || 0; // Default to 0 if quantity is not present
     
      return total + (price * quantity);

    }, 0);
  };
  
const dishCharges = calculateTotalCharges(cartItems) || 0;
const shopCharges = calculateTotalCharges(shopCartItems) || 0;
const taxCharges = (dishCharges + shopCharges) * taxRate || 0;
const totalAmount = dishCharges + shopCharges + deliveryCharges + tip + taxCharges || 0;

  console.log("Dish Charges:", dishCharges);
  console.log("Shop Charges:", shopCharges);
  console.log("Tax Charges:", taxCharges);
  console.log("Delivery Charges:", deliveryCharges);
  console.log("Tip:", tip);


  const handleAddressButtonClick = () => {
    setIsAddressEditing(!isAddressEditing); // Toggle editing state
  };

  const minDate = formattedToday;
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <>
      <AfterLoginNavbar />
      <div>
        {cartItems.length > 0 || shopCartItems.length > 0 ? (
          <>
           {cartItems.map(item => {
  const itemData = item.itemId || {}; // Use an empty object as a fallback
  return (
    <CartC 
      key={item._id} // Use the cart item's _id
      foodName={itemData.foodName || "Unknown Item"} // Ensure to provide fallback
      foodName2={chefs[itemData.chefId] || "Unknown Chef"} // Use chefId from your itemData
      rate={`Rs. ${itemData.amount ? (itemData.amount * item.quantity).toFixed(2) : '0.00'}`} // Updated rate calculation
      quantity={itemData.quantity} 
      // qty={`Quantity: ${item.quantity }`} // Display user's selected quantity
      imageSrc={itemData.foodPhoto || ''} // Ensure food photo is displayed
    />
  );
})}

            {shopCartItems.map(item => {
              const itemData = item.item || {};
              console.log("shop data", itemData);
              return (
                <CartC
                  key={item._id}
                  foodName={itemData.itemname || "Unknown Item"}
                  foodName2={itemData.chefname|| "Unknown Chef"}
                  rate={`Rs. ${itemData.price ? (itemData.price * item.quantity).toFixed(2) : '0.00'}`} // Ensure correct calculation
                  quantity={item.quantity}
                  // quantity={`Qty: ${itemData.quantity || 1}`} 
                  imgSrc={itemData.image || itemData.foodPhoto || "defaultImage.jpg"} // Provide a fallback image source
                />
              );
            })}
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="belowCartMain">
        <div className="belowCart">
          <div className="deliveryDateForCart">
            <label htmlFor="deliveryDate">Delivery Date:</label>
            <input
              type="date"
              id="deliveryDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={minDate}
              max={maxDateString}
            />
          </div>
          <div className="deliveryTimeForCart">
            <label htmlFor="deliveryTime">Select Time:</label>
            <select
              id="deliveryTime"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="" disabled>Select Time</option>
              {timeOptions.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className="deliveryAddressForCart">
            <p className='deliveryAddressForCartp'>Address: {deliveryAddress || "No Address Set"}</p>
            <button onClick={handleAddressButtonClick}>
              {deliveryAddress ? (isAddressEditing ? "Save Address" : "Change Address") : "Add Address"}
            </button>
          </div>

          {isAddressEditing && (
            <textarea className='deliveryAddressForCartTextArea'
              rows="4"
              cols="30"
              placeholder="Enter your address..."
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              style={{ resize: 'vertical', overflowY: 'scroll' }}
            />
          )}
        </div>
      </div>
      <hr />
{/* 
      <div className="chargesContainermain">
        <div className="chargesContainer">
          <div className="dishChargesBox">
            <p>Dish Charges</p>
            <p>₹ {dishCharges.toFixed(2)}</p>
          </div>

          <div className="deliveryAndPackagingChargesBox">
            <p>Delivery & Packaging Charges</p>
            <p>₹ {deliveryCharges}</p>
          </div>

          <div className="tipTORiderBox">
            <p>Tip to Rider</p>
            <div className='incAndDesTip'>
              <button className='tipIncBtn' onClick={increaseTip} disabled={tip >= 50}>
                +
              </button>
              <p>₹ {tip}</p>
              <button className='tipDecBtn' onClick={decreaseTip} disabled={tip <= 0}>
                -
              </button>
            </div>
          </div>

          <div className="taxChargesBox">
            <p>Tax (10%)</p>
            <p>₹ {taxCharges.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="totalAmountForCart">
  <h3>Total Amount: ₹ {totalAmount.toFixed(2)}</h3>
</div> */}


<div className="chargesDisplay">
        <p>Dish Charges: ₹{dishCharges.toFixed(2)}</p>
        <p>Delivery & Packaging Charges: ₹{deliveryCharges.toFixed(2)}</p>
        <p>Tip to Rider: ₹{tip.toFixed(2)}</p>
        <p>Shop Charges: ₹{isNaN(shopCharges) ? '0.00' : shopCharges.toFixed(2)}</p>
<p>Tax Charges: ₹{isNaN(taxCharges) ? '0.00' : taxCharges.toFixed(2)}</p>
        <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
      </div>
 

      <Link to="/checkout">
        <button className='checkoutBtn'>Proceed to Checkout</button>
      </Link>
    </>
  );
}
