import React, { useState } from "react";
import BrandLogo from "../components/BrandLogo";
import gif from "../assets/videos/Sign-up2.gif"; // you can replace with any signup illustration
import SignUpForm from "../components/SignUpForm";
import useLoginSignupAnimation from "../hooks/useLoginSignupAnimation";

const SignUp = () => {
     const [message, setMessage] = useState("");
      const {containerRef,gifRef,formRef}=useLoginSignupAnimation()

  
    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-700 to-purple-700 p-6">
            <div className="bg-gray-900 rounded-2xl shadow-2xl flex flex-col sm:flex-row w-full max-w-5xl overflow-hidden py-8">
                {/* Left Side GIF */}
                <div className="sm:w-1/2 flex justify-center items-center" ref={gifRef}>
                    <img src={gif} alt="Sign up illustration" className="object-contain" />
                </div>

                {/* Right Side Form */}
                <div className="sm:w-1/2 p-8 flex flex-col justify-center space-y-6" ref={formRef}>
                    {/* Branding */}
                    {/* <BrandLogo textClass="text-white" /> */}
                    <h2 className="text-xl font-medium text-gray-300 mb-6">
                        Create your account
                    </h2>

                    {/* Signup Form */}
                   <SignUpForm/>

                    {/* Signup Message */}
                    {message && (
                        <p className="mt-4 text-sm text-center text-gray-300">{message}</p>
                    )}

                    {/* Extra Links */}
                    <div className="mt-6 text-center text-gray-400 text-sm">
                        Already have an account?{" "}
                        <a href="/auth/login" className="text-purple-400 hover:underline">
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
