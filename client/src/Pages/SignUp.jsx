import React, { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    const data = response;
    console.log("data", data);
    if (data) {
      alert("User created successfully");
    } else {
      alert("Failed to create user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#C8CFA0]">
      <div className="p-8 bg-red-400 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl text-center text-red-900 mb-6">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="username"
            className="w-full p-3 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-red-300 dark:border-red-600 dark:text-black"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-red-300 dark:border-red-600 dark:text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-red-300 dark:border-red-600 dark:text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-red-300 dark:border-red-600 dark:text-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-red-500 text-red-200 rounded-lg font-semibold hover:bg-red-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
