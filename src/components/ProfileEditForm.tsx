import React, { use, useEffect, useRef, useState } from 'react'
import Input from './Input'
import { FaUser } from 'react-icons/fa6'
import { setProfileEditPayloadField, updateProfile, type InstructorPayload, type ProfileEditPayload } from '../store/reducers/instructorReducer'
import type { Instructor } from '../@types/instructor'
import type { AppDispatch, RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { socialPlatforms } from '../constants/instructors'
import {  useNavigate } from 'react-router-dom'
interface Props {
    from: string
}

const ProfileEditForm = ({ from }: Props) => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [filePreview, setFilePreview] = useState<string | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const { profileEditPayload } = useSelector((state: RootState) => state.instructor)
    const  navigate=useNavigate()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        //update in store
        // if the field is experience convert to number
        if (from === "instructor") {
            if (name === "experience") {
                const numValue = parseInt(value);
                if (!isNaN(numValue)) {
                    // dispatch only if it's a valid number
                    dispatch(setProfileEditPayloadField({ field: name, value: numValue }));
                }
            }
            else if (socialPlatforms.includes(name)) {
                // Handle social links
                const existingLinks = profileEditPayload?.socialLinks || [];
                const updatedLinks = existingLinks.map(link =>
                    link.platform === name ? { ...link, url: value } : link
                );
                // If the link for this platform doesn't exist, add it
                if (!existingLinks.find(link => link.platform === name)) {
                    updatedLinks.push({ platform: name as keyof Instructor["socialLinks"], url: value });
                }

                dispatch(setProfileEditPayloadField({ field: "socialLinks", value: updatedLinks }));
            } else {
                dispatch(setProfileEditPayloadField({ field: name as keyof InstructorPayload, value }));
            }
        }
        dispatch(setProfileEditPayloadField({ field: name as keyof ProfileEditPayload, value }));

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateProfile(profileEditPayload!))
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            //update preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            //update in store
            dispatch(setProfileEditPayloadField({ field: "profilePicture", value: file }));
        }
    };


    useEffect(()=>{
        //redirect on reload
        if(from==="instructor" && !profileEditPayload?.name){
             navigate("/instructor/profile",{state:{from:"instructor"}})
        }
    },[from,navigate,profileEditPayload?.name])

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex flex-col ${from === "instructor" ? "lg:grid grid-cols-1 md:grid-cols-2 gap-5" : ""}  space-y-5`}
        >
            <div className="col-span-2 flex justify-center items-center flex-col input-card">
                {
                    (filePreview || profileEditPayload?.profilePicture) ?
                        <img src={filePreview || URL.createObjectURL(profileEditPayload?.profilePicture!) || undefined} alt="Profile Preview" className="w-32 h-32 rounded-full object-cover mb-4" />
                        :
                        <FaUser
                            //  open file choose dialog
                            onClick={() => fileRef.current?.click()}
                            title="Change Profile"
                            className="size-16 md:size-20  p-3 bg-gray-600 hover:bg-gray-500 transition-colors rounded-full cursor-pointer
                    "
                        />
                }
                <input type="file" hidden name="profile" accept="image/png,image/jpg,image/jpeg" onChange={handleFileChange} ref={fileRef} />
            </div>
            {/* Basic Info */}
            <Input
                label="Full Name"
                name="name"
                value={profileEditPayload?.name ?? ""}
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
                            value={profileEditPayload?.title ?? ""}
                            onChange={handleChange}
                            textColorClass="text-gray-100"
                            placeholder="Senior Web Developer"
                        />
                        <div className="col-span-2">
                            <Input
                                label="Bio"
                                name="bio"
                                isTextArea
                                value={profileEditPayload?.bio ?? ""}
                                onChange={handleChange}
                                placeholder="Write something about yourself..."
                                extraClass="col-span-2"
                                textColorClass="text-gray-100"
                            />
                        </div>
                        <Input
                            label="Specialization"
                            name="specialization"
                            value={profileEditPayload?.specialization ?? ""}
                            onChange={handleChange}
                            textColorClass="text-gray-100"
                            placeholder="e.g., Web Development, Data Science"
                        />
                        <Input
                            label="Experience (in years)"
                            name="experience"
                            value={profileEditPayload?.experience?.toString() ?? ""}
                            onChange={handleChange}
                            textColorClass="text-gray-100"
                            placeholder="e.g., 5"
                        />

                        {/* Contact Info */}
                        {
                            socialPlatforms.map((platform, index) => (
                                <Input
                                    key={index}
                                    label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    name={platform}
                                    value={profileEditPayload?.socialLinks?.find(l => l.platform === platform)?.url || ""}
                                    onChange={handleChange}
                                    textColorClass="text-gray-100"
                                    placeholder={`Enter your ${platform} URL`}
                                />
                            ))
                        }


                    </>

                )
            }

            {/* Submit */}
            <button
                type="submit"
                className="w-full col-span-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold"
            >
                Save Changes
            </button>
        </form>
    )
}

export default ProfileEditForm
