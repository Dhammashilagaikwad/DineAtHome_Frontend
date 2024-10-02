import React, { useEffect, useState } from "react";
import food7 from "../images/food7.jpg";
import opendoor from "../images/opendoor.png";
import closedoor from "../images/closedoor.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ChefsNearYou() {
  const navigate = useNavigate();
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/chefs/'); // Adjust the API endpoint
        setChefs(response.data);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  const handleCardClick = (chefData) => {
    navigate(`/chef-profile/${chefData._id}`, { state: chefData });
  };

  if (loading) return <div>Loading chefs...</div>;

  return (
    <div className="block">
      <div style={styles.back}>
        <h1 style={styles.heading}>Chefs Near You</h1>
        <div style={styles.container}>
          {chefs.map((chef) => {
            // Log to check what specialities are coming in
            console.log("Chef Specialities:", chef.specialities);

            // Check if chef has any specialities and concatenate them
            const cuisines = (chef.cuisine && chef.cuisine.length > 0)
              ? chef.cuisine.join(", ") // Join all cuisines with a comma
              : 'Cuisines not available'; // Fallback message

            const specialities = (chef.specialities && chef.specialities.length > 0)
              ? chef.specialities.join(", ") // Join all specialties with a comma
              : 'Specialities not available'; // Fallback message

            // Extract location information, ensure to handle cases where it might not be available
            const location = chef.location || 'Location not specified'; // Fallback if location not provided

            return (
              <RestaurantCard
                key={chef._id}
                image={chef.image || food7} // Use a default image if not provided
                rating={chef.average_rating}
                name={`${chef.name}`}
                cuisine={cuisines} // Set the cuisine directly
                specialities={specialities} // Set the specialities directly
                isOpen={chef.is_active}
                hours="Operating Hours" // Customize if you have specific hours
                location={location} // Set the location dynamically
                onClick={() => handleCardClick(chef)}
              />
            );
          })}
        </div>
        <Notecard />
      </div>
    </div>
  );
}

const RestaurantCard = ({
  image,
  rating,
  name,
  cuisine,
  specialities, // Accept specialities as a prop
  isOpen,
  hours,
  location,
  onClick,
}) => {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.imageContainer}>
        <img src={image} alt={name} style={styles.image} />
        <div style={styles.rating}>
          <span>⭐</span> {rating}
        </div>
      </div>
      <div style={styles.content}>
        <h2 style={styles.name}>{name}</h2>
        <p style={styles.cuisine}>Cuisine: {cuisine}</p> {/* Display Cuisine */}
        <p style={styles.speciality}>Speciality: {specialities}</p> {/* Display Speciality */}
        <div style={styles.info}>
          <span style={styles.icon}>
            {isOpen ? <img src={opendoor} alt="Open" /> : <img src={closedoor} alt="Closed" />}
          </span>
          <span style={styles.status}>{isOpen ? "OPEN" : "CLOSED"}</span>
          <span style={styles.hours}>{hours}</span>
        </div>
        <p style={styles.location}>{location}</p> {/* Display the dynamic location */}
      </div>
    </div>
  );
};

const Notecard = () => {
  return (
    <div style={styles.container1}>
      <h5 style={styles.note_title}>Note</h5>
      <ul style={styles.noteList}>
        <li style={styles.notes}>
          <i className="fa-regular fa-circle" style={{ color: `#D2AF56`, ...styles.points }}></i>
          <p style={styles.note}>Please order 120 minutes in advance for freshly prepared meals.</p>
        </li>
        <li style={styles.notes}>
          <i className="fa-regular fa-circle" style={{ color: `#D2AF56`, ...styles.points }}></i>
          <p style={styles.note}>Only Online Payment Mode Available.</p>
        </li>
        <li style={styles.notes}>
          <i className="fa-regular fa-circle" style={{ color: `#D2AF56`, ...styles.points }}></i>
          <p style={styles.note}>Cancel orders within 60 seconds of placing them.</p>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  block: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
  notes: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: "0",
    alignItems: "center",
  },
  note: {
    fontSize: "14px",
    paddingLeft: "12px",
    paddingTop: "2px",
    margin: 0,
  },
  noteList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  heading: {
    alignItems: "center",
    textAlign: "center",
    paddingLeft: "3%",
    paddingTop: "0px",
  },
  back: {
    paddingTop: "90px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
  container: {
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#f9f9f9",
    color: "#000",
    width: "100%", // Make it responsive
    maxWidth: "300px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
    fontFamily: "'Nunito', sans-serif",
    height: "auto", // Adjust height for content
    margin: "10px",
    padding: "10px",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  rating: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "#fff",
    color: "#000",
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  content: {
    padding: "20px",
  },
  name: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#000",
  },
  cuisine: {
    fontSize: "16px",
    marginBottom: "15px",
  },
  speciality: {
    fontSize: "16px",
    marginBottom: "15px",
  },
  info: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  icon: {
    marginRight: "10px",
    width: "10px",
    height: "10px",
  },
  status: {
    marginRight: "15px",
    fontWeight: "bold",
    paddingLeft: "55px",
  },
  hours: {
    fontSize: "12px",
  },
  location: {
    fontSize: "14px",
    color: "#000",
    paddingLeft: "70px",
  },
  container1: {
    backgroundColor: "#f9f9f9",
    color: "#000",
    width: "100%", // Make it responsive
    maxWidth: "550px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
    fontFamily: "'Nunito', sans-serif",
    marginTop: "40px",
    padding: "10px",
  },
  note_title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};

export default ChefsNearYou;
