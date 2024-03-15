'use client'
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { server } from '../../server'
import { AuthContextProvider } from '../contexts/AuthContext'
import { useParams, usePathname } from 'next/navigation'

const StaffsContext = ({ children }) => {

  const [err, setErr] = useState([])

  const userContext = useContext(AuthContextProvider)

  const params = useParams()
  const path = usePathname()

  const [staffs, setStaffs] = useState([])

  const getStaffs = async () => {
    try {
      const res = await axios.get(`${server}staffs/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      setStaffs(res.data)
    }
    catch {

    }
  }

  useEffect(() => {
    if (localStorage.getItem('token') && userContext?.user?.is_superuser && path == '/profile') {
      getStaffs()
    }
  }, [userContext?.user])







  const [staffDetails, setStaffDetails] = useState()

  const [staffBookFrom, setStaffBookFrom] = useState('')
  const [staffBookTo, setStaffBookTo] = useState('')

  const getStaffDetails = async () => {
    const res = await axios.get(`${server}staffs/${params.staff_id}/?date_from=${staffBookFrom}&date_to=${staffBookTo}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    setStaffDetails(res.data.data)
  }

  useEffect(() => {
    if (localStorage.getItem('token') && params.staff_id) {
      getStaffDetails()
    }
  }, [path, staffBookFrom, staffBookTo])







  const createStaff = async (e, setOpen) => {
    e.preventDefault()
    const res = await axios.post(`${server}register/`, {
      username: e.target.username.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      is_superuser: false,
      is_staff: true,
      staff_for: userContext?.user?.id,
      password: e.target.password.value,
    })
    console.log(res.data);
    if (res.data.token) {
      getStaffs()
      userContext?.getUser()
      setOpen(false)
      e.target.username.value = ''
      e.target.email.value = ''
      e.target.phone.value = ''
      e.target.password.value = ''
    }
    else {
      setErr(res.data)
    }
  }


  return (
    <StaffsContextProvider.Provider
      value={{
        err,

        staffs,
        setStaffBookFrom,
        setStaffBookTo,
        staffDetails,
        getStaffDetails,
        createStaff,
      }}
    >
      {children}
    </StaffsContextProvider.Provider>
  )
}

export const StaffsContextProvider = createContext()
export default StaffsContext