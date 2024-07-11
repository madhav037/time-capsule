import React, { useEffect, useState } from 'react'

function LetterBody() {
    const [timePeriod, setTimePeriod] = useState(true);
    const [selected_Duration, setSelected_Duration] = useState({
      1: true,
      2: false,
      3: false,
      4: false,
      5: false,
    });
    const [selectedAudience, setSelectedAudience] = useState({
      private: true,
      annon: false,
    });
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
    let dates = [];
    let years = [];
    let dt = new Date();
    const months_comp = months.map((month, index) => {
      return (
        <option
          className="text-black"
          value={month}
          selected={index == dt.getMonth() ? true : false}
        >
          {month}
        </option>
      );
    });
    for (let i = 1; i <= 31; i++) {
      dates.push(i.toString());
    }
    const dates_comp = dates.map((date) => {
      return (
        <option
          className="text-black"
          value={date}
          selected={dt.getDate() == date ? true : false}
        >
          {date}
        </option>
      );
    });
  
    for (let i = dt.getFullYear(); i <= dt.getFullYear() + 50; i++) {
      years.push(i);
    }
    const years_comp = years.map((year) => {
      return (
        <option className="text-black" value={year}>
          {year}
        </option>
      );
    });
  return (
    <>
        <div className="flex flex-row">
          <textarea
            style={{resize:'none'}}
            rows={18}
            cols={400}
            className="rounded-lg m-2 ml-5 font-mono border-red-300 border bg-[#9b9b9b30] p-2 focus:outline-none focus:border-red-500 focus:border-2 text-lg"
            placeholder={"Dear Future Me,"}
          ></textarea>
          <div className="p-2 pr-3 w-full">
            <form>
              <div className="flex justify-between">
                <div className="opacity-55 font-medium">Deliver in</div>
                <div>
                  <label className="opacity-55 font-medium">Or choose a </label>
                  <label
                    className="text-red-400 font-bold cursor-pointer hover:underline"
                    onClick={() => {
                      setTimePeriod(!timePeriod);
                    }}
                  >
                    {timePeriod ? "Date" : "Duration"}
                  </label>
                </div>
              </div>
              {timePeriod ? (
                <div className="grid grid-cols-5 text-black">
                  <input
                    className={
                      selected_Duration[1]
                        ? "bg-red-400 rounded-lg p-2 hover:cursor-pointer"
                        : "hover:cursor-pointer p-2 hover:bg-[#979f6ac5] rounded-lg"
                    }
                    type="button"
                    value={"6 months"}
                    onClick={() =>
                      setSelected_Duration({
                        1: true,
                        2: false,
                        3: false,
                        4: false,
                        5: false,
                      })
                    }
                  />
                  <input
                    className={
                      selected_Duration[2]
                        ? "bg-red-400 rounded-lg p-2 hover:cursor-pointer"
                        : "hover:cursor-pointer p-2 hover:bg-[#979f6ac5] rounded-lg"
                    }
                    type="button"
                    value={"1 year"}
                    onClick={() =>
                      setSelected_Duration({
                        1: false,
                        2: true,
                        3: false,
                        4: false,
                        5: false,
                      })
                    }
                  />
                  <input
                    className={
                      selected_Duration[3]
                        ? "bg-red-400 rounded-lg p-2 hover:cursor-pointer"
                        : "hover:cursor-pointer p-2 hover:bg-[#979f6ac5] rounded-lg"
                    }
                    type="button"
                    value={"3 years"}
                    onClick={() =>
                      setSelected_Duration({
                        1: false,
                        2: false,
                        3: true,
                        4: false,
                        5: false,
                      })
                    }
                  />
                  <input
                    className={
                      selected_Duration[4]
                        ? "bg-red-400 rounded-lg p-2 hover:cursor-pointer"
                        : "hover:cursor-pointer p-2 hover:bg-[#979f6ac5] rounded-lg"
                    }
                    type="button"
                    value={"5 years"}
                    onClick={() =>
                      setSelected_Duration({
                        1: false,
                        2: false,
                        3: false,
                        4: true,
                        5: false,
                      })
                    }
                  />
                  <input
                    className={
                      selected_Duration[5]
                        ? "bg-red-400 rounded-lg p-2 hover:cursor-pointer"
                        : "hover:cursor-pointer p-2 hover:bg-[#979f6ac5] rounded-lg"
                    }
                    type="button"
                    value={"10 years"}
                    onClick={() =>
                      setSelected_Duration({
                        1: false,
                        2: false,
                        3: false,
                        4: false,
                        5: true,
                      })
                    }
                  />
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  <select class="col-span-2 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-400 dark:border-red-600 dark:text-black dark:focus:ring-red-200 dark:focus:border-red-200">
                    {months_comp}
                  </select>
                  <select class="text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-400 dark:border-red-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-red-200 dark:focus:border-red-200">
                    {dates_comp}
                  </select>
                  <select class="text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-400 dark:border-red-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-red-200 dark:focus:border-red-200">
                    {years_comp}
                  </select>
                </div>
              )}
              <div className="opacity-55 font-medium mt-2">
                Select your audience
              </div>
              <div className="flex flex-row">
                <div
                  className={
                    selectedAudience.private
                      ? "bg-red-400 rounded-lg p-2 mx-2 hover:cursor-pointer"
                      : "hover:cursor-pointer p-2 mx-2 hover:bg-[#979f6ac5] rounded-lg"
                  }
                  onClick={() =>
                    setSelectedAudience({ private: true, annon: false })
                  }
                >
                  Private
                </div>
                <div
                  className={
                    selectedAudience.annon
                      ? "bg-red-400 rounded-lg p-2 mx-2 hover:cursor-pointer"
                      : "hover:cursor-pointer p-2 mx-2 hover:bg-[#979f6ac5] rounded-lg"
                  }
                  onClick={() =>
                    setSelectedAudience({ private: false, annon: true })
                  }
                >
                  Public, but anonymous
                </div>
              </div>
              <div className="opacity-55 font-medium mt-2">
                Make sure you get your letter
              </div>
              <div class="relative mt-2">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-red-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="pink"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  type="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3  dark:bg-red-400 dark:border-gray-600 dark:placeholder-black placeholder:font-md dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Please enter an email"
                ></input>
              </div>
              <div className="opacity-55 font-medium mt-2">
                You will receive a confirmation email - please make sure your
                email address is correct!{" "}
              </div>
              <input
                className={`w-full p-5 hover:cursor-pointer rounded-xl mt-5 bg-blue-700 bg-gradient-to-r ${gradients[gradientIndex]} gradient-bg transition-all duration-0 font-mono font-semibold text-lg`}
                type="submit"
                value={"Send to the Future"}
              />
            </form>
          </div>
        </div>
    </>
  )
}

export default LetterBody