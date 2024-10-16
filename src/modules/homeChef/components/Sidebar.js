import React from "react";
import { CHEFS_SIDEBAR } from "../../../utils/constant";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    // <div className="sm:p-1.5 sm:w-[30%] hidden md:w-[20%] md:block bg-blue-900 rounded-md lg:p-4 lg:w-[15%]">
    <div className="  sm:w-[30%]  md:w-[20%] md:block bg-blue-900 rounded-md sm:p-1.5 lg:p-4 lg:w-[15%]">

      <ul className="cursor-pointer ">
        {CHEFS_SIDEBAR.map((item) => {
          return (
            <Link to={item.link} key={item.id}>
              <li className="mt-3  py-2.5  flex justify-center flex-col items-center px-1 text-xs md:text-base md:py-3 lg:flex lg:gap-3 lg:items-center lg:justify-center lg:px-4 bg-blue-100 mb-3 rounded-full lg:text-xl font-semibold hover:bg-gray-100 hover:shadow-md">
                <span>{item.icon}</span>
                <p>{item.name}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
