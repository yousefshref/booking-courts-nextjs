import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { server } from '../server'
import { useNavigate } from 'react-router-dom'

const ApiContext = ({ children }) => {
  const header = {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  }

  const navigate = useNavigate()


  const [message, setMessage] = useState('')
  useEffect(() => {
    const time = setTimeout(() => {
      setMessage('');
    }, 3000);

    return () => clearTimeout(time); // Return a cleanup function to clear the timeout
  }, [message]);


  // login
  const loginFunction = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${server}login/`, {
        email: e.target.email.value,
        password: e.target.password.value
      })
      if (res.data.token) {
        navigate('/')
        localStorage.setItem('token', res.data.token)
      }
    } catch (err) {
      console.log(err.response.data);
    }
  }


  // levels
  const getLevels = async () => {
    const res = await axios.get(`${server}levels/`)
    return await res.data
  }


  // ------------- School ------------ 

  const getSchoolProfile = async () => {
    const res = await axios.get(`${server}shcool/profile/`, header)
    return await res.data
  }

  const getSchoolLevels = async () => {
    const res = await axios.get(`${server}school/levels/`, header)
    return await res.data
  }

  const getSchoolSubject = async () => {
    const res = await axios.get(`${server}shcool/subjects/`, header)
    return await res.data
  }

  const createNewAccount = async (
    username, email, password, first_name, last_name
  ) => {
    const res = await axios.post(`${server}shcool/accounts/create/`, {
      username: username,
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    }, header)
    return await res.data
  }


  const getTeachers = async () => {
    const res = await axios.get(`${server}shcool/accounts/teachers/`, header)
    return await res.data
  }

  const createTeacherProfile = async (
    user, levels, subjects
  ) => {
    const res = await axios.post(`${server}shcool/accounts/teachers/profile/create/`, {
      user: user,
      levels: levels,
      subjects: subjects,
    }, header)
    return await res.data
  }


  return (
    <ApiContextProvider.Provider value={{
      loginFunction,

      message, setMessage,

      getLevels,

      // school
      getSchoolLevels,
      getSchoolSubject,

      getSchoolProfile,

      createNewAccount,

      getTeachers,
      createTeacherProfile,
    }}>
      {children}
    </ApiContextProvider.Provider>
  )
}

export default ApiContext
export const ApiContextProvider = createContext()