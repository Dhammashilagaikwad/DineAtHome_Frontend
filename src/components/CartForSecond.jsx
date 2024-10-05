import React, { useState } from "react";
import "../styles/CartForSecond.css";
import opendoor from "../images/opendoor.png";
import closedoor from "../images/closedoor.png";
import { useNavigate } from "react-router-dom";

const initialChefs = [
  {
    _id: "1",
    image: "https://via.placeholder.com/150",
    average_rating: 4.5,
    name: "Chef Alex",
    cuisine: ["Italian", "Mexican"],
    specialities: ["Pasta", "Tacos"],
    is_active: true,
    location: "New York, NY",
  },
  {
    _id: "2",
    image: "https://via.placeholder.com/150",
    average_rating: 4.7,
    name: "Chef Maria",
    cuisine: ["Indian", "Thai"],
    specialities: ["Biryani", "Green Curry"],
    is_active: false,
    location: "San Francisco, CA",
  },
  {
    _id: "3",
    image: "https://via.placeholder.com/150",
    average_rating: 4.7,
    name: "Chef Maria",
    cuisine: ["Indian", "Thai"],
    specialities: ["Biryani", "Green Curry"],
    is_active: false,
    location: "San Francisco, CA",
  },
  {
    _id: "4",
    image: "https://via.placeholder.com/150",
    average_rating: 4.7,
    name: "Chef Maria",
    cuisine: ["Indian", "Thai"],
    specialities: ["Biryani", "Green Curry"],
    is_active: false,
    location: "San Francisco, CA",
  },
  {
    _id: "5",
    image: "https://via.placeholder.com/150",
    average_rating: 4.7,
    name: "Chef Maria",
    cuisine: ["Indian", "Thai"],
    specialities: ["Biryani", "Green Curry"],
    is_active: false,
    location: "San Francisco, CA",
  },
  {
    _id: "6",
    image: "https://via.placeholder.com/150",
    average_rating: 4.7,
    name: "Chef Maria",
    cuisine: ["Indian", "Thai"],
    specialities: ["Biryani", "Green Curry"],
    is_active: false,
    location: "San Francisco, CA",
  },
  {
    _id: "7",
    image: "https://via.placeholder.com/150",
    average_rating: 4.7,
    name: "Chef Maria",
    cuisine: ["Indian", "Thai"],
    specialities: ["Biryani", "Green Curry"],
    is_active: false,
    location: "San Francisco, CA",
  },
  {
    _id: "8",
    image: "https://via.placeholder.com/150",
    average_rating: 4.7,
    name: "Chef Maria",
    cuisine: ["Indian", "Thai"],
    specialities: ["Biryani", "Green Curry"],
    is_active: false,
    location: "San Francisco, CA",
  },
  {
    _id: "9",
    image: "https://via.placeholder.com/150",
    average_rating: 4.7,
    name: "Chef Maria",
    cuisine: ["Indian", "Thai"],
    specialities: ["Biryani", "Green Curry"],
    is_active: false,
    location: "San Francisco, CA",
  },
];

const additionalChefs = [
  {
    _id: "13",
    image: "https://via.placeholder.com/150",
    average_rating: 4.3,
    name: "Chef Liam",
    cuisine: ["French", "Spanish"],
    specialities: ["Crepes", "Paella"],
    is_active: true,
    location: "Los Angeles, CA",
  },
  {
    _id: "14",
    image: "https://via.placeholder.com/150",
    average_rating: 4.9,
    name: "Chef Emily",
    cuisine: ["Japanese", "Korean"],
    specialities: ["Sushi", "Kimchi"],
    is_active: false,
    location: "Chicago, IL",
  },
  // Add more chefs for demo purposes
];

const CartForSecond = () => {
  const [chefs, setChefs] = useState(initialChefs);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (event) => {
    const { scrollLeft, scrollWidth, clientWidth } = event.target;
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      setShowMore(true);
    }
  };

  const handleSeeMore = () => {
    setChefs([...chefs, ...additionalChefs]);
    setShowMore(false); 
    navigate('/chefs-near-you');
  };

  // <div className="cart-containerForSecondMain">
  //     <h1 className='text-3xl font-bold p-4'>DINE AT HOME</h1>

  {
    /* <div className="cart-containerForSecond" onScroll={handleScroll}>
                {foodItems.map(item => (
                    <div className="cart-itemForSecond" key={item.id}>
                        <img src={item.image} alt={item.name} className="food-imageForSecond" />
                        <h3 className="food-nameForSecond">{item.name}</h3>
                    </div>
                ))}
            </div> */
  }
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
            image={chef.image}
            rating={chef.average_rating}
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
  onClick
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
