'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { server } from '../utlits/Variabels'
import { usePathname } from 'next/navigation'

const StateContext = ({ children }) => {

  const path = usePathname()

  const [states, setStates] = useState([])

  const getStates = async () => {
    const res = await axios.get(`${server}get_states/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    setStates(res.data)
  }

  useEffect(() => {
    if (localStorage.getItem('token') && path.includes('courts')) {
      getStates()
    }
  }, [path])



  return (
    <StateContextProvider.Provider
      value={{
        states,
      }}
    >
      {children}
    </StateContextProvider.Provider>
  )
}

export const StateContextProvider = createContext()
export default StateContext