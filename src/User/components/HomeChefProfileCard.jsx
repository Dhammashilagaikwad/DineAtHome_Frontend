import React from "react";
const HomeChefProfileCard = ({ name, cuisine, profilePhoto, coverImage }) => {
  return (
    <div className="chef-card">
      <div className="image-container">
        <img src={coverImage} alt={name} className="chef-photo" />
        <img src={profilePhoto} alt={name} className="self-photo" />
      </div>
      <h2 className="chef-name">{name}</h2>
      <p className="chef-speciality">{cuisine}</p>
    </div>
  );
};

export default HomeChefProfileCard;
