import React from "react";

export default function BgImage(props) {
  return (
    <div className="main-bgphoto">
      <img className="bgphoto" src="pics/1st.jpg" alt="mainbgimage" />
      {/* <img className="bgphoto" src={props.imgg} alt="mainmage" /> */}
    </div>
  );
}
