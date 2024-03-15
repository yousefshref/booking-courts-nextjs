'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { server } from '../../server'
import { useRouter } from 'next/navigation'

const AuthContext = ({ children }) => {

  const [err, setErr] = useState()

  const router = useRouter()


  const [user, setUser] = useState({})

  const getUser = async () => {
    try {
      const res = await axios.get(`${server}user/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      setUser(res.data)
    }
    catch {
      router.push('/auth/login')
      localStorage.removeItem('token')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser()
    }
  }, [])






  const registerFunction = async (e) => {
    e.preventDefault()
    const res = await axios.post(`${server}register/`, {
      username: e.target.username.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      is_superuser: e.target.is_superuser.value,
      password: e.target.password.value,
    })

    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
      router.push('/')
      getUser()
      router.refresh()
    } else {
      setErr(res.data)
    }
  }


  const loginFunction = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${server}login/`, {
        email: e.target.email.value,
        password: e.target.password.value,
      })

      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        router.push('/')
        getUser()
        router.refresh()
      } else {
        setErr(res.data)
      }
    }
    catch {
      alert('تأكد من صحة الايميل وكلمة المرور')
    }
  }


  const logoutFunction = () => {
    localStorage.removeItem('token')
    router.push('/auth/login')
    getUser()
  }


  return (
    <AuthContextProvider.Provider
      value={{
        err,


        user,


        registerFunction,
        loginFunction,
        logoutFunction,

        getUser,
      }}
    >
      {children}
    </AuthContextProvider.Provider>
  )
}

export const AuthContextProvider = createContext()
export default AuthContext