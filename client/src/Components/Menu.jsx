import React from "react";

function Menu() {
  return (
    <>
      <div className="p-4 bg-[#C8CFA0] grid grid-cols-2 content-center ">
        <div className="">
          <label className="text-red-500 font-bold text-3xl">T</label>
          <label className="text-red-400 font-bold text-2xl">ime</label>
          <label className="text-red-500 font-bold text-3xl">C</label>
          <label className="text-red-400 font-bold text-2xl">apsule</label>
        </div>
        <div className="flex justify-end me-2 items-center font-medium ">
          <label className="hover:text-red-200 border border-b-4 border-red-300 p-2 cursor-pointer mx-5 hover:bg-red-400 hover:border-red-400 rounded-lg">
            Read Public Letters
          </label>
          <button className="hover:text-red-200 border border-b-4 border-red-300 p-2 cursor-pointer mx-5 hover:bg-red-400 hover:border-red-400 rounded-lg">
            SignUp
          </button>
          <button className="hover:text-red-200 border border-b-4 border-red-300 p-2 cursor-pointer mx-5 hover:bg-red-400 hover:border-red-400 rounded-lg">
            SignIn
          </button>
        </div>
      </div>
    </>
  );
}

export default Menu;
