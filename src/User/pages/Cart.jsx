import React, { useEffect, useState } from 'react';
import CartC from '../components/CartC';
import AfterLoginNavbar from '../components/AfterLoginNavbar';
import axiosInstance from '../../utils/axiosService';
import '../styles/Cart.css';
import {jwtDecode} from 'jwt-decode'; // Correct import
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

  const baseURL = process.env.NODE_ENV === "development" 
  ? 'http://localhost:4000' // Localhost URL
  : 'https://dineathomebackend.vercel.app'; // Deployed URL


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
        const menuCartItems = menuResponse.data.items || [];

      // Process cart items to handle duplicates
      const updatedCartItems = menuCartItems.reduce((acc, item) => {
        const existingItemIndex = acc.findIndex(i => i.itemId._id === item.itemId._id);

        if (existingItemIndex >= 0) {
          // If the item exists, increment its quantity
          acc[existingItemIndex].quantity += item.quantity;
        } else {
          // If it's a new item, add it to the cart
          acc.push({ ...item });
        }

        return acc;
      }, []);

      setCartItems(updatedCartItems);
      console.log('Updated Cart Items:', updatedCartItems);

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

  // const increaseTip = () => {
  //   if (tip < 50) setTip(tip + 10);
  // };

  // const decreaseTip = () => {
  //   if (tip > 0) setTip(tip - 10);
  // };

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
const totalAmount = dishCharges + shopCharges + deliveryCharges + taxCharges || 0;

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


  // Move handleCheckout function outside
  const handleCheckout = async () => {
    try {
      // Fetch Razorpay API Key
      const { data: { key } } = await axiosInstance.get('/api/payments/getkey');
  
      // Create an order on your backend with the total amount
      const { data: { order } } = await axiosInstance.post('/api/payments/create-order', {
        amount: totalAmount,
        currency: 'INR',
      });
  
      // Get token from localStorage (or your state management system)
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert("Token not found. Please log in again.");
        return;
      }
  
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;// Or wherever your JWT token is stored
  
      // Configure Razorpay Checkout
      const options = {
        key,  // Razorpay API key
        amount: order.amount, // Amount in paise (make sure amount is converted properly in backend)
        currency: order.currency,
        name: 'DINE AT HOME',
        description: 'Transaction',
        order_id: order.id, // Order ID from backend
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
  
          try {
            // Process the payment on the backend
            const paymentResponse = await axiosInstance.post(
              '/api/payments/process-payment', 
              {
                amount: totalAmount,
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                signature: razorpay_signature,
              }, 
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Include token in the headers
                }
              }
            );
  
            if (paymentResponse.data.status) {
              alert('Payment Successful!');
            } else {
              alert('Payment Failed: ' + paymentResponse.data.message);
            }
          } catch (paymentError) {
            console.error('Error processing payment:', paymentError);
            alert('Payment failed during processing.');
          }
        },
        prefill: {
          name: 'DINE AT HOME',  // Optional: prefill fields in Razorpay modal
          email: 'dhammashila025@gmail.com',  // Replace with actual user email
          contact: '9324486349',  // Replace with actual user contact
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      // Open Razorpay Checkout modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  
  
  
  

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
      quantity={`Qty: ${item.quantity}`}
      // qty={`Quantity: ${item.quantity }`} // Display user's selected quantity
      imageSrc={itemData.foodPhoto ? `${baseURL}${itemData.foodPhoto}` : ''} // Ensure food photo is displayed
      itemId={item._id} // Pass the itemId
      onDelete={(deletedItemId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== deletedItemId)); // Remove item from state
      }}
        />
  );



})}

            {shopCartItems.map(item => {
              const itemData = item.item || {};
              console.log("shopdetail", itemData);
              console.log("chefname", itemData.chef?.name);
              return (
                <CartC
                  key={item._id}
                  foodName={itemData.itemname || "Unknown Item"}
                  foodName2={itemData.chef?.name || "Unknown Chef"}
                  rate={`Rs. ${itemData.price ? (itemData.price * item.quantity).toFixed(2) : '0.00'}`} // Ensure correct calculation
                  quantity={item.quantity}
                  // quantity={`Qty: ${itemData.quantity || 1}`} 
                  imageSrc={itemData.image? `${baseURL}${itemData.image}` : "defaultImage.jpg"} // Provide a fallback image source
                  itemId={item._id} // Pass the itemId
                  onDelete={(deletedItemId) => {
                    setShopCartItems(prevItems => prevItems.filter(item => item._id !== deletedItemId)); // Remove item from state
                  }}
                
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
         <div className="dishChargesBox">
            <p>Dish Charges:</p>
            <p>₹{dishCharges.toFixed(2)}</p>
          </div >
          <div className='deliveryAndPackagingChargesBox'>
            <p>Delivery & Packaging Charges:</p>
            <p>₹{deliveryCharges.toFixed(2)}</p>
          </div>
        {/* <p>Tip to Rider: ₹{tip.toFixed(2)}</p> */}
        <div className='tipTORiderBox'>
        <p>Shop Charges: </p>
        <p>₹{isNaN(shopCharges) ? '0.00' : shopCharges.toFixed(2)}</p>
        </div>
        {/* <p>Shop Charges: ₹{isNaN(shopCharges) ? '0.00' : shopCharges.toFixed(2)}</p> */}
        <div className='taxChargesBox'>
        <p>Tax Charges: </p>
        <p>₹{isNaN(taxCharges) ? '0.00' : taxCharges.toFixed(2)}</p>
        </div>
{/* <p>Tax Charges: ₹{isNaN(taxCharges) ? '0.00' : taxCharges.toFixed(2)}</p> */}
       <div className='TotalAmountBox'>
        <p>Total Amount: </p>
        <p>₹{totalAmount.toFixed(2)}</p>
      </div>
        {/* <p>Total Amount: ₹{totalAmount.toFixed(2)}</p> */}
      </div>
 
{/* 
      <Link to="/user/PaymentOptions"> */}
      <div className='placeOrderForCartBox'>
      <button className='checkoutBtn placeOrderForCart' onClick={handleCheckout}>
            Checkout
        </button></div>
      {/* </Link> */}
    </>
  );
}
