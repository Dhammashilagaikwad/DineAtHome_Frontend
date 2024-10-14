import React from "react";
import { MdCurrencyRupee } from "react-icons/md";

const Card = ({ cardInfo }) => {
  const { id, userName, userAdd, amount, buttonStatus } = cardInfo;
  const buttonBgColor = buttonStatus === "View" ? "bg-red-500" : "bg-green-600";

  return (
    <div className="bg-white text-sm  py-2 px-4 justify-center items-center md:px-5 md:py-3 rounded-xl grid grid-cols-5 md:gap-5 md:font-medium mb-3 lg:text-lg shadow-md">
    <p>{id}</p>
    <div className="flex gap-2 col-span-2">
      <div>
        <div className="bg-green-600 w-10 h-10 rounded-full flex justify-center items-center text-white font-bold shadow-lg">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
      <div>
        <p>{userName}</p>
        <p className="text-xs">{userAdd}</p>
      </div>
    </div>
    <p className="flex gap-1 items-center">
      {amount} <MdCurrencyRupee />
    </p>
    <div>
      <button
        className={`${buttonBgColor} px-4 py-2 rounded-full text-white font-bold shadow-md`}
      >
        {buttonStatus}
      </button>
    </div>
  </div>
  );
};

export default Card;
