import React from "react";
import Card from "./Card";

const CardsView = () => {
  // Get data from API and remove below constants
  const cardInfo = [
    {
      id: 123,
      userName: "Rushikesh Dhanawade",
      userAdd: "Navi Mumbai",
      amount: 183,
      buttonStatus: "View",
    },
  ];

  return (
    // <div className="bg-blue-100  rounded-md p-2 sm:p-8 w-[100%] min-h-screen">
    <div className="bg-blue-100 rounded-md sm:p-4 w-full min-h-screen">
      <div className="bg-white px-4 py-3 rounded-xl grid grid-cols-5  gap-5 text-start font-bold mb-3 shadow-md">
        <p>Bill id</p>
        <p className="col-span-1  sm:col-span-2">Order By</p>
        <p >Amount</p>
        <p >Action</p>
      </div>
      {cardInfo &&
        cardInfo.map((cardInfo) => {
          return <Card key={cardInfo.id} cardInfo={cardInfo} />;
        })}
    </div>
  );
};

export default CardsView;
