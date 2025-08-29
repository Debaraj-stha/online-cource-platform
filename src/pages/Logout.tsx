import { useGSAP } from "@gsap/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        // Delay navigation by 2.5 seconds
        const timer = setTimeout(() => {
            navigate("/auth/login");
        }, 2500);

        // // Cleanup in case user leaves page early
        return () => clearTimeout(timer);
    }, [navigate]);

    useGSAP(()=>{

    },[])


    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md text-center animate-slide-in">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Logging Out...</h1>
                <p className="text-gray-600">You are being logged out. Redirecting to login page.</p>
            </div>
        </div>
    );
};

export default Logout;
