import React from "react";
import { useNavigate } from "react-router-dom";

export default function LetterCard(props) {
  const { id, body, dateWritten, dateToRecieve } = props;
  const nav = useNavigate();

  const timeAgo =
    new Date(dateToRecieve).getFullYear() - new Date(dateWritten).getFullYear();

  const monthName = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (date) => {
    const dt = date.split("-");
    return `${monthName[parseInt(dt[1])]},${dt[2]}  ${dt[0]}`;
  };

  const totalWords = body ? body.split(" ").length : "";

  function handleClick() {
    const queryParams = new URLSearchParams({
      id: id,
      body: body,
      dateWritten: formatDate(dateWritten),
      dateToRecieve: formatDate(dateToRecieve),
      totalWords: totalWords,
      timeAgo: timeAgo,
    });
    nav(`/public-letter/?${queryParams.toString()}`);
  }

  return (
    <>
      <div
        className="flex flex-col bg-[#C8CFA0] border-2 border-[#787c60] p-4 m-2 w-2/3 rounded-lg font-mono hover:cursor-pointer hover:shadow-lg"
        onClick={handleClick}
      >
        <div className="text-lg mb-2 font-semibold ">
          Time Traveled - almost {timeAgo} years
        </div>
        {body && <div className="text-lg pr-10 h-28 truncate text-wrap mb-3 ">
          {body}
        </div>}
        <div className="flex gap-4 justify-end text-red-900 font-mono">
          <div className="text-sm">
            {formatDate(dateWritten)} {"->"} {formatDate(dateToRecieve)} •{" "}
            {totalWords} words
          </div>
        </div>
      </div>
    </>
  );
}
