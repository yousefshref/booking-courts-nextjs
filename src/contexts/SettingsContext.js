'use client'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { server } from '../../server'
import { AuthContextProvider } from './AuthContext'

const SettingsContext = ({ children }) => {

  const path = usePathname()

  const authContex = useContext(AuthContextProvider)


  const getNumbers = async (setting_id) => {
    const res = await axios.get(`${server}settings/${setting_id}/numbers/`)
    return await res.data
  }


  const [settings, setSettings] = useState()
  const [deletedBooks, setDeletedBooks] = useState([])
  const [cancelledBooks, setCancelledBooks] = useState([])
  const [cancel_search, setcancel_search] = useState('')
  const [cancel_to, setcancel_to] = useState('')
  const [cancel_from, setcancel_from] = useState('')

  const getSettings = async (cancelled_from, cancelled_to, cancelled_search) => {
    const res = await axios.get(`${server}settings/?path=${path}&cancel_from=${cancelled_from}&cancel_to=${cancelled_to}&cancel_search=${cancelled_search}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    return await res.data
    // try {

    //   setSettings(res.data.settings)
    //   setDeletedBooks(res.data.deleted_books)
    //   res.data.settings.id && getNumbers(res.data.settings.id)
    //   setCancelledBooks(res.data.cancelled_books)
    // }
    // catch {

    // }
  }

  // useEffect(() => {
  //   if (localStorage.getItem('token') && (path == '/profile' || (path.includes('court') && path.includes('create')))) {
  //     getSettings()
  //   }
  // }, [path, cancel_search, cancel_to, cancel_from])


  const updateSettings = async (payingWarning, payingLimite, canceleLimite) => {
    const res = await axios.put(`${server}settings/update/`, {
      paying_warning: payingWarning,
      paying_time_limit: payingLimite,
      cancel_time_limit: canceleLimite,
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    if (res.data.id) {
      getSettings()
      authContex?.setMessage('تم التعديل بنجاح')
      authContex?.setMessageDisplay('yes')
    }
  }



  const createNumber = async (e, settings_id, setOpen) => {
    e.preventDefault()
    const data = {
      setting: settings_id,
      number: e.target.number.value
    }
    const res = await axios.post(`${server}settings/numbers/create/`, data, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    e.target.number.value = ''

    if (res.data.id) {
      setOpen(false)
    } else {
      if (res.data.number) {
        authContex?.setMessage('يرجي كتابة الرقم بشكل صحيح')
        authContex?.setMessageDisplay('yes')
      }
    }

    return await res.data
  }


  const deleteNumber = async (number_id) => {
    const res = await axios.delete(`${server}settings/${number_id}/numbers/delete/`,)
    return await res.data
  }


  return (
    <SettingsContextProvider.Provider
      value={{

        getSettings,

        settings,
        setcancel_search,
        setcancel_from,
        setcancel_to,
        cancelledBooks,
        deletedBooks,
        setDeletedBooks,

        getNumbers,
        deleteNumber,
        createNumber,
        updateSettings,
      }}
    >
      {children}
    </SettingsContextProvider.Provider>
  )
}

export const SettingsContextProvider = createContext()
export default SettingsContext