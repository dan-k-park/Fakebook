import React from "react";
import { Categories } from "../components/Categories";
import { Feed } from "../components/Feed";
import { Friends } from "../components/Friends";
import { Navbar } from "../components/Navbar";
export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="w-full flex bg-gray-100">
        <Categories />
        <Feed />
        <Friends />
      </div>
    </>
  );
};
