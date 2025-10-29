import { useEffect } from "react";
import BrandLogo from "../components/BrandLogo";
import gif from "../assets/videos/Sign in.gif";
import LoginForm from "../components/LoginForm";
import useLoginSignupAnimation from "../hooks/useLoginSignupAnimation";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/manage-cookie";

const Login = () => {
   const {containerRef,gifRef,formRef}=useLoginSignupAnimation()
   const navigate=useNavigate()
   const token=getCookie("token")
   const user=getCookie("user")

   useEffect(()=>{
    console.log(token,user)
    if(user || token) navigate("/")
   },[navigate])

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
