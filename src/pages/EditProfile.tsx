import  { useRef,  } from "react";

import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProfileEditForm from "../components/ProfileEditForm";


const EditProfile = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const state = location.state
    const from = state?.from 

    useGSAP(() => {
        if (!containerRef.current) return
        const current = containerRef.current
        gsap.from(current, {
            opacity: 0,
            x: -120,
            ease: "power1.inOut"
        })
        gsap.from(".input-card", {
            opacity: 0,
            y: 40,
            ease: "power1.inOut",
            delay: 0.2,
            stagger: 0.1
        })

    }, { scope: containerRef })

    return (
        <div
            ref={containerRef}
            className={`max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg ${from === "instructor" ? "container" : ""}`}>
            <h3 className="text-2xl font-semibold mb-6">Edit Profile</h3>

         <ProfileEditForm from={from}/>

        </div>
    );
};

export default EditProfile;
