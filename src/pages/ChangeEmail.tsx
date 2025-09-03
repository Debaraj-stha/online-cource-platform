import React, { useState } from 'react'
import Input from '../components/Input'

const ChangeEmail = () => {
  const [email, setEmail] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value)
  }
  const change = () => {

  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full shadow bg-gray-800 rounded-lg p-6 -translate-y-1/2 -translate-x-1/2">
        <div className="space-y-5">
          <h2 className="title">Change Email</h2>
          <Input
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required={true}
          />
          <button
            onClick={change}
            className="w-full bg-purple-600 py-2 rounded transition-colors hover:bg-purple-500">
            Change
          </button>
          <p className=''>We have sent a verification link to your email,please verify</p>
        </div>
      </div>
    </div>
  )
}

export default ChangeEmail
