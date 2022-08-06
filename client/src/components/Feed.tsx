import React from "react";
import { NewPost } from "./NewPost";

export const Feed = () => {
  return (
    <div className="flex-[6]">
      <div className="p-[20px]">
        {/* Conditionally render this based on if a user is logged in later */}
        <NewPost />
      </div>
    </div>
  );
};
