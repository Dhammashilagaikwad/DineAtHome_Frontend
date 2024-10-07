import React, { useState, useEffect } from "react";
import "../styles/CartForSecond.css";
import opendoor from "../images/opendoor.png";
import closedoor from "../images/closedoor.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosService"; // Import axiosInstance

const CartForSecond = () => {
  const [chefs, setChefs] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  // Fetch chefs from backend
  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axiosInstance.get("api/chefs"); // Adjust this endpoint based on your backend route
        setChefs(response.data); // Assuming backend returns an array of chefs
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };

    fetchChefs();
  }, []);

  const handleScroll = (event) => {
    const { scrollLeft, scrollWidth, clientWidth } = event.target;
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      setShowMore(true);
    }
  };

  const handleSeeMore = () => {
    navigate('/chefs-near-you');
  };

  const handleCardClick = (chefData) => {
    navigate(`/chef-profile/${chefData._id}`, { state: chefData });
  };

  return (
    <div className="cart-containerForSecondMain">
      <h1 className="text-3xl font-bold p-4">DINE AT HOME</h1>

      <div className="cart-scroll-container" onScroll={handleScroll}>
        {chefs.map((chef) => (
          <RestaurantCard
            key={chef._id}
            image={chef.profilePhoto || "https://via.placeholder.com/150"}
            rating={chef.average_rating || "No rating"}
            name={chef.name}
            cuisine={chef.cuisine.join(", ")}
            specialities={chef.specialities.join(", ")}
            isOpen={chef.is_active}
            location={chef.location}
            onClick={() => handleCardClick(chef)}
          />
        ))}
      </div>

      {showMore && (
        <button className="see-more-btn" onClick={handleSeeMore}>
          SEE MORE
        </button>
      )}
    </div>
  );
};

const RestaurantCard = ({
  image,
  rating,
  name,
  cuisine,
  specialities,
  isOpen,
  location,
  onClick,
}) => {
  return (
    <div className="restaurant-card" onClick={onClick}>
      <div className="Chefimage-container">
        <img src={image} alt={name} className="chef-image" />
        <div className="rating">
          <span>⭐</span> {rating}
        </div>
      </div>
      <div className="restaurant-content">
        <h2 className="Homechef-name">{name}</h2>
        <p className="chef-cuisine">Cuisine: {cuisine}</p>
        <p className="chef-specialities">Specialities: {specialities}</p>
        <div className="chef-info">
          <span className="status-icon">
            {isOpen ? (
              <img src={opendoor} alt="Open" />
            ) : (
              <img src={closedoor} alt="Closed" />
            )}
          </span>
          <span className="status">{isOpen ? "OPEN" : "CLOSED"}</span>
        </div>
        <p className="chef-location">{location}</p>
      </div>
    </div>
  );
};

export default CartForSecond;
