import React, { useState } from "react";
import mainbgimage from "../assets/1st.jpg";
import "../styles/MainPage.css";
import TandC from "../components/T&C";
import InputForm from "../components/InputForm";

const MainPage = () => {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <div className="main-page-container">
        <div className="main-page-row">
          <div className="image-text">
            <img src={mainbgimage} alt="Food"/>
            <div className="overlay"></div>
            <div className="text-overlay">
              Let Your Flavors, Tell the Story.
              <br /><br/>{" "}
              <span className="spanText">
                Welcome Chefs.
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundSize: "cover",
            padding: "20px",
          }}
        >
          <div className="howit-works-container">
            <div className="card how-it-works">
              <h2 className="card-title">HOW IT WORKS</h2>
              <hr className="underline" />
              <ul>
                <li>Create your Profile.</li>
                <li>List your Menu.</li>
                <li>Start getting Orders.</li>
              </ul>
            </div>
            <div className="card selection">
              <h2 className="card-title">SELECTION CRITERIA</h2>
              <hr className="underline" />
              <ul>
                <li>A Home Chef who wishes to be actively engaged.</li>
                <li>Chef house and Kitchen should be clean & Hygienic.</li>
                <li>
                  A Chef who is passionate about cooking and makes good quality
                  food.
                </li>
              </ul>
            </div>
          </div>

          <TandC/>
          <InputForm/>

        </div>
      </div>
    </>
  );
};



export default MainPage;
