import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userIn = localStorage.getItem("user-in");
  return (
    <>
      <div className="p-4 bg-[#C8CFA0] grid grid-cols-2 content-center ">
        <div>
          <Link to={"/"} className="hover:cursor-pointer">
            <label className="text-red-500 font-bold text-3xl hover:cursor-pointer">
              T
            </label>
            <label className="text-red-400 font-bold text-2xl hover:cursor-pointer">
              ime
            </label>
            <label className="text-red-500 font-bold text-3xl hover:cursor-pointer">
              C
            </label>
            <label className="text-red-400 font-bold text-2xl hover:cursor-pointer">
              apsule
            </label>
          </Link>
        </div>
        <div className="flex justify-end me-2 items-center font-medium ">
          <Link
            to={"/letters/new"}
            className="hover:border-b-4 border-red-300 border-b-4 p-2 cursor-pointer mx-5 hover:border-red-400 rounded-sm flex flex-row"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              style={{ width: "18px", marginRight: "10px" }}
            >
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
            </svg>
            Write a new Letter
          </Link>
          <Link
            to={"/letters/public"}
            className="hover:text-red-200 border border-b-4 border-red-300 p-2 cursor-pointer mx-5 hover:bg-red-400 hover:border-red-400 rounded-lg"
          >
            Read Public Letters
          </Link>
          {(userIn == "false" || !user)? (
            <>
              <Link
                to={"/signup"}
                className="hover:text-red-200 border border-b-4 border-red-300 p-2 cursor-pointer mx-5 hover:bg-red-400 hover:border-red-400 rounded-lg"
              >
                SignUp
              </Link>
              <Link
                to={"/login"}
                className="hover:text-red-200 border border-b-4 border-red-300 p-2 cursor-pointer mx-5 hover:bg-red-400 hover:border-red-400 rounded-lg"
              >
                SignIn
              </Link>
            </>
          ) : (
            <>
              <button
              className="hover:text-red-200 border border-b-4 border-red-300 p-2 cursor-pointer mx-5 hover:bg-red-400 hover:border-red-400 rounded-lg" 
              onClick={async () => {
                localStorage.setItem("user-in", "false");
                localStorage.removeItem("user");
                const response = await fetch("http://localhost:5000/api/auth/logout", {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((res) => res.json())
                  .catch((err) => console.error(err));
                const data = response;
                console.log("data", data);
                window.location.reload();
              }}>Log out</button>
              <Link
                to={`/dashboard/${user.data.id == null ? "" : user.data.id}`}
                className="hover:text-red-200 border border-b-4 border-red-300 p-2 px-5 cursor-pointer mx-5 bg-red-400 hover:border-red-400 rounded-lg"
              >
                {user.data.user_metadata.displayName}
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
