import React, { useState } from 'react';

const Profile = ({ onClose, setPhoto }) => {
  const [address, setAddress] = useState('123 Main St, Anytown, USA');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(address);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Update photo in Navbar
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAddress = () => {
    setAddress(newAddress);
    setIsEditingAddress(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-5">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        <div className="mb-4">
          <label className="block mb-2">Upload Photo:</label>
          <input type="file" onChange={handlePhotoChange} accept="image/*" />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Address:</label>
          {isEditingAddress ? (
            <div className="flex items-center">
              <textarea
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="border p-2 flex-grow"
                rows="4" // Adjust the number of rows as needed
              />
              <button onClick={handleSaveAddress} className="ml-2 p-2 bg-blue-500 text-white rounded">
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <p className="flex-grow">{address}</p>
              <button onClick={() => setIsEditingAddress(true)} className="ml-2 p-2 bg-blue-500 text-white rounded">
                Edit Address
              </button>
            </div>
          )}
        </div>

        <button onClick={onClose} className="p-2 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Profile;
