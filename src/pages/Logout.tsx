import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiHelper from "../utils/apiHelper";
import { getCookie, removeCookie } from "../utils/manage-cookie";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const logout = async () => {
      try {
        const url = `${import.meta.env.VITE_SERVER_URL}/auth/logout`;
        const token=getCookie("token")
        const res = await apiHelper(url, {
          method: "PATCH",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
        console.log(res)

        if (res) {
          // Delay navigation by 2.5s
          removeCookie("token")
          removeCookie("user")
          timer = setTimeout(() => {
            navigate("/auth/login");
          }, 2500);
        }
      } catch (error) {
        console.error("Logout error:", error);
        navigate("/auth/login"); // fallback redirect
      }
    };

    logout();

    // Cleanup timer if user navigates away early
    return () => clearTimeout(timer);
  }, [navigate]);

  useGSAP(() => {
    // optional gsap animation logic
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center animate-slide-in">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Logging Out...
        </h1>
        <p className="text-gray-600">
          You are being logged out. Redirecting to login page.
        </p>
      </div>
    </div>
  );
};

export default Logout;
