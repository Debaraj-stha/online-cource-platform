import React, { useState } from "react";
import BrandLogo from "../components/BrandLogo";
import gif from "../assets/videos/Sign in.gif";

const Login = () => {
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-700 to-purple-700 p-6">
            <div className="bg-gray-900 rounded-2xl shadow-2xl flex flex-col sm:flex-row w-full max-w-5xl overflow-hidden py-16 px-20">
                {/* Left Side GIF */}
                <div className="sm:w-1/2 hidden sm:flex justify-center items-center ">
                    <img src={gif} alt="Sign in" className="object-contain" />
                </div>

                {/* Right Side Form */}
                <div className="sm:w-1/2 p-8 flex flex-col justify-center space-y-5">
                    {/* Branding */}
                    <BrandLogo textClass="text-white" />
                    <h2 className="text-xl font-medium text-gray-300 mb-6">
                        Welcome Back! Please login to your account.
                    </h2>

                    {/* Login Form */}
                    <form className="flex flex-col gap-4 space-y-5" onSubmit={handleLogin}>
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

                    {/* Login Message */}
                    {message && (
                        <p className="mt-4 text-sm text-center text-gray-300">{message}</p>
                    )}

                    {/* Extra Links */}
                    <div className="mt-6 text-center text-gray-400 text-sm">
                        <a href="#" className="hover:underline mr-4">
                            Forgot Password?
                        </a>
                        <a href="/auth/signup" className="hover:underline">
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
