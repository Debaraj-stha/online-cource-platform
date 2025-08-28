import React, { useState, useRef, useEffect } from "react";
import BrandLogo from "../components/BrandLogo";
import gif from "../assets/videos/Sign in.gif";
import gsap from "gsap";
import LoginForm from "../components/LoginForm";
import { useGSAP } from "@gsap/react";
import useLoginSignupAnimation from "../hooks/useLoginSignupAnimation";

const Login = () => {
    const [message, setMessage] = useState("");

   const {containerRef,gifRef,formRef}=useLoginSignupAnimation()

    return (
        <div
            ref={containerRef}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-700 to-purple-700 p-6"
        >
            <div className="bg-gray-900 rounded-2xl shadow-2xl flex flex-col sm:flex-row w-full max-w-5xl overflow-hidden py-16 px-20">
                {/* Left Side GIF */}
                <div
                    ref={gifRef}
                    className="sm:w-1/2 hidden sm:flex justify-center items-center"
                >
                    <img src={gif} alt="Sign in" className="object-contain" />
                </div>

                {/* Right Side Form */}
                <div
                    ref={formRef}
                    className="sm:w-1/2 p-8 flex flex-col justify-center space-y-5"
                >
                    {/* Branding */}
                    <BrandLogo textClass="text-white" />
                    <h2 className="text-xl font-medium text-gray-300 mb-6">
                        Welcome Back! Please login to your account.
                    </h2>

                    {/* Login Form */}
                    <LoginForm />
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
