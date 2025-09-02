import React, { useRef, useState } from "react";
import type { Instructor } from "../@types/instructor";
import Input from "../components/Input";
import { FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const EditProfile = () => {
    const fileRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const state = location.state
    const from = state?.from
    const [formData, setFormData] = useState<Instructor>({
        name: "",
        title: "",
        bio: "",
        profile: "",
        email: "",
        phone: "",
        linkedin: "",
        twitter: "",
        website: "",
        facebook: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev: Instructor) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated profile:", formData);
    };


    useGSAP(() => {
        if(!containerRef.current) return
        const current=containerRef.current
        gsap.from(current,{
            opacity:0,
            x:-120,
            ease:"power1.inOut"
        })
         gsap.from(".input-card",{
            opacity:0,
            y:40,
            ease:"power1.inOut",
            delay:0.2,
            stagger:0.1
        })

    }, { scope: containerRef })

    return (
        <div
            ref={containerRef}
            className={`max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg ${from === "instructor" ? "container" : ""}`}>
            <h3 className="text-2xl font-semibold mb-6">Edit Profile</h3>

            <form
                onSubmit={handleSubmit}
                className={`flex flex-col ${from === "instructor" ? "lg:grid grid-cols-1 md:grid-cols-2 gap-5" : ""}  space-y-5`}
            >
                <div className="col-span-2 flex justify-center items-center flex-col input-card">
                    <FaUser
                        //  open file choose dialog
                        onClick={() => fileRef.current?.click()}

                        title="Change Profile"
                        className="size-16 md:size-20  p-3 bg-gray-600 hover:bg-gray-500 transition-colors rounded-full cursor-pointer
                    "
                    />
                    <input type="file" hidden name="profile" accept="image/png,image/jpg,image/jpeg" ref={fileRef} />
                </div>
                {/* Basic Info */}
                <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    textColorClass="text-gray-100"
                    placeholder="Enter full name"
                />
                {
                    from === "instructor" && (
                        <>
                            <Input
                                label="Title"
                                name="title"
                                value={formData.title || ""}
                                onChange={handleChange}
                                textColorClass="text-gray-100"
                                placeholder="Senior Web Developer"
                            />
                            <div className="col-span-2">
                                <Input
                                    label="Bio"
                                    name="bio"
                                    isTextArea
                                    value={formData.bio || ""}
                                    onChange={handleChange}
                                    placeholder="Write something about yourself..."
                                    extraClass="col-span-2"
                                    textColorClass="text-gray-100"
                                />
                            </div>

                            {/* Contact Info */}

                            <Input
                                label="Phone"
                                name="phone"
                                type="text"
                                value={formData.phone || ""}
                                onChange={handleChange}
                                textColorClass="text-gray-100"
                                placeholder="+977-98XXXXXXXX"
                            />

                            {/* Social Links */}
                            <Input
                                label="LinkedIn"
                                textColorClass="text-gray-100"
                                name="linkedin"
                                value={formData.linkedin || ""}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/username"
                            />
                            <Input
                                label="Twitter"
                                name="twitter"
                                value={formData.twitter || ""}
                                textColorClass="text-gray-100"
                                onChange={handleChange}
                                placeholder="https://twitter.com/username"
                            />
                            <Input
                                label="Website"
                                name="website"
                                value={formData.website || ""}
                                onChange={handleChange}
                                textColorClass="text-gray-100"
                                placeholder="https://yourwebsite.com"
                            />
                            <Input
                                label="Facebook"
                                name="facebook"
                                value={formData.facebook || ""}
                                textColorClass="text-gray-100"
                                onChange={handleChange}
                                placeholder="https://facebook.com/username"
                            />
                        </>
                    )
                }
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    textColorClass="text-gray-100"
                    placeholder="example@email.com"
                />


                {/* Submit */}
                <button
                    type="submit"
                    className="w-full col-span-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold"
                >
                    Save Changes
                </button>
            </form>

        </div>
    );
};

export default EditProfile;
