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
  const [bookfrom, setbookfrom] = useState('')
  const [bookto, setbookto] = useState('')

  const getStaffs = async () => {
    const res = await axios.get(`${server}staffs/?date_from=${bookfrom}&date_to=${bookto}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    return await res.data
    // try {
    // }
    // catch {

    // }
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
      username: e.target.username.value.replace(/\s+/g, '_'),
      email: e.target.email.value,
      phone: e.target.phone.value,
      is_superuser: false,
      is_staff: true,
      staff_for: userContext?.user?.id,
      password: e.target.password.value,
    })
    if (res.data.token) {
      getStaffs()
      userContext?.getUser()
      setOpen(false)
      e.target.username.value = ''
      e.target.email.value = ''
      e.target.phone.value = ''
      e.target.password.value = ''
      userContext?.setMessage('تم انشاء حساب للموظف')
      userContext?.setMessageDisplay('yes')
    }
    else {
      setErr(res.data)
      if (res.data.email == 'user with this email already exists.') {
        userContext?.setMessage('هذا البريد الالكتروني موجود بالفعل')
        userContext?.setMessageDisplay('yes')
      } else {
        if (res.data.username == 'A user with that username already exists.') {
          userContext?.setMessage('هضا اسم المستخدم موجود بالفعل')
          userContext?.setMessageDisplay('yes')
        } else {
          userContext?.setMessage('حدث خطأ ما')
          userContext?.setMessageDisplay('yes')
        }
      }
    }
    return await res.data
  }


  return (
    <StaffsContextProvider.Provider
      value={{
        err,

        bookfrom, setbookfrom,
        bookto, setbookto,
        staffs,
        setStaffBookFrom,
        setStaffBookTo,
        staffDetails,
        getStaffDetails,
        createStaff,
        getStaffs
      }}
    >
      {children}
    </StaffsContextProvider.Provider>
  )
}

export const StaffsContextProvider = createContext()
export default StaffsContext