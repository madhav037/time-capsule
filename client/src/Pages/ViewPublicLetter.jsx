import React from "react";
import Menu from "../Components/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ViewPublicLetter() {
    const nav = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const body = queryParams.get("body");
  const dateWritten = queryParams.get("dateWritten");
  const dateToRecieve = queryParams.get("dateToRecieve");
  const timeAgo = queryParams.get("timeAgo");

  return (
    <>
      <Menu />
      <div className="h-1/4 bg-red-700 flex flex-col justify-center text-slate-300">
      <button className="text-start p-2 pl-5 font-semibold text-slate-300" onClick={() => {nav("/letters/public")}}>{"<-"} back</button>
        <div className="mx-auto font-semibold text-xl mt-6 ">Time Travelled • {timeAgo} years</div>
        <div className="font-bold text-3xl mx-auto m-6">A Letter From {dateWritten}</div> 
        <div className="font-bold mx-auto mt-4 mb-16">{dateWritten} {"->"} {dateToRecieve}</div>
      </div>
      <div className="flex bg-[#C8CFA0]">
      <div className="w-3/4 text-lg font-mono p-2 pl-5">
        {body}
        <hr className="my-4"/>
      </div>
      <Link
            className="p-4 bg-red-400 h-fit mt-10 ml-10 text-red-200 rounded-lg font-semibold cursor-pointer hover:bg-red-500"
            to={"/letters/new"}
          >
            Write a letter to the Future
          </Link>
      </div>
    </>
  );
}
