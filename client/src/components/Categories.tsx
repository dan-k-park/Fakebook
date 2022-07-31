import { Group } from "@mui/icons-material";

export const Categories = () => {
  return (
    <div className="flex-[3] h-[calc(100vh-50px)] overflow-y-scroll sticky top-[50px]">
      <div className="p-[20px]">
        <ul className="p-0 m-0 list-none">
          <li className="flex items-center mb-[20px]">
            <Group className="mr-[15px]" />
            <span>Groups</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
