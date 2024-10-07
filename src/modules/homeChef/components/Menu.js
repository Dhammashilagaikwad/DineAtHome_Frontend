import Navbar from "./Navbar";
import React, { useState, useRef } from "react";
import FoodCard from "./FoodCard";
import "../styles/Menu.css";

function Menu() {
  const [cards, setCards] = useState([]);
  const [nextId, setNextId] = useState(0);
  const lastCardRef = useRef(null);

  const handleAddCard = () => {
    setCards((prevCards) => {
      const newCards = [...prevCards, nextId];
      setNextId(nextId + 1); // Increment the ID for the next card
      return newCards;
    });
  };

  React.useEffect(() => {
    if (lastCardRef.current) {
      lastCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [cards]); // Scroll into view when cards state changes

  return (
    <>
      <Navbar />
      <div className="menu-page">
        <div className="addItemBtBOx">
          <button className="addItemBt" onClick={handleAddCard}>
            Add Item
          </button>
        </div>

        <div className="card-container-menu">
          {cards.map((id, index) => (
            <div key={id} ref={index === cards.length - 1 ? lastCardRef : null}>
              <FoodCard id={id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Menu;
