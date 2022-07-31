import {
  Chat,
  Notifications,
  Person,
  Search,
  Cancel,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const publicFolder = process.env.PUBLIC_URL;
  const user = {
    username: "blurper",
  };
  const [searchOpen, setSearchOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState({ width: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    if (windowWidth.width > 640) {
      setSearchOpen(false);
    }
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth.width]);

  return (
    <div className="h-[50px] w-full flex items-center sticky top-0 z-10 bg-sky-500">
      <div className="flex-[5]">
        <Link to="/">
          <span className="text-[24px] ml-[20px] font-bold text-white cursor-pointer">
            Fakebook
          </span>
        </Link>
      </div>
      <div className="flex flex-[8] sm:flex-[6]">
        <div
          className={`${
            searchOpen ? "flex" : "hidden"
          } sm:flex items-center w-[90%] sm:w-full h-[30px] bg-white rounded-[30px]`}
        >
          <Search className="text-[18px] sm:text-[20px] ml-[5px] sm:ml-[10px]" />
          <input className="border-none w-full sm:w-[70%] focus:outline-none" />
          <Cancel
            className="text-[18px] sm:hidden mr-[5px] cursor-pointer"
            onClick={() => setSearchOpen(false)}
          />
        </div>
      </div>
      <div
        className={`${
          searchOpen ? "hidden" : "flex-[4]"
        } flex-[4] flex items-center justify-end mr-[10px] text-white}`}
      >
        <div className="flex">
          <div
            className={`sm:hidden ${
              searchOpen ? "hidden" : "block"
            } mr-[15px] cursor-pointer relative`}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="text-white" />
          </div>
          <div className="mr-[15px] cursor-pointer relative">
            <Person className="text-white" />
            <span className="absolute top-[-5px] rounded-full right-[-5px] flex items-center justify-center w-[15px] h-[15px] bg-red-500 text-white  text-[12px]">
              2
            </span>
          </div>
          <div className="mr-[15px] cursor-pointer relative">
            <Chat className="text-white" />
            <span className="absolute top-[-5px] rounded-full right-[-5px] flex items-center justify-center w-[15px] h-[15px] bg-red-500 text-white text-[12px]">
              2
            </span>
          </div>
          <div className="mr-[15px] cursor-pointer relative">
            <Notifications className="text-white" />
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
