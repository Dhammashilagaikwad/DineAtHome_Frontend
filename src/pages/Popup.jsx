import React from "react";
import { CSSTransition } from "react-transition-group";
import "../styles/Popup.css";
import festive from "../images/festivefood.jpg";
import gharkhana from '../images/gharwala_khana.jpg'
import fresh from '../images/fotor-ai-2024092813501.jpg'
import diet from '../images/fotor-ai-20240928135450.jpg'
import plate from '../images/fotor-ai-20240928135732.jpg'
import preview from '../images/preview.png'
import cost from '../images/cost.png';
import customize from '../images/customize.png';
import emotion from '../images/emotion.png';

const Popup = ({ show, handleClose, content }) => {
  const renderContent = () => {
    if (content === "home-cooked") {
      return (
        <>
          <h2 className="popup-h2">Benefits of Eating Gharwala Khana</h2>
          <ul className="home-cooked">
            <li>
              <img
                src={fresh}
                alt="Healthier Ingredients"
              />{" "}
              Healthier Ingredients: Home-cooked meals often use fresh,
              wholesome ingredients, avoiding preservatives and additives found
              in many processed foods.
            </li>
            <li>
              <img src={diet} alt="Nutritional Balance" />{" "}
              Nutritional Balance: You can ensure a balanced diet with the right
              proportions of proteins, carbohydrates, fats, vitamins, and
              minerals.
            </li>
            <li>
              <img src={plate} alt="Portion Control" />{" "}
              Portion Control: Cooking at home allows you to manage portion
              sizes, helping to avoid overeating.
            </li>
            <li>
              <img src={preview} alt="Hygiene" /> Hygiene: Home
              kitchens typically maintain higher hygiene standards compared to
              some restaurants or street food vendors.
            </li>
            <li>
              <img src={cost} alt="Cost-Effective" />{" "}
              Cost-Effective: Preparing meals at home is generally more
              economical than eating out.
            </li>
            <li>
              <img src={customize} alt="Customization" />{" "}
              Customization: You can tailor meals to your dietary needs and
              preferences, whether it’s reducing salt, sugar, or oil.
            </li>
            <li>
              <img
                src={emotion}
                alt="Emotional Well-being"
              />{" "}
              Emotional Well-being: Cooking and sharing meals with family can
              strengthen bonds and provide a sense of accomplishment and joy.
            </li>
          </ul>
        </>
      );
    }
    if (content === 'fresh-ingredients') {
        return (
          <>
            <h2>Three Reasons Why Using Fresh Ingredients Really Matters</h2>
            <ul className="fresh-ingredients">
              <li><img src={gharkhana} alt="Better Taste" /> Fresh ingredients taste better</li>
              <li><img src={festive} alt="More Sustainable" /> Fresh ingredients are more sustainable</li>
              <li><img src={gharkhana} alt="Improves Cognitive Function" /> Fresh ingredients improve cognitive function</li>
            </ul>
          </>
        );
      }
    return null;
  };
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="popup"
      unmountOnExit
    >
      <div className="popup">
        <div className="popup-content">
          <button className="close-button" onClick={handleClose}>✕</button>
          {renderContent()}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Popup;