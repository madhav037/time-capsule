import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";

function ViewLetter() {
  const location = useLocation();
  const nav = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const gradients = [
    "from-green-400 via-blue-500 to-purple-600",
    "from-pink-500 via-red-500 to-yellow-500",
    "from-yellow-400 via-orange-500 to-pink-500",
    "from-teal-400 via-cyan-500 to-blue-500",
  ];

  const [gradientIndex, setGradientIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prevIndex) => (prevIndex + 1) % gradients.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [gradients.length]);

  const handleSubmit = async() => {
    console.log("submitting letter");
    const response = await fetch("/api/letters/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: queryParams.get("body"),
        dateWritten: queryParams.get("dateWritten"),
        dateToRecieve: queryParams.get("dateToRecieve"),
        email: queryParams.get("email"),
        visibility : queryParams.get("visibility"),
        userID : queryParams.get("userID") ? queryParams.get("userID") : "null"
      })
    })
    .then((res) => res.json())
    .catch((err) => console.error(err))
    const data = response;


    console.log("data",data); 
    if (data) {
      alert("Letter submitted successfully");
    } else {
      alert("Failed to submit letter");
    }
    if (queryParams.get('userID') != null){
      nav(`/dashboard/${queryParams.get('userID')}`);
    }else{
      nav("/");
    }
  }

  return (
    <>
      <div className="bg-[#C8CFA0] h-screen">
        <div className="pb-5 bg-[#C8CFA0]">
          <Menu />
        </div>
        <div className="max-w-4xl mx-auto p-8 bg-[#C8CFA0] shadow-lg rounded-lg">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-red-700">
              Your Letter
            </h1>
          </div>
          <div className="space-y-4 mb-2">
            <p className="flex justify-evenly text-lg font-semibold text-red-500">
              <span className="font-bold text-red-700">From : {" "}{queryParams.get("dateWritten")}</span>
              <span className="font-bold text-red-700">To : {" "}{queryParams.get("dateToRecieve")}</span>
              <span className="font-bold text-red-700">For : {" "}{queryParams.get("email")}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-row bg-[#C8CFA0] h-screen mx-auto">
          <textarea
            style={{ resize: "none" }}
            className="rounded-lg m-2 ml-5 font-mono border-red-300 border bg-[#9b9b9b30] p-2 focus:outline-none focus:border-red-500 focus:border-2 text-lg w-2/3 h-1/2"
            disabled={true}
          >
            {queryParams.get("body")}
          </textarea>
          <button className="bg-red-500 w-1/2 h-1/2 m-5 rounded-xl text-5xl font-extrabold shadow-2xl" onClick={() => handleSubmit()}>
            SUBMIT<br/>
            YOUR<br/>
            LETTER
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewLetter;
