import React from "react";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
export const Navbar = () => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="h-[50px] w-full flex items-center sticky top-0 z-10 bg-sky-500">
      <div className="flex-[3]">
        <Link to="/">
          <span className="text-[24px] ml-[20px] font-bold text-white cursor-pointer">
            Fakebook
          </span>
        </Link>
      </div>
      <div className="flex-[5]">
        <div className="flex items-center w-full h-[30px] bg-white rounded-[30px]">
          <Search className="text-[20px] ml-10px" />
          <input className="border-none w-[70%]" />
        </div>
      </div>
    </div>
  );
};
