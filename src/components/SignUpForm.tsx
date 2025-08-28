import React, { useState } from 'react'
import type { Roles } from '../@types/user';

const SignUpForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");
    const roles: Roles[] = ["student",  "instructor"]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            setMessage("⚠️ Please fill in all fields.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setMessage("❌ Passwords do not match.");
            return;
        }
        setMessage("✅ Account created successfully! Welcome aboard.");
    };
    return (
        <form className="flex flex-col gap-4 space-y-5" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={form.name}
                onChange={handleChange}
            />
           
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={form.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={form.password}
                onChange={handleChange}
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={form.confirmPassword}
                onChange={handleChange}
            />
            <div className='flex flex-wrap gap-5 '>
                {
                    roles.map((role) =>
                        <div ><input type='radio' name='role' id={role} value={role} /> <label htmlFor={role} className='cursor-pointer'>{role}</label></div>

                    )
                }
            </div>

            <button
                type="submit"
                className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
            >
                Sign Up
            </button>
        </form>
    )
}

export default SignUpForm
