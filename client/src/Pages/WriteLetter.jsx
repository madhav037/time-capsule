import React, { useEffect, useState } from "react";
import Menu from "../Components/Menu";
import imagePencil from "../assets/pencil-solid.svg";
import LetterBody from "../Components/LetterBody";

function WriteLetter() {
  const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dt = new Date();
  return (
    <>
      <div className="bg-[#C8CFA0] h-screen">
        <Menu />
        <div className="font-mono text-xl mx-5 font-medium">
          A letter from {months[dt.getMonth()]} {dt.getDate()},{" "}
          {dt.getFullYear()}
        </div>
        <LetterBody />
      </div>
    </>
  );
}

export default WriteLetter;
