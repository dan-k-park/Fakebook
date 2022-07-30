import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Chat, Person, Search, Notifications } from "@mui/icons-material";
export const Navbar = () => {
  const publicFolder = process.env.PUBLIC_URL;
  const user = {
    username: "blurper",
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_PUBLIC_FOLDER);
  }, []);

  return (
    <div className="h-[50px] w-full flex items-center sticky top-0 z-10 bg-sky-500">
      <div className="flex-[5]">
        <Link to="/">
          <span className="text-[24px] ml-[20px] font-bold text-white cursor-pointer">
            Fakebook
          </span>
        </Link>
      </div>
      <div className="flex-[6]">
        <div className="flex items-center w-full h-[30px] bg-white rounded-[30px]">
          <Search className="text-[20px] ml-[10px]" />
          <input className="border-none w-[70%] focus:outline-none" />
        </div>
      </div>
      <div className="flex-[4] flex items-center justify-end mr-[10px] text-white">
        <div className="flex">
          <div className="mr-[15px] cursor-poitner relative">
            <Person />
            <span className="absolute top-[-5px] rounded-full right-[-5px] flex items-center justify-center w-[15px] h-[15px] bg-red-500 text-[12px]">
              2
            </span>
          </div>
          <div className="mr-[15px] cursor-poitner relative">
            <Chat />
            <span className="absolute top-[-5px] rounded-full right-[-5px] flex items-center justify-center w-[15px] h-[15px] bg-red-500 text-white text-[12px]">
              2
            </span>
          </div>
          <div className="mr-[15px] cursor-poitner relative">
            <Notifications />
            <span className="absolute top-[-5px] rounded-full right-[-5px] flex items-center justify-center w-[15px] h-[15px] bg-red-500 text-white text-[12px]">
              2
            </span>
          </div>
        </div>
        <NavLink to={`/profile/${user.username}`}>
          <img
            src={publicFolder + "/assets/person/noAvatar.png"}
            alt="User avatar"
            className="w-[32px] h-[32px] rounded-full object-cover cursor-pointer"
          />
        </NavLink>
      </div>
    </div>
  );
};
