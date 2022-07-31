import React from "react";
import { Categories } from "../components/Categories";
import { Feed } from "../components/Feed";
import { Friends } from "../components/Friends";
import { Navbar } from "../components/Navbar";
export const Home = () => {
  return (
    <>
      <Navbar />
      <Categories />
      <Feed />
      <Friends />
    </>
  );
};
