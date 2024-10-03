import React, { useState } from "react";
import { SiCodechef } from "react-icons/si";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isUserProfile, setIsUserProfile] = useState(false);

  return (
    <>
      <div className="flex justify-between px-5 py-3 shadow-md bg-blue-100 rounded-md">
        <div className="flex items-center">
          <div className="flex gap-2 text-3xl">
            <SiCodechef />
            <h1 className="font-semibold text-2xl text-blue-800">
              Chef's Dashboard
            </h1>
          </div>
        </div>
        <div className="text-3xl flex gap-4 items-center text-blue-800">
          <div>
            <label class="relative flex justify-between items-center group p-2 text-xl">
              <p className="text-base ">{isOnline ? "Online" : "Offline"}</p>
              <input
                type="checkbox"
                checked={isOnline}
                onChange={() => setIsOnline(!isOnline)}
                class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md cursor-pointer"
              />
              <span class="w-12 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-red-400 rounded-full duration-300 ease-in-out peer-checked:bg-green-600 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
            </label>
          </div>
          <IoIosNotifications />
          <div className="relative cursor-pointer">
            <FaUserCircle onClick={() => setIsUserProfile(!isUserProfile)} />
            {isUserProfile ? (
              <div className="absolute top-[40px] right-0">
                <div className="bg-white shadow-xl px-1 py-2 text-base">
                  <Link>
                    <p className="cursor-pointer px-4 hover:shadow-md hover:bg-blue-200 mb-1">
                      Profile
                    </p>
                  </Link>
                  <p className="cursor-pointer px-4 hover:shadow-md hover:bg-blue-200 ">
                    logout
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
