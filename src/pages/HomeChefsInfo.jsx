import React, { useEffect, useState } from "react";
import '../styles/HomeChefsInfo.css';
import food1 from '../images/food11.jpg';
import axios from 'axios'; // Import Axios
import HomeChefProfileCard from "../components/HomeChefProfileCard"; 
import self from '../images/Baker-cuate.png';

export default function HomeChefsInfo() {
    const [homeChefs, setHomeChefs] = useState([]); // State to store chefs

    useEffect(() => {
        const fetchChefs = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/chefs'); // Adjust the URL as necessary
                setHomeChefs(response.data); // Set the state with fetched data
            } catch (error) {
                console.error("Error fetching chefs:", error);
            }
        };

        fetchChefs(); // Call the fetch function
    }, []); // Empty dependency array to run once on mount

    return (
        <>
            <div className="homechefs-container">
                <div className="ourinfo-row">
                    <div className="image-text">
                        <img src={food1} alt="Food" className="img-food" />
                        <div className="overlay"></div>
                        <div className="text-overlay">OUR CHEFS</div>
                    </div>
                </div>
                {homeChefs.map((chef) => (
                    <HomeChefProfileCard
                        key={chef._id} // Use chef's unique ID
                        name={chef.name}
                        speciality={chef.specialities.join(', ')} // Join specialities if it's an array
                        photo={chef.profilePhoto || self} // Use the chef's photo or a default
                        selfphoto={self} // Adjust as necessary for the self photo
                    />
                ))}
            </div>
        </>
    );
}
