import React from "react";
const HomeChefProfileCard = ({ name, cuisine, profilePhoto, selfphoto }) => {
  return (
    <div className="chef-card">
      <div className="image-container">
        <img src={profilePhoto} alt={name} className="chef-photo" />
        <img src={selfphoto} alt={name} className="self-photo" />
      </div>
      <h2 className="chef-name">{name}</h2>
      <p className="chef-speciality">{cuisine}</p>
    </div>
  );
};

export default HomeChefProfileCard;
