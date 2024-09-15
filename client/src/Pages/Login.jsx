import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#C8CFA0]">
      <div className="p-8 bg-red-400 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl text-center text-red-900 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-red-500 text-red-200 rounded-lg font-semibold hover:bg-red-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
