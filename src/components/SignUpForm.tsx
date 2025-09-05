import React, {  } from 'react'
import type { Roles } from '../@types/user';
import Input from './Input';
import capitalize from '../utils/string-func';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { setFields, signup, type EditableUserFields } from '../store/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import ErrorCard from './ErrorCard';

const SignUpForm = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate=useNavigate()
    const { user, isProcessing, error } = useSelector((state: RootState) => state.auth)

    const roles: Roles[] = ["student", "instructor"]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        dispatch(setFields({ field: name as keyof EditableUserFields, value }))
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const resultAction=await dispatch(signup(user))
       if(signup.fulfilled.match(resultAction)){
       navigate("/verify-email")
       }

    };
    return (
        <form className="flex flex-col gap-4 space-y-5" onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Full Name"
                name='name'
                extraClass='text-white'
                value={user.name}
                onChange={handleChange}

            />

            <Input
                type="email"
                placeholder="Email"
                name='email'
                extraClass='text-white'
                value={user.email}
                onChange={handleChange}

            />
            <Input
                type="password"
                name="password"
                placeholder="Password"
                extraClass='text-white'
                value={user.password}
                onChange={handleChange}

            />
            <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                extraClass='text-white'
                value={user.confirmPassword}
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
                            checked={user.role === roleOption}
                            onChange={() => dispatch(setFields({ field: "role", value: roleOption }))}
                        />
                        <label htmlFor={roleOption} className='cursor-pointer px-2'>
                            {capitalize(roleOption)}
                        </label>
                    </div>
                ))}
            </div>

            <button
                type="submit"
                disabled={isProcessing}
                className={`${isProcessing ? "bg-gray-800 text-white cursor-not-allowed hover:bg-gray-700" : "cursor-pointer  bg-purple-600  text-white hover:bg-purple-700"} p-3 rounded-lg  transition`}
            >
                {
                    isProcessing ? "Processing..." : " Sign Up"
                }
            </button>
            {
                error && <ErrorCard error={error}/>
            }
        </form>
    )
}

export default SignUpForm
