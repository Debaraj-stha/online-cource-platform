import React, { useState } from 'react'

const LoginForm = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [message, setMessage] = useState("");

    
      const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
          setMessage("⚠️ Please enter email and password");
          return;
        }
        if (email === "admin@example.com" && password === "123456") {
          setMessage("✅ Login successful! Welcome back.");
        } else {
          setMessage("❌ Invalid email or password");
        }
      };
    
  return (
      <form
            className="flex flex-col gap-4 space-y-5"
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
            >
              Login
            </button>
          </form>

  )
}

export default LoginForm
