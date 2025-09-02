import React, { useState } from 'react'
import type { Roles } from '../@types/user';
import Input from './Input';
import capitalize from '../utils/string-func';

const SignUpForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student" as Roles | ""
    });
    const [message, setMessage] = useState("");
    const roles: Roles[] = ["student", "instructor"]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <Input
                type="text"
                placeholder="Full Name"
                name='name'
                extraClass='text-white'
                value={form.name}
                onChange={handleChange}

            />

            <Input
                type="email"
                placeholder="Email"
                name='email'
                extraClass='text-white'
                value={form.email}
                onChange={handleChange}

            />
            <Input
                type="password"
                name="password"
                placeholder="Password"
                extraClass='text-white'
                value={form.password}
                onChange={handleChange}

            />
            <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                extraClass='text-white'
                value={form.confirmPassword}
                onChange={handleChange}

            />
            <div className='flex flex-wrap gap-5'>
                {roles.map((roleOption) => (
                    <div key={roleOption}>
                        <input
                            type='radio'
                            name='role'
                            id={roleOption}
                            value={roleOption}
                            checked={form.role === roleOption}
                            onChange={() => setForm(prev => ({ ...prev, "role": roleOption }))}
                        />
                        <label htmlFor={roleOption} className='cursor-pointer px-2'>
                            {capitalize(roleOption)}
                        </label>
                    </div>
                ))}
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
