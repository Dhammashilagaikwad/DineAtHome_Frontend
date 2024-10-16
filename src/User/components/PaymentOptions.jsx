// import React, { useState } from 'react';
// import '../styles/PaymentOptions.css';
// import Scannerr from '../images/Scanner.jpg'

// const PaymentOptions = () => {
//   const [upiIdInputVisible, setUpiIdInputVisible] = useState(false);
//   const [cardInputVisible, setCardInputVisible] = useState(false);
//   const [upiId, setUpiId] = useState('');
//   const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
//   const [savedUpiIds, setSavedUpiIds] = useState([]);
//   const [savedCards, setSavedCards] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [scannerVisible, setScannerVisible] = useState(false);

//   const handleUpiIdChange = (e) => {
//     setUpiId(e.target.value);
//   };

//   const handleCardChange = (e) => {
//     setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
//   };

//   const handleAddUpiId = () => {
//     setSavedUpiIds([...savedUpiIds, upiId]); // Add new UPI ID to the list
//     setSuccessMessage(`UPI ID ${upiId} added successfully!`);
//     setUpiId('');
//     setUpiIdInputVisible(false);
//     setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
//   };

//   const handleAddCard = () => {
//     setSavedCards([...savedCards, { ...cardDetails }]); // Add new card details to the list
//     setSuccessMessage(`Card ending with ${cardDetails.number.slice(-4)} added successfully!`);
//     setCardDetails({ number: '', expiry: '', cvv: '' });
//     setCardInputVisible(false);
//     setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
//   };

//   return (
//     <>

//       <br />
//       <br />
//       <br />
//       <br />

//       <div className="payment-containerBox">
//         <div className="payment-container">




//           <section className="payment-method">
//             <h2>Pay by Scanning QR Code</h2>
//             <button className="add-button" onClick={() => setScannerVisible(!scannerVisible)}>
//               {scannerVisible ? 'Cancel' : 'Open Scanner'}
//             </button>

//             {scannerVisible && (
//               <div>
//                 <p>Scan your UPI QR code:</p>
//                 <div className="scanner">
//                   <img className='Scannerr' src={Scannerr} alt="Scanner Image" />
//                 </div>
//               </div>
//             )}

//           </section>




//           <section className="payment-method">
//             <h2>Pay by any UPI App</h2>
//             <button className="add-button" onClick={() => setUpiIdInputVisible(!upiIdInputVisible)}>
//               {upiIdInputVisible ? 'Cancel' : '+ Add New UPI ID'}
//             </button>
//             {upiIdInputVisible && (
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Enter UPI ID"
//                   value={upiId}
//                   onChange={handleUpiIdChange}
//                 />
//                 <button onClick={handleAddUpiId}>Save UPI ID</button>
//               </div>
//             )}
//             <p>You need to have a registered UPI ID</p>
//             <h4>Saved UPI IDs:</h4>
//             <ul>
//               {savedUpiIds.map((id, index) => (
//                 <li key={index}>{id}</li>
//               ))}
//             </ul>
//           </section>

//           <section className="payment-method">
//             <h2>Credit & Debit Cards</h2>
//             <button className="add-button" onClick={() => setCardInputVisible(!cardInputVisible)}>
//               {cardInputVisible ? 'Cancel' : '+ Add New Card'}
//             </button>
//             {cardInputVisible && (
//               <div>
//                 <input
//                   type="text"
//                   name="number"
//                   placeholder="Card Number"
//                   value={cardDetails.number}
//                   onChange={handleCardChange}
//                 />
//                 <input
//                   type="text"
//                   name="expiry"
//                   placeholder="Expiry Date (MM/YY)"
//                   value={cardDetails.expiry}
//                   onChange={handleCardChange}
//                 />
//                 <input
//                   type="text"
//                   name="cvv"
//                   placeholder="CVV"
//                   value={cardDetails.cvv}
//                   onChange={handleCardChange}
//                 />
//                 <button onClick={handleAddCard}>Save Card</button>
//               </div>
//             )}

//             <div className="shown">

//               <p>Save and Pay via Cards.</p>
//               <h4 className='h4ForCard'>Saved Cards:</h4>
//               <ul>
//                 {savedCards.map((card, index) => (
//                   <li key={index}>
//                     Card ending with {card.number.slice(-4)} (Expiry: {card.expiry})
//                   </li>
//                 ))}
//               </ul>
//             </div>

//           </section>

//           {successMessage && <div className="success-message">{successMessage}</div>}

//           <section className="more-options">
//             <h3>More Payment Options</h3>

//             <div className="option">
//               <div className="optionIcon">
//                 <span className="icon">💳</span>
//                 <span>Wallets</span>
//               </div>
//               <span className="description">PhonePe, Amazon Pay & more</span>
//             </div>

//             <div className="option">
//               <div className="optionIcon">
//                 <span className="icon">🍔</span>
//                 <span>Pluxee</span>
//               </div>
//               <span className="description">Pluxee card valid only on Food & Instamart</span>
//             </div>

//             <div className="option">
//               <div className="optionIcon">
//                 <span className="icon">🏦</span>
//                 <span>Netbanking</span>
//               </div>
//               <span className="description">Select your preferred bank</span>
//             </div>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentOptions;
