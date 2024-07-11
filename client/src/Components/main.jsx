import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import LetterBody from "./LetterBody";

function Main() {


  return (
    <>
      <div className="bg-[#C8CFA0] h-screen">
        <Menu />
        <div className="my-2 mx-5">
          <div className="text-5xl font-semibold font-mono">
            Write a letter to your future self
          </div>
          <div className="text-xl font-medium font-mono">
            Write. Pick a receiving date. Send. Verify. That’s it 😊
          </div>
        </div>
        <LetterBody />
      </div>
    </>
  );
}

export default Main;
