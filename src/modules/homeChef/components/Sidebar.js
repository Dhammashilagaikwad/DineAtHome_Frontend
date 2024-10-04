import React from "react";
import { CHEFS_SIDEBAR } from "../../../utils/constant";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-blue-900 rounded-md p-4 w-[20%]">
      <ul className="cursor-pointer ">
        {CHEFS_SIDEBAR.map((item) => {
          return (
            <Link to={item.link} key={item.id}>
              <li className="flex gap-3 items-center py-3 px-4 bg-blue-100 mb-3 rounded-full text-xl font-semibold hover:bg-gray-100 hover:shadow-md">
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
