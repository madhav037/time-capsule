import React, { useEffect, useState } from "react";
import Menu from "../Components/Menu";
import { Link } from "react-router-dom";
import LetterCard from "../Components/LetterCard";

function PublicLetters() {
  const [letters, setLetters] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/letters/getall")
      .then((res) => res.json())
      .then((data) => setLetters(data))
      .catch((err) => console.error(err));
  }, []);
  console.log(letters);
  const publicLetters = letters.map((letter) => {
    return (
      <LetterCard
        key={letter.id}
        id={letter.id}
        body={letter.body}
        dateWritten={letter.dateWritten}
        dateToRecieve={letter.dateToRecieve}
      />
    );
  });

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
      {publicLetters}
      <div className="flex align-middle justify-between text-lg font-mono gap-5 p-3">
      <button className="p-2 px-5 m-2 bg-red-500 rounded-lg">Previous Page</button>
        <button className="p-2 px-5 m-2 bg-red-700 rounded-lg">Next Page</button>
      </div>
      </div>
    </>
  );
}

export default PublicLetters;
