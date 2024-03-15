'use client'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { createContext, useEffect, useState } from 'react'
import { server } from '../../server'

const SettingsContext = ({ children }) => {

  const path = usePathname()


  const [numbers, setNumbers] = useState([])
  const getNumbers = async (setting_id) => {
    const res = await axios.get(`${server}settings/${setting_id}/numbers/`)
    setNumbers(res.data)
  }


  const [settings, setSettings] = useState()
  const [deletedBooks, setDeletedBooks] = useState([])
  const [cancelledBooks, setCancelledBooks] = useState([])
  const [cancel_search, setcancel_search] = useState('')
  const [cancel_to, setcancel_to] = useState('')
  const [cancel_from, setcancel_from] = useState('')

  const getSettings = async () => {
    try {
      const res = await axios.get(`${server}settings/?path=${path}&cancel_from=${cancel_from}&cancel_to=${cancel_to}&cancel_search=${cancel_search}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      setSettings(res.data.settings)
      setDeletedBooks(res.data.deleted_books)
      res.data.settings.id && getNumbers(res.data.settings.id)
      setCancelledBooks(res.data.cancelled_books)
    }
    catch {

    }
  }

  useEffect(() => {
    if (localStorage.getItem('token') && (path == '/profile' || (path.includes('court') && path.includes('create')))) {
      getSettings()
    }
  }, [path, cancel_search, cancel_to, cancel_from])


  const updateSettings = async (e, setEdit) => {
    e.preventDefault()
    const data = {
      paying_warning: e?.target?.paying_warning?.value,
      paying_time_limit: e?.target?.paying_time_limit?.value ? e?.target?.paying_time_limit?.value : 0,
      cancel_time_limit: e?.target?.cancel_time_limit?.value ? e?.target?.cancel_time_limit?.value : 0,
    }
    const res = await axios.put(`${server}settings/update/`, data, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    if (res.data.id) {
      setEdit(false)
      getSettings()
    }
  }



  const createNumber = async (e, setOpen) => {
    e.preventDefault()
    const data = {
      setting: settings?.id,
      number: e.target.number.value
    }
    const res = await axios.post(`${server}settings/numbers/create/`, data, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    e.target.number.value = ''
    getNumbers(settings?.id)
    setOpen(false)
  }


  const deleteNumber = async (e, number_id) => {
    e.preventDefault()
    const res = await axios.delete(`${server}settings/${number_id}/numbers/delete/`,)
    getNumbers(settings?.id)
  }


  return (
    <SettingsContextProvider.Provider
      value={{

        settings,
        setcancel_search,
        setcancel_from,
        setcancel_to,
        cancelledBooks,
        deletedBooks,
        setDeletedBooks,

        numbers,
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