import React from "react";
import Menu from "../Components/Menu";
import { Link } from "react-router-dom";

function PublicLetters() {
  return (
    <>
      <div className="h-100vh bg-[#C8CFA0]">
        <Menu />
        <div className="flex flex-row bg-[#888d6d] p-16 justify-between">
          <div className="text-5xl text-red-700 font-semibold ">
            Public letters from the past
          </div>
          <Link
            className="p-4 bg-red-400 text-red-200 rounded-lg font-semibold cursor-pointer hover:bg-red-500"
            to={"/letters/new"}
          >
            Write a letter to the Future
          </Link>
        </div>
      </div>
    </>
  );
}

export default PublicLetters;
