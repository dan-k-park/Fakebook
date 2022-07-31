import { Bookmark, Event, Group, Person, Store } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Categories = () => {
  const publicFolder = process.env.PUBLIC_URL;

  return (
    <div className="flex-[3] h-[calc(100vh-50px)] overflow-y-scroll sticky top-[50px]">
      <div className="p-[20px]">
        <ul className="p-0 m-0 list-none">
          <Link to="/dfas">
            <li className="flex items-center mb-[20px]">
              <img
                src={publicFolder + "/assets/person/noAvatar.png"}
                alt="User avatar"
                className="w-[32px] h-[32px] rounded-full object-cover cursor-pointer mr-[15px]"
              />
              <span className="text-[20px]">User</span>
            </li>
          </Link>
          <li className="flex items-center mb-[20px]">
            <Person className="mr-[15px] text-[40px]" />
            <span className="text-[20px]">Friends</span>
          </li>
          <li className="flex items-center mb-[20px]">
            <Group className="mr-[15px]" />
            <span>Groups</span>
          </li>
          <li className="flex items-center mb-[20px]">
            <Bookmark className="mr-[15px]" />
            <span>Saved</span>
          </li>
          <li className="flex items-center mb-[20px]">
            <Store className="mr-[15px]" />
            <span>Marketplace</span>
          </li>
          <li className="flex items-center mb-[20px]">
            <Event className="mr-[15px]" />
            <span>Events</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
