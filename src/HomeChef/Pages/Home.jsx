import React, { useState, useRef } from 'react';
import "../Styles/Home.css";
import bgPicForHomeinitF from "../images/backgrforhomeofchef.jpg"
import bgPicForHomeinitFForMobile from "../images/backgrforhomeofchefForMobile.jpg"
import FoodCard from "../Component/FoodCard";
import DutyToggle from '../Component/DutyToggle';
import ProfileForm from '../Component/MainProfileEdit';
import Navbar from '../Component/Navbar'
// import Footer from '../Component/Footer'

const Home = () => {
  const [cards, setCards] = useState([]);
  const [nextId, setNextId] = useState(0);
  const lastCardRef = useRef(null); // Ref to the last added card

  const handleAddCard = () => {
    setCards((prevCards) => {
      const newCards = [...prevCards, nextId];
      setNextId(nextId + 1); // Increment the ID for the next card
      return newCards;
    });
  };

  React.useEffect(() => {
    if (lastCardRef.current) {
      lastCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [cards]); // Scroll into view when cards state changes

  return (
    <div>
      <Navbar/>
      <div className="bgPicForHome">
        <img className='bgPicForHomeinit' src={bgPicForHomeinitF} alt="" />
        <img className='bgPicForHomeinitForMobile' src={bgPicForHomeinitFForMobile} alt="backgroung image in mobile" />

        <div>
          <DutyToggle />
        </div>

        <div>
          <ProfileForm />
        </div>

        <div className="addItemBtBOx">
          <button className='addItemBt' onClick={handleAddCard}>Add Item</button>
        </div>

        <div className="card-container">
          {cards.map((id, index) => (
            <div key={id} ref={index === cards.length - 1 ? lastCardRef : null}>
              <FoodCard id={id} />
            </div>
          ))}
        </div>


      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Home;
