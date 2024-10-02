// src/components/HomechefPopup.jsx
import React from 'react';
import '../styles/Popup.css';

const HomechefPopup = ({ isOpen, onClose }) => {
  const homechefs = [
    {
      id: 1,
      name: "Chef A",
      specialty: "Italian Cuisine",
      image: "path/to/chef-a.jpg", // Replace with actual image path
    },
    {
      id: 2,
      name: "Chef B",
      specialty: "Indian Cuisine",
      image: "path/to/chef-b.jpg", // Replace with actual image path
    },
    {
      id: 3,
      name: "Chef C",
      specialty: "Desserts",
      image: "path/to/chef-c.jpg", // Replace with actual image path
    },
    {
      id: 3,
      name: "Chef C",
      specialty: "Desserts",
      image: "path/to/chef-c.jpg", // Replace with actual image path
    },
    {
      id: 3,
      name: "Chef C",
      specialty: "Desserts",
      image: "path/to/chef-c.jpg", // Replace with actual image path
    },
    {
      id: 3,
      name: "Chef C",
      specialty: "Desserts",
      image: "path/to/chef-c.jpg", // Replace with actual image path
    },
    {
      id: 3,
      name: "Chef C",
      specialty: "Desserts",
      image: "path/to/chef-c.jpg", // Replace with actual image path
    },
    {
      id: 3,
      name: "Chef C",
      specialty: "Desserts",
      image: "path/to/chef-c.jpg", // Replace with actual image path
    },
    // Add more chefs as needed
  ];

  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Homechef Profiles</h2>
        <div className="profile-cards">
          {homechefs.map((chef) => (
            <div className="profile-card" key={chef.id}>
              <img src={chef.image} alt={chef.name} />
              <h3>{chef.name}</h3>
              <p>{chef.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomechefPopup;
