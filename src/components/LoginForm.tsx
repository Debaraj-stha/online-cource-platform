import React, { useState } from 'react'
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../store/store';
import { login, setFields } from '../store/reducers/authReducer';
import validator from '../utils/validator';
import { useLocation, useNavigate } from 'react-router-dom';
import { replayPendingActions } from '../utils/replayPendingActions';

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isProcessing } = useSelector((state: RootState) => state.auth)
  const {actions}=useSelector((state:RootState)=>state.pendingAction)

  const [errors, setErrors] = useState<string[]>()
  const navigate = useNavigate()
  const location=useLocation()
  const state=location.state ??{}
  const from=state?.from
  
  const redirectTo=from && from !="/auth/signup" ? from :"/"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { errors, emailValidator, passwordValidator } = validator()
    emailValidator(user.email)
    passwordValidator(user.password!)
    const inputErrors = errors()
    const error = Object.values(inputErrors).filter((er) => er != null)
    if (error.length > 0) {
      setErrors(error)
      return
    }
    setErrors([])
    const result = await dispatch(login({ email: user.email, password: user.password! }))
    if (login.fulfilled.match(result)) {
      replayPendingActions()
      navigate(redirectTo)
    }

  };

  return (
    <form
      className="flex flex-col gap-4 space-y-5"
      onSubmit={handleLogin}
    >
      <Input
        type="email"
        placeholder="Email"
        name='email'
        extraClass='text-white'
        value={user.email}
        required={true}
        onChange={(e) => dispatch(setFields({ field: "email", value: e.target.value }))}

      />
      <Input
        type="password"
        placeholder="Password"
        extraClass='text-white'
        name='password'
        required={true}
        value={user.password}
        onChange={(e) => dispatch(setFields({ field: "password", value: e.target.value }))}
      />
      {
        errors?.length! > 0 && (
          <>
            {
              errors?.map((err, i) => <p key={i} className='text-sm text-red-600'>{err}</p>)
            }
          </>
        )
      }

      <button
        type="submit"
        disabled={isProcessing}
        className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
      >
        Login
      </button>
    </form>

  )
}

export default LoginForm
