import React from "react";
import Card from "./Card";

const CardsView = () => {
  // Get data from API and remove below constants
  const cardInfo = [
    {
      id: 123,
      userName: "Rushikesh Dhanawade",
      userAdd: "Navi Mumbai",
      amount: 143,
      buttonStatus: "View",
    },
    {
      id: 12356,
      userName: "John doe",
      userAdd: "Thane",
      amount: 453,
      buttonStatus: "Ready",
    },
    {
      id: 12453,
      userName: "Shubham veer",
      userAdd: "Navi Mumbai",
      amount: 483,
      buttonStatus: "Ready",
    },
  ];

  return (
    <div className="bg-blue-100 rounded-md p-4 w-[80%]">
      <div className="bg-white px-5 py-3 rounded-xl grid grid-cols-5 gap-5 text-start font-medium mb-3 shadow-md">
        <p>Bill id</p>
        <p className="col-span-2">Order By</p>
        <p>Amount</p>
        <p>Action</p>
      </div>
      {cardInfo &&
        cardInfo.map((cardInfo) => {
          return <Card key={cardInfo.id} cardInfo={cardInfo} />;
        })}
    </div>
  );
};

export default CardsView;
