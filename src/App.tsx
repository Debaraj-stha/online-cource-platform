
import { useDispatch } from 'react-redux'
import './App.css'
import AppRoutes from './components/AppRoutes'
import FlashMessage from './components/FlashMessage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import type { AppDispatch } from './store/store'
import { useEffect, useState } from 'react'
import { getCookie } from './utils/manage-cookie'
import { setToken, setUser } from './store/reducers/authReducer'
import { fetchCurrency, fetchExchangeRate, } from './utils/helper'
import type { Roles } from './@types/user'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    const token = getCookie("token")
    const user = getCookie("user");
    if (token && user) {
      let parsed
      try {
        parsed = JSON.parse(user)
      } catch (error) {
        return
      }
      console.log("parsed", parsed)
      dispatch(setUser(parsed))
      dispatch(setToken(token))
    }
  }, [dispatch])

  useEffect(() => {
    fetchExchangeRate()//fetch currency exchange rate
  }, [])


  useEffect(() => {
    fetchCurrency() //ftech local currency from ip
  }, [])



  return (
    <main>
      <Navbar />
      <FlashMessage />
      <section className='body min-h-screen'>
        <AppRoutes  />
      </section>
      <Footer />
    </main>
  )
}

export default App
