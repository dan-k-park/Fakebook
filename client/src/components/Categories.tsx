import { Bookmark, Group, Newspaper, Person, Store } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Categories = () => {
  const publicFolder = process.env.PUBLIC_URL;

  return (
    <div className="flex-[3] h-[calc(100vh-50px)] overflow-y-scroll sticky top-[50px]">
      <div className="py-[10px] px-[15px]">
        <ul className="p-0 m-0 list-none">
          <Link to="/dfas">
            <li className="flex py-[8px] pl-[6px] items-center mb-[10px] hover:bg-gray-200 hover:rounded-lg">
              <img
                src={publicFolder + "/assets/person/noAvatar.png"}
                alt="User avatar"
                className="w-[30px] h-[30px] rounded-full object-cover cursor-pointer mr-[15px]"
              />
              <span className="text-[16px]">User</span>
            </li>
          </Link>
          <Link to="/">
            <li className="flex py-[8px] pl-[6px] items-center mb-[10px] hover:bg-gray-200 hover:rounded-lg">
              <Person className="mr-[15px] text-[30px]" />
              <span className="text-[16px]">Friends</span>
            </li>
          </Link>
          <Link to="/">
            <li className="flex py-[8px] pl-[6px] items-center mb-[10px] hover:bg-gray-200 hover:rounded-lg">
              <Group className="mr-[15px] text-[30px]" />
              <span className="text-[16px]">Groups</span>
            </li>
          </Link>
          <Link to="/">
            <li className="flex py-[8px] pl-[6px] items-center mb-[10px] hover:bg-gray-200 hover:rounded-lg">
              <Bookmark className="mr-[15px] text-[30px]" />
              <span className="text-[16px]">Saved</span>
            </li>
          </Link>
          <Link to="/">
            <li className="flex py-[8px] pl-[6px] items-center mb-[10px] hover:bg-gray-200 hover:rounded-lg">
              <Store className="mr-[15px] text-[30px]" />
              <span className="text-[16px]">Marketplace</span>
            </li>
          </Link>
          <Link to="/">
            <li className="flex py-[8px] pl-[6px] items-center mb-[10px] hover:bg-gray-200 hover:rounded-lg">
              <Newspaper className="mr-[15px] text-[30px]" />
              <span className="text-[16px]">News</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
